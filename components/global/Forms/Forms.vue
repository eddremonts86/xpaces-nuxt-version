<script lang="ts" setup>
  import type { FormItem } from '@/types/Global'
  import { reactive, watch } from 'vue'
  import type { PropType } from 'vue'

  const dataSubmit: any = reactive({})
  const props = defineProps({
    items: {
      type: Array as PropType<FormItem[]>,
      required: true,
    },
  })

  const emit = defineEmits(['submit'])
  function submit() {
    emit('submit', dataSubmit)
  }

  function multiple(type: string) {
    return type === 'MultiSelect'
  }

  watch(dataSubmit, () => {
    submit()
  })
</script>

<template>
  <form class="form" @submit="submit()">
    <v-row>
      <v-col
        v-for="(item, index) in props.items"
        :key="index"
        cols="12"
        :md="props.items.length > 6 ? 6 : 12"
      >
        <v-text-field
          v-if="item.type === 'textField'"
          v-model.trim="dataSubmit[item.name]"
          :label="item.label"
          :placeholder="item.placeholder"
          :required="item.required"
          :disabled="item.disabled"
          :type="item.variant || 'text'"
          variant="outlined"
        />
        <v-select
          v-else-if="item.type === 'select' || multiple(item.type)"
          v-model="dataSubmit[item.name]"
          variant="outlined"
          :label="item.label"
          :placeholder="item.placeholder"
          :required="item.required"
          :disabled="item.disabled"
          :items="item.options"
          :return-object="multiple(item.type)"
          :multiple="multiple(item.type)"
          item-title="label"
          item-value="value"
        />
      </v-col>
    </v-row>
  </form>
</template>

<style lang="scss" scoped>
  .form {
    width: 100%;
    height: auto;
  }
</style>
