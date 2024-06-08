<script setup lang="ts">
  import { steps } from '@/components/hosting/const/stpes'
  import { saveSpace } from '@/services/spaces'
  import { useMySpacesStore } from '@/stores/spaces'
  import type { Space } from '@/types/Space'
  import { onMounted, ref } from 'vue'

  const props = defineProps<{ dialog: boolean }>()
  const emit = defineEmits(['update-dialog', 'save-space'])
  const mySpacesStore = useMySpacesStore()
  const step = ref(0)

  onMounted(() => {
    close()
  })

  const stepsData = computed(() => mySpacesStore.stepsData)

  const input = computed({
    get() {
      return props.dialog
    },
    set(newValue) {
      emit('update-dialog', newValue)
    },
  })

  const cleanForm = () => {
    mySpacesStore.setData({} as Space)
    step.value = 0
  }

  const close = () => {
    emit('update-dialog')
    cleanForm()
  }

  const saveStepData = (event: any) => {
    mySpacesStore.setData({ ...stepsData.value, ...event })
  }

  const save = async () => {
    const space = stepsData.value
    await saveSpace({
      ...space,
      published: false,
      width: +space.width || 10,
      length: +space['length'] || 10,
      height: +space.height || 10,
      pricePerDay: +space.pricePerDay || 10,
      pricePerMonth: +space.pricePerMonth || 300,
    })
    emit('save-space')
    cleanForm()
  }
</script>

<template>
  <v-dialog
    v-model="input"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title class="px-12 d-flex" color="grey-lighten-4">
        <TopBarGlobalAppLogo />
        <v-spacer />
        <v-btn elevation="0" rounded="md" class="mx-2 px-3" @click="close">
          Exit
          <v-icon class="ml-2">mdi-close</v-icon>
        </v-btn>
        <v-btn
          v-if="step === steps.length - 1"
          class="mr-2 px-3"
          variant="tonal"
          elevation="0"
          rounded="md"
          @click="save"
        >
          Save & Exit
          <v-icon class="ml-2">mdi-content-save</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="steps-container">
        <v-stepper
          v-model="step"
          elevation="0"
          class="w-100 round-container centered py-16"
        >
          <v-stepper-header class="d-none">
            <template v-for="(item, index) in steps" :key="`${index}-step`">
              <v-stepper-item
                :complete="step > index && item.complete"
                :step="item"
                :value="index"
                :title="item.title"
                :subtitle="item.subtitle"
                :error="item.error"
              />
              <v-divider v-if="index !== steps.length" :key="index" />
            </template>
          </v-stepper-header>
          <v-stepper-window>
            <v-stepper-window-item
              v-for="(item, index) in steps"
              :key="`${index}-content`"
              class="pa-16"
              :value="index"
            >
              <component
                :is="item.component"
                :header="item.header || ''"
                :items="item.config || []"
                @submit="saveStepData($event)"
              />
            </v-stepper-window-item>
          </v-stepper-window>
        </v-stepper>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn
          :disabled="step === 0"
          class="mr-2 px-3"
          elevation="0"
          rounded="md"
          @click="step--"
        >
          <v-icon class="ml-2">mdi-arrow-left</v-icon>
          Preview
        </v-btn>
        <v-btn
          :disabled="step === steps.length - 1"
          elevation="0"
          class="mr-2 px-3"
          rounded="md"
          @click="step++"
        >
          Next
          <v-icon class="ml-2">mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
  .steps-container {
    padding: 24px !important;
    background: #f2f1f780;
    overflow: auto;
  }
  .centered {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: space-around;
    justify-content: center;
    align-items: center;
  }
  ::v-deep(.v-stepper-window) {
    width: inherit !important;
    padding: 32px;
  }
</style>
