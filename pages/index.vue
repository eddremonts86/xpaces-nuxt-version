<script setup lang="ts">
  import { getPublicSpaces } from '@/services/spaces'
  import type { SpaceModel } from '@/types/Space'
  import { ref, watch } from 'vue'
  const user = useMyAuthStore()
  const isLoggedIn = computed(() => user.getUserToken)
  const spaces = ref<SpaceModel[]>([])
  const loading = ref(false)
  const loadSpaces = async () => {
    try {
      loading.value = true
      spaces.value = await getPublicSpaces()
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  watch(
    isLoggedIn,
    async () => {
      await loadSpaces()
    },
    { immediate: true }
  )
</script>

<template>
  <v-row>
    <v-col>
      <HostingAppCardList :spaces="spaces" />
    </v-col>
  </v-row>
</template>
