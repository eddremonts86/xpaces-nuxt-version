<script setup lang="ts">
  import config from '@/authConfig.json'
  import { useGeolocation } from '@vueuse/core'
  import { onMounted, reactive, ref, watch } from 'vue'
  import { GoogleMap, Marker } from 'vue3-google-map'

  const emit = defineEmits(['location'])
  const center = reactive({ lat: 55.675750469251824, lng: 12.58013853662753 })
  const markerKey = ref(0)
  const location = reactive(useGeolocation())

  const props = withDefaults(defineProps<{ height: string }>(), {
    height: '500px',
  })

  const style = computed(() => ({
    width: '100%',
    height: props.height,
  }))

  onMounted(async () => {
    try {
      watch(location, () => {
        center.lat = location.coords.latitude
        center.lng = location.coords.longitude
        markerKey.value = markerKey.value + 1
        emit('location', center)
      })
    } catch (error) {
      console.log(error)
    }
  })

  const updateLocation = (event: any) => {
    center.lat = event.latLng.lat()
    center.lng = event.latLng.lng()
    emit('location', center)
    markerKey.value = markerKey.value + 1
  }
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
    @click="updateLocation($event)"
  >
    <Marker :key="markerKey" :options="{ position: center }" />
  </GoogleMap>
</template>
