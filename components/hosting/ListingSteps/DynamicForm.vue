<script lang="ts" setup>
  import AppForms from '@/components/global/Forms/AppForms.vue'
  import { DynamicHeader } from '@/components/hosting/ListingSteps'
  import type { FormItem } from '@/types/Global'

  const props = defineProps<{ header: string; items: FormItem[] }>()
  const emit = defineEmits(['submit'])
</script>

<template>
  <v-row>
    <v-col cols="12" md="6" class="d-flex justify-center align-center">
      <DynamicHeader :header="props.header" />
    </v-col>
    <v-col cols="12" md="6" class="d-flex d-colum pa-16">
      <AppForms
        :items="props.items"
        :items-per-columns="2"
        @submit="emit('submit', $event)"
      />
    </v-col>
  </v-row>
</template>
