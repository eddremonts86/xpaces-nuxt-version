<script setup lang="ts">
  import imgCarrousel from '@/components/global/Images/ImgCarrousel.vue'
  import { images, weeksFromToday } from '@/libs/helpers'
  import { useMySpacesStore } from '@/stores/spaces'
  import type { SpaceModel } from '@/types/Space'
  import type { PropType } from 'vue'
  import { ref } from 'vue'
  const props = defineProps({
    space: {
      type: Object as PropType<SpaceModel>,
      required: true,
    },
  })
  const loading = ref(false)
  const spaceStore = useMySpacesStore()
  const route = useRouter()

  const weekText = computed(() => {
    const weekText = weeks.value > 1 ? 'weeks' : 'week'
    const timeEgo =
      weeks.value <= 4
        ? `${weeks.value}  ${weekText} ago`
        : 'More than a month ago'
    return weeks.value < 1 ? 'This week' : timeEgo
  })

  const newSpace = computed(() => {
    return weeks.value <= 4
  })

  const weeks = computed(() => {
    return weeksFromToday(props.space.createdAt)
  })

  const getCardColor = computed(() => {
    return props.space.published ? 'grey-lighten-4' : 'grey-lighten-5'
  })

  const goTo = () => {
    spaceStore.setSpace(props.space)
    route.push(`/spaces/${props.space.id}`)
  }

  const imgNav = (event: Event) => {
    event.stopPropagation()
  }
</script>

<template>
  <v-card
    :loading="loading"
    class="mx-auto my-6 pa-0"
    :color="getCardColor"
    width="380"
    elevation="0"
    rounded="lg"
    outlined
    @click="goTo()"
  >
    <template #loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>
    <imgCarrousel :slices="images()" @click="imgNav($event)" />
    <v-card-item>
      <v-card-title class="card-address-text">{{ space.address }}</v-card-title>
      <v-card-subtitle>
        <div class="d-flex justify-space-between">
          <span class="me-1">Added: {{ weekText }}</span>
          <v-icon
            v-show="newSpace"
            color="red-accent-3"
            icon="mdi-fire-circle"
            size="small"
          />
        </div>
        <div class="mt-2">
          <div class="d-flex justify-space-between">
            <span>Price per month:</span>
            <b>{{ space.pricePerMonth }} {{ space.currency }}</b>
          </div>
          <div class="d-flex justify-space-between">
            <span>Price per day:</span>
            <b>{{ space.pricePerDay }} {{ space.currency }}</b>
          </div>
        </div>
      </v-card-subtitle>
    </v-card-item>
  </v-card>
</template>
<style lang="scss" scoped>
  .card-address-text {
    font-size: 14px;
    color: #222;
    line-height: 20px;
    font-weight: 400;
  }
</style>
