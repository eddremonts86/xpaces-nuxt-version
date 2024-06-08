import configJson from '@/authConfig.json'
import { useMyAuthStore } from '@/stores/auth'
import { useFetch } from 'nuxt/app'
type useFetchType = typeof useFetch

export const useFetchApi: useFetchType = (path: string, options: any = {}) => {
  const AUTH = useMyAuthStore()
  const USER_TOKEN = AUTH.getUserToken
  const IS_AUTHENTICATED = AUTH.getAuthenticatedUser

  options = {
    ...options,
    baseURL: configJson.spacesXApi ?? process.env.BASE_URL,
    headers: options.headers ?? {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    onResponseError: (response: unknown) => {
      console.error(response)
    },
  }

  if (IS_AUTHENTICATED) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${USER_TOKEN}`,
    }
  }

  return useFetch(path, options)
}
