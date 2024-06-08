<script lang="ts" setup>
  import { DynamicHeader } from '@/components/hosting/ListingSteps'
  import type { FormItem } from '@/types/Global'
  import { reactive } from 'vue'

  const props = defineProps<{
    header: string
    items: FormItem[]
  }>()
  const emit = defineEmits(['submit'])
  const values: Record<string, string | string[]> = reactive({})

  function active(ele: string, key: string, type: string) {
    if (!key) return

    if (type === 'singleSelect') {
      return values[key] === ele
    }

    if (values[key]) {
      return values[key].includes(ele)
    }

    values[key] = []
    return false
  }

  function updateValue(id: string, key: string, type: string) {
    if (type === 'singleSelect') {
      values[key] = id
      emit('submit', values)
      return
    }

    if (!active(id, key, type)) {
      values[key] = [...values[key], id]
    } else {
      // @ts-ignore
      values[key] = values[key].filter((v) => v !== id)
    }
    emit('submit', values)
  }
</script>

<template>
  <v-row>
    <v-col cols="12" md="6" class="d-flex justify-center align-center">
      <DynamicHeader :header="props.header" />
    </v-col>
    <v-col cols="12" md="6">
      <v-row
        v-for="(list, index) in props.items"
        :key="index"
        class="d-flex d-colum pa-16 ma-0"
      >
        <v-col v-if="props.items.length > 1" cols="12">
          <b>{{ props.items[index].label }}</b>
        </v-col>
        <v-col
          v-for="item in list.options"
          :key="item.value"
          cols="12"
          class="pa-0 my-2"
        >
          <div
            class="s-notification-box"
            :class="{ active: active(item.value, list.name, list.type) }"
            @click="updateValue(item.value, list.name, list.type)"
          >
            <div class="d-flex d-column justify-start align-center">
              <v-icon
                v-if="item.icon"
                size="45"
                :color="
                  active(item.value, list.name, list.type) ? 'primary' : 'black'
                "
                class="mr-2 icons"
              >
                {{ item.icon }}
              </v-icon>

              <p v-if="item.label" class="title">
                {{ item.label }}
              </p>
              <p v-if="item.content" class="content">
                {{ item.content }}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
  .s-notification-box {
    padding: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 0.5rem;
    max-width: 400px;
    min-width: 200px;
    cursor: pointer;

    &.active {
      border: 2px solid #1867c0;
      background-color: #1867c0;
      color: white !important;
      .icons {
        color: white !important;
      }
    }

    &:hover {
      background-color: #1867c0;
      border: 2px solid #1867c0;
      color: white !important;
      .icons {
        color: white !important;
      }
    }

    .title {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .content {
      font-size: 0.8rem;
    }
  }
</style>
