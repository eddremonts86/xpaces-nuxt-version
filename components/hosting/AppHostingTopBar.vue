<script setup>
  const user = useMyAuthStore()
  const isAuthenticated = computed(() => user.isAuthenticated)
</script>
<template>
  <v-app-bar
    flat
    class="app-bar--border-bottom px-12"
    scroll-behavior="{elevate, inverted}"
  >
    <template #prepend>
      <TopBarGlobalAppLogo />
    </template>
    <v-spacer />
    <HostingAppHostingMenu v-if="isAuthenticated" />
    <v-spacer />
    <template #append>
      <TopBarAppNotifications v-if="isAuthenticated" />
      <TopBarAppUserLogin />
    </template>
  </v-app-bar>
</template>
<style lang="scss" scoped>
  .app-bar--border-bottom {
    box-shadow: rgb(0 0 0/8%) 0 1px 0;
    position: fixed !important;
  }
</style>
