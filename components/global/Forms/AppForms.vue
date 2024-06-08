<script lang="ts" setup>
  import htmlEditor from '@/components/global/Editor/HtmlEditor.vue'
  import { formatDateToOther } from '@/libs/helpers'
  import type { FormItem } from '@/types/Global'
  import type { PropType } from 'vue'
  import { onMounted, reactive, watch } from 'vue'
  const dataSubmit: any = reactive({})
  const props = defineProps({
    items: {
      type: Array as PropType<FormItem[]>,
      required: true,
    },
    values: {
      type: Object,
      default: () => ({}),
    },
    itemsPerColumns: {
      type: Number,
      default: 6,
    },
    compact: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      default: true,
    },
  })

  onMounted(() => {
    props.items.map((ele) => {
      if (ele.variant === 'date') {
        const todayDate = formatDateToOther()
        dataSubmit[ele.name] = props.values[ele.name]
          ? props.values[ele.name]
          : todayDate
      } else {
        dataSubmit[ele.name] = props.values[ele.name] || ele.defValue || ''
      }
    })
  })

  const emit = defineEmits(['submit'])
  function submit() {
    emit('submit', dataSubmit)
  }

  function multiple(type: string) {
    return type === 'MultiSelect'
  }

  const checkInputs = () => {
    console.log(dataSubmit)
  }

  const dense = computed(() => {
    return props.compact ? 'compact' : undefined
  })

  const md = (item: FormItem) => {
    if (item.type === 'htmlEditor' || item.variant === 'htmlEditor') return 12
    return props.items.length > props.itemsPerColumns ? 6 : 12
  }
  const lg = (item: FormItem) => {
    if (item.type === 'htmlEditor' || item.variant === 'htmlEditor') return 12
    return props.items.length > props.itemsPerColumns ? 6 : 12
  }

  watch(dataSubmit, () => {
    submit()
  })
</script>

<template>
  <form class="form" @submit="submit()" @input="checkInputs()">
    <v-row>
      <v-col
        v-for="(item, index) in props.items"
        :key="index"
        cols="12"
        :md="md(item)"
        :lg="lg(item)"
      >
        <v-text-field
          v-if="item.type === 'textField'"
          v-model.trim="dataSubmit[item.name]"
          variant="outlined"
          :class="item.hidden ? 'd-none' : null"
          :label="item.label"
          :placeholder="item.placeholder"
          :required="item.required"
          :disabled="item.disabled"
          :type="item.variant || 'text'"
          :hide-details="hideDetails"
          :density="dense"
          :prefix="item.config?.prefix || ''"
        />

        <v-textarea
          v-if="item.type === 'textArea'"
          v-model.trim="dataSubmit[item.name]"
          variant="outlined"
          :class="item.hidden ? 'd-none' : null"
          :label="item.label"
          :placeholder="item.placeholder"
          :required="item.required"
          :disabled="item.disabled"
          :hide-details="hideDetails"
          :density="dense"
          :row-height="item.config?.rowHeight || 30"
          :rows="item.config?.rows || 3"
          :auto-grow="item.config?.autoGrow || false"
          :clearable="item.config?.clearable || false"
        />

        <v-checkbox
          v-if="item.type === 'checkbox'"
          v-model="dataSubmit[item.name]"
          color="primary"
          variant="outlined"
          :class="item.hidden ? 'd-none' : null"
          :label="item.label"
          :placeholder="item.placeholder"
          :required="item.required"
          :disabled="item.disabled"
          :hide-details="hideDetails"
          :density="dense"
        />

        <v-select
          v-if="item.type === 'select' || multiple(item.type)"
          v-model="dataSubmit[item.name]"
          variant="outlined"
          item-title="label"
          item-value="value"
          :class="item.hidden ? 'd-none' : null"
          :label="item.label"
          :placeholder="item.placeholder"
          :required="item.required"
          :disabled="item.disabled"
          :items="item.options"
          :return-object="multiple(item.type)"
          :multiple="multiple(item.type)"
          :hide-details="hideDetails"
          :density="dense"
        />

        <v-autocomplete
          v-if="item.type === 'autocomplete' || multiple(item.type)"
          v-model="dataSubmit[item.name]"
          append-icon="mdi-magnify"
          persistent-hint
          item-title="label"
          item-value="value"
          variant="outlined"
          :class="item.hidden ? 'd-none' : null"
          :label="item.label"
          :placeholder="item.placeholder"
          :required="item.required"
          :disabled="item.disabled"
          :items="item.options"
          :return-object="multiple(item.type)"
          :multiple="multiple(item.type)"
          :hide-details="hideDetails"
          :density="dense"
        />

        <div v-if="item.type === 'htmlEditor'">
          <span v-text="item.placeholder"></span>
          <htmlEditor
            :value="dataSubmit[item.name]"
            class="htmlEditor"
            @input="
              (value: string) => {
                dataSubmit[item.name] = value
              }
            "
          />
        </div>
      </v-col>
    </v-row>
  </form>
</template>

<style lang="scss" scoped>
  .form {
    width: 100%;
    height: auto;
  }
  .htmlEditor {
    width: 100%;
    height: auto;
    border: 1px solid #ababab;
    border-radius: 4px;
    padding: 5px;
  }
</style>
