<script lang="ts" setup>
  import { maps } from '@/components/global'
  import { DynamicHeader } from '@/components/hosting/ListingSteps'

  type Items = {
    step: number
    title: string
    description: string
    img: string
  }
  const props = defineProps<{ header: string; items: Items[] }>()
  const emit = defineEmits(['submit'])
  const updateLocation = (event: { lat: number; lng: number }) => {
    emit('submit', {
      location: [event.lat, event.lng],
    })
  }
</script>

<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <DynamicHeader :header="props.header" />
    </v-col>
    <v-col cols="12">
      <maps class="radius-6" @location="updateLocation($event)" />
    </v-col>
  </v-row>
</template>

<style lang="scss" scope>
  .radius-6 {
    border-radius: 6px;
    background: rgba(233, 233, 233, 0.479);
    padding: 12px;
  }
</style>
