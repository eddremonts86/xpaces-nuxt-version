<script setup lang="ts">
  import config from '@/authConfig.json'
  import { GoogleMap, Marker } from 'vue3-google-map'

  const props = defineProps<{ location: string[]; height: string }>()

  const style = computed(() => ({
    width: '100%',
    height: props.height,
  }))
  const center = computed(() => ({
    lat: props.location[0],
    lng: props.location[1],
  }))
</script>

<template>
  <GoogleMap
    :style="style"
    :api-key="config.googleMapKey"
    :center="center"
    :zoom="15"
    :disable-double-click-zoom="false"
    :fullscreen-control="false"
    :street-view-control="false"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>
