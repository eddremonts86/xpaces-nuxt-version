<template>
  <NuxtLink to="/" class="s-nuxt-link">
    <v-icon size="x-large" class="mr-2" color="#212121">
      mdi-truck-fast-outline
    </v-icon>
    <span>MySpaceX</span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .s-nuxt-link {
    text-decoration: none !important;
    text-transform: none !important;
    display: flex;
    align-items: center;
    width: auto;
    span {
      color: #212121 !important;
      font-weight: 600 !important;
    }
  }
</style>
