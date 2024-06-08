<script lang="ts" setup>
  import imgGallery from '@/components/global/Images/ImgGallery.vue'
  import mapsReadOnly from '@/components/global/Maps/mapsReadOnly.vue'
  import { images } from '@/libs/helpers'
  import { deleteSpace, getSpace } from '@/services/spaces'
  import { useMySpacesStore } from '@/stores/spaces'
  import { useAuth0 } from '@auth0/auth0-vue'
  import { ref, watch } from 'vue'

  definePageMeta({
    layout: 'hosting',
  })
  const route = useRoute()
  const router = useRouter()
  const store = useMySpacesStore()
  const userStore = useAuth0()
  const { validateDate, getDayRange, validateRangeDate } = useUseValidateDate()

  const TODAY = new Date().toISOString().split('T')[0]
  const IMAGES_TO_SHOW = 7
  const CLEAN_FEED = 500

  const loading = ref(false)
  const id = ref(store.space.id)
  const space = ref(store.space)
  const startDate = ref(TODAY)
  const endDate = ref(TODAY)

  const fetchSpace = async () => {
    try {
      if (!id.value) {
        loading.value = true
        id.value = route.params['id'] as string
        const data = await getSpace(id.value)
        if (data?.id === id.value) {
          space.value = data
          store.setSpace(data)
          loading.value = false
          return
        }
        router.push('/not_found_space')
      }
    } catch (error) {
      router.push('/')
    }
  }
  watch(
    id,
    async () => {
      await fetchSpace()
    },
    { immediate: true }
  )

  const totalDays = computed(() => {
    return getDayRange([startDate.value, endDate.value])
  })

  const total = computed(() => {
    if (!totalDays.value) return 0
    return totalDays.value * space.value.pricePerDay + CLEAN_FEED
  })

  const location = computed(() => {
    if (!space.value.location) {
      return ['0', '0']
    }
    const [lat, lon] = space.value.location
    return [lat, lon]
  })

  const startDateValid = computed(() => {
    return validateDate(startDate.value)
  })

  const endDateValid = computed(() => {
    return validateDate(endDate.value)
  })

  const invalidRange = computed(() => {
    if (startDate.value && endDate.value && startDate.value !== endDate.value) {
      return !validateRangeDate([startDate.value, endDate.value])
    }
    return false
  })

  const isOwner = computed(() => {
    return userStore.user.value?.sub === space.value.ownerId
  })

  const deleteItem = async () => {
    if (!id.value) return
    deleteSpace(id.value)
    router.push('/spaces')
  }
</script>

<template>
  <v-container class="pb-12">
    <HostingAppSpaceActions
      v-if="isOwner"
      :space="space"
      @reload-space="fetchSpace"
      @delete-space="deleteItem"
    />
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="ma-0 pa-0">
        <imgGallery :slices="images(IMAGES_TO_SHOW)" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2>{{ space.address }}</h2>
      </v-col>
      <v-col cols="12" md="8">
        <div
          v-dompurify-html="space.description"
          class="text-justify pb-5"
        ></div>
      </v-col>
      <v-col cols="12" md="4" class="px-1">
        <div class="space-info">
          <div class="price-header">
            <h3 class="text-center">Add dates for prices</h3>
            <div class="d-flex justify-space-between text-center mt-3">
              <h5>{{ space.pricePerDay }} {{ space.currency }} / day</h5>
              <h5>{{ space.pricePerMonth }} {{ space.currency }} / month</h5>
            </div>
          </div>
          <v-divider class="mb-8 mt-3" />
          <div class="price-text">
            <v-row class="d-flex justify-space-between text-center">
              <v-col class="px-1">
                <v-text-field
                  v-model="startDate"
                  type="date"
                  :min="TODAY"
                  variant="outlined"
                  label="Start date"
                  :hide-details="startDateValid"
                  persistent-hint
                  :hint="startDateValid ? '' : 'Invalid date'"
                />
              </v-col>
              <v-col class="px-1">
                <v-text-field
                  v-model="endDate"
                  type="date"
                  variant="outlined"
                  :hide-details="endDateValid"
                  label="End date"
                  persistent-hint
                  :min="TODAY"
                  :hint="endDateValid ? '' : 'Invalid date'"
                />
              </v-col>
              <v-col v-if="invalidRange" cols="12">Invalid date range</v-col>
            </v-row>
            <v-btn
              elevation="0"
              rounded="lg"
              size="large"
              color="pink-accent-3"
              block
              class="my-4"
            >
              Reserve
            </v-btn>
          </div>
          <div class="price-total">
            <v-divider class="my-3" />
            <div class="d-flex justify-center pb-8">
              <p>You won't be charged yet</p>
            </div>
            <div class="d-flex justify-space-between text-center">
              <h5>Days:</h5>
              <h5>{{ totalDays }} days</h5>
            </div>
            <div class="d-flex justify-space-between text-center">
              <h5>Pice per day:</h5>
              <h5>{{ space.pricePerDay }} {{ space.currency }}</h5>
            </div>
            <div class="d-flex justify-space-between text-center">
              <h5>Cleaning fee:</h5>
              <h5>{{ CLEAN_FEED }} {{ space.currency }}</h5>
            </div>
            <div class="d-flex justify-space-between text-center pt-2">
              <h3>Total:</h3>
              <h3>{{ total }} {{ space.currency }}</h3>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <mapsReadOnly :location="location" :height="'500px'" class="maps" />
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
  .space-images {
    display: grid;
    grid-template-areas:
      'image0 image1 image2'
      'image0 image3 image4';
  }
  .image0 {
    grid-area: image0;
    height: fit-content;
    min-width: 300px;
  }
  .image1 {
    grid-area: image1;
  }
  .image2 {
    grid-area: image2;
  }
  .image4 {
    grid-area: image4;
  }
  .space-info {
    border: 1px solid rgb(221, 221, 221);
    border-radius: 12px;
    padding: 24px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    max-height: 700px;
    height: auto;
    max-width: 400px;
  }
  .maps {
    padding: 15px;
    background: #8080800f;
    border-radius: 4px;
  }
</style>
