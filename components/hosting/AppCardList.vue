<script lang="ts" setup>
  import type { SpaceModel } from '~/types/Space'
  const props = defineProps<{
    spaces: SpaceModel[]
  }>()
  const emit = defineEmits(['reload-spaces'])
</script>
<template>
  <v-row>
    <v-col
      v-for="space in props.spaces"
      :key="space.id"
      cols="12"
      md="3"
      class="d-flex align-stretch"
    >
      <HostingAppListingCard
        :space="space"
        @reload-spaces="emit('reload-spaces')"
      />
    </v-col>
  </v-row>
</template>
