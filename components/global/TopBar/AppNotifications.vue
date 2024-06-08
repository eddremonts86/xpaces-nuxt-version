<script lang="ts" setup>
  import type { Notifications } from '@/types/Global'

  const notifications: Notifications[] = [
    {
      title: 'Notification',
      type: 'info',
      message: 'This is a notification example',
    },
  ]

  const haveNotifications = notifications.length > 0
</script>

<template>
  <v-menu offset-y flat>
    <template #activator="{ props }">
      <v-btn v-bind="props" rounded>
        <v-icon size="x-large">
          {{ haveNotifications ? 'mdi-bell-badge' : 'mdi-bell' }}
        </v-icon>
      </v-btn>
    </template>
    <v-card min-width="300px" class="my-3">
      <v-card-title>
        <span>Notifications</span>
      </v-card-title>
      <v-divider />
      <v-card-text
        v-for="(notification, index) in notifications"
        :key="index"
        class="s-notification-box"
      >
        <p class="title">
          {{ notification.title }}
        </p>
        <p class="content">
          {{ notification.message }}
        </p>
      </v-card-text>
      <v-card-actions />
    </v-card>
  </v-menu>
</template>

<style lang="scss" scoped>
  .s-notification-box {
    padding: 1rem;
    margin: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 0.5rem;
    max-width: 400px;
    cursor: pointer;
    &:hover {
      background: #f7f7f715;
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
