<script setup lang="ts">
  import { MenuItems } from '@/components/global/TopBar/const/MenuItems'
  import type { User, UserMenuItems } from '@/types/Global'
  import { useAuth0 } from '@auth0/auth0-vue'
  import { ref, watch } from 'vue'

  const authStore = useMyAuthStore()

  const auth0 = useAuth0()
  const user = ref(auth0.user)
  const isAuthenticated = ref(auth0.isAuthenticated)
  const router = useRoute()
  let items: UserMenuItems[] = getMenuItems()

  function getMenuItems() {
    return MenuItems(isAuthenticated.value).filter((ele) => ele.status)
  }

  async function actions(action: string) {
    if (action === 'LogIn') {
      try {
        await auth0.loginWithRedirect()
        return
      } catch (error) {
        console.log(error)
      }
    }
    if (action === 'Logout') {
      try {
        auth0.logout()
        authStore.updateSore(null, '', false)
        return
      } catch (error) {
        console.log(error)
      }
    }
  }

  const showBtnMySpace = computed(() => {
    const routeName = router.name as string
    return isAuthenticated.value && !routeName.includes('spaces')
  })

  watch(isAuthenticated, async (newVal) => {
    items = getMenuItems()
    const token = await auth0.getAccessTokenSilently()
    const storeUser = auth0.user.value as User
    authStore.updateSore(storeUser, token, newVal)
  })
</script>

<template>
  <v-menu offset-y class="my-3">
    <template #activator="{ props }">
      <v-btn
        v-if="showBtnMySpace"
        rounded
        variant="text"
        class="mx-2"
        to="/spaces"
      >
        My SpaceX
      </v-btn>
      <v-btn v-bind="props" rounded variant="outlined">
        <v-icon size="small" class="mr-1">mdi-menu</v-icon>
        <v-icon v-if="!isAuthenticated" size="x-large">
          mdi-account-circle
        </v-icon>
        <v-avatar v-else size="30">
          <v-img :src="user?.picture" />
        </v-avatar>
      </v-btn>
    </template>
    <v-list min-width="250px">
      <template v-for="(item, index) in items" :key="index">
        <v-divider v-if="item.type === 'divider'" class="my-2" />
        <v-list-item
          v-else
          :to="item.to || ''"
          @click="item.action ? actions(item.action) : null"
        >
          <template v-if="item.icon" #prepend>
            <v-icon size="small">
              {{ item.icon }}
            </v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>
