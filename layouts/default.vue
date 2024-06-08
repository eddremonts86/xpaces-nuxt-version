<template>
  <v-layout>
    <TopBarAppTopBar />
    <v-main class="px-16">
      <v-container class="py-15">
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>
