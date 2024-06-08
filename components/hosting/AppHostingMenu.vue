<script setup lang="ts">
  import { menuItems } from '@/components/hosting/const/menuItems'
  import type { MenuItems } from '@/types/Global'
  const items: MenuItems[] = menuItems()
</script>

<template>
  <div v-for="(item, index) in items" :key="index">
    <NuxtLink v-if="item.href" :to="item.href" class="s-nuxt-menu-link">
      <v-icon v-if="item.icon" class="mr-2" size="small" color="#212121">
        {{ item.icon }}
      </v-icon>
      <span class="hidden-sm-and-down">{{ item.title }}</span>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
  .s-nuxt-menu-link {
    text-decoration: none !important;
    text-transform: none !important;
    display: flex;
    align-items: center;
    width: auto;
    padding: 6px 10px;
    margin: 0px 1px;

    span {
      color: #212121 !important;
      font-weight: 500 !important;
      font-size: 0.9rem;
    }

    &:hover {
      background-color: #f5f5f5;
      border-radius: 5px;
    }
  }

  .router-link-exact-active {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
</style>
