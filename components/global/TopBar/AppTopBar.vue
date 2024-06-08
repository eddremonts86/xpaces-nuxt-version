<template>
  <v-app-bar flat class="s-border-bottom px-12">
    <template #prepend>
      <TopBarGlobalAppLogo />
    </template>

    <template #append>
      <TopBarAppUserLogin />
    </template>
  </v-app-bar>
</template>
<style lang="scss" scoped>
  .s-border-bottom {
    box-shadow: rgb(0 0 0/8%) 0 1px 0;
  }
</style>
