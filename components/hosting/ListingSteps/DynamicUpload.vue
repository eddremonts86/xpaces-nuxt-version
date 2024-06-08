<script lang="ts" setup>
  import { upload } from '@/components/global'
  import { DynamicHeader } from '@/components/hosting/ListingSteps'
  import type { SpaceFormConfig } from '@/types/Space'

  const props = defineProps<{ header: string; items: SpaceFormConfig[] }>()
</script>

<template>
  <v-row>
    <v-col cols="12" md="6" class="d-flex justify-center align-center">
      <DynamicHeader :header="props.header" />
    </v-col>
    <v-col cols="12" md="6">
      <upload class="radius-6" />
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
