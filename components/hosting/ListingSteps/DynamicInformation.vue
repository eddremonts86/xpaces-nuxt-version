<script lang="ts" setup>
  import { DynamicHeader } from '@/components/hosting/ListingSteps'
  import type { SpaceFormConfig } from '@/types/Space'

  const props = defineProps<{ header: string; items: SpaceFormConfig[] }>()
</script>

<template>
  <v-row>
    <v-col cols="12" md="6" class="d-flex justify-center align-center">
      <DynamicHeader :header="props.header" />
    </v-col>
    <v-col
      v-if="props.items.length > 0"
      cols="12"
      md="6"
      class="d-flex d-colum"
    >
      <v-row>
        <v-col
          v-for="(item, index) in props.items"
          :key="index"
          cols="12"
          class="items-list"
        >
          <div>
            <p v-if="item.step" class="item-number">
              {{ item.step }}
            </p>
          </div>
          <div class="item-content">
            <div>
              <p class="item-content-title">
                {{ item.title }}
              </p>
            </div>
            <div>
              <p class="item-content-desc">
                {{ item.description }}
              </p>
            </div>
          </div>
          <div v-if="item.title" class="item-img">
            <img :src="item.img" :alt="item.title" />
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style lang="scss" scope>
  .items-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 0;
    background-color: #fff;
    box-shadow: rgb(0 0 0/8%) 0 1px 0;
    margin-bottom: 10px;
    max-width: 650px;
    .item-number {
      font-size: 3rem;
      font-weight: 700;
      color: #000;
      padding: 0 20px;
    }
    .item-content-title {
      font-size: 1.8rem;
      font-weight: 500;
      line-height: 3.2rem;
      color: #000;
    }
    .item-content-desc {
      font-size: 1.1rem;
      font-weight: 400;
      line-height: 1.8rem;
      color: #717171;
    }
    .item-img {
      img {
        width: 100px;
        height: auto;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .items-list {
      flex-direction: column;
      .item-number {
        font-size: 4rem;
      }
      .item-content-title {
        font-size: 1.5rem;
        line-height: 2.5rem;
      }
      .item-content-desc {
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }
  }
</style>
