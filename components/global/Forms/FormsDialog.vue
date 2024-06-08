<script lang="ts" setup>
  import AppForms from '@/components/global/Forms/AppForms.vue'
  import { isValidForm } from '@/components/global/Forms/FormValidation'
  import type { FormItem } from '@/types/Global'
  import { computed, reactive, ref } from 'vue'

  const validForm = ref(false)
  let data = reactive<IDictionary>({})
  const emit = defineEmits(['submit', 'update-input', 'save'])
  const props = defineProps<{
    items: FormItem[]
    input: boolean
    title: string
    values: Object
    icon: string | null
    size: string | null
  }>()
  const dialog = computed({
    get: () => props.input || false,
    set: (value) => {
      emit('update-input', value)
    },
  })
  const submit = (values: any) => {
    validForm.value = isValidForm(values, props.items)
    emit('submit', values)
    data = values
  }
  const save = () => {
    if (validForm.value) {
      emit('save', data)
    }
  }
</script>

<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <template #activator="{ props: activatorProps }">
      <v-btn
        icon
        flat
        variant="text"
        v-bind="activatorProps"
        :size="props.size || 'large'"
      >
        <v-icon>{{ icon ? icon : 'mdi-plus' }}</v-icon>
      </v-btn>
    </template>

    <template #default="{ isActive }">
      <v-card>
        <v-card-title class="d-flex justify-center align-center">
          <h3>{{ props.title }}</h3>
          <v-spacer />
          <v-btn icon flat @click="isActive.value = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <AppForms
            :items="props.items"
            :values="props.values"
            @submit="submit($event)"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Save"
            :disabled="!validForm"
            class="text-none ms-4 text-white"
            color="blue-darken-4"
            rounded="4"
            variant="flat"
            @click="save()"
          ></v-btn>
          <v-btn
            text="Close"
            class="text-none"
            color="grey-lighten-3"
            rounded="4"
            variant="flat"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
