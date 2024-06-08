<script setup lang="ts">
  import { getSpaces } from '@/services/spaces'
  import type { SpaceModel } from '@/types/Space'
  import { onMounted, ref, watch } from 'vue'
  const auth0Store = useMyAuthStore()
  const dialog = ref(true)
  const spaces = ref<SpaceModel[]>([])
  const loading = ref(false)

  definePageMeta({
    layout: 'hosting',
    middleware: 'auth',
  })

  onMounted(async () => {
    loading.value = true
    await fetchListing()
    loading.value = false
  })
  const fetchListing = async () => {
    spaces.value = await getSpaces()
  }
  const updateDialog = async () => {
    dialog.value = !dialog.value
  }
  const spaceSaved = async () => {
    updateDialog()
    await fetchListing()
  }
  const token = computed(() => auth0Store.getUserToken)
  watch(token, async () => {
    loading.value = true
    await fetchListing()
    loading.value = false
  })
</script>

<template>
  <v-container class="py-15">
    <v-row>
      <v-col cols="12" class="d-flex">
        <div>
          <h1>Listing</h1>
        </div>
        <v-spacer />
        <div>
          <v-btn icon size="small" variant="tonal" class="mx-1">
            <v-icon size="small">mdi-store-check</v-icon>
          </v-btn>
          <v-btn
            icon
            size="small"
            flat
            variant="tonal"
            class="mx-1"
            @click="dialog = !dialog"
          >
            <v-icon size="small">mdi-store-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="loading" cols="12" class="d-flex justify-center">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>
    <HostingAppCardList :spaces="spaces" @reload-spaces="fetchListing" />
    <HostingAppCreateListing
      :dialog="dialog"
      @update-dialog="updateDialog"
      @save-space="spaceSaved"
    />
  </v-container>
</template>
