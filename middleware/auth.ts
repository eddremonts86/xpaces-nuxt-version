import { useAuth0 } from '@auth0/auth0-vue'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth0()
  const router = useRouter()
  if (!auth.isAuthenticated.value) {
    router.push('/')
  }
})
