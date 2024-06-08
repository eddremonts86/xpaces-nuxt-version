import type { UserMenuItems } from '@/types/Global'

export const MenuItems = (isUserLoggedIn: boolean): UserMenuItems[] => {
  return [
    {
      title: 'Sing up',
      status: !isUserLoggedIn,
      type: 'menu-item',
      icon: 'mdi-account-plus',
      action: 'SingUp',
    },
    {
      title: 'Login',
      status: !isUserLoggedIn,
      type: 'menu-item',
      icon: 'mdi-login',
      action: 'LogIn',
    },
    {
      title: 'Logout',
      status: isUserLoggedIn,
      type: 'menu-item',
      icon: 'mdi-logout',
      action: 'Logout',
    },
    { title: 'divider', status: true, type: 'divider' },
    {
      title: 'My SpaceX',
      status: isUserLoggedIn,
      type: 'menu-item',
      icon: 'mdi-map-marker',
      to: '/spaces',
    },
    {
      title: 'Gif card',
      status: isUserLoggedIn,
      type: 'menu-item',
      icon: 'mdi-image-filter-vintage',
      to: '/gif-card',
    },
    {
      title: 'Help Center',
      status: true,
      type: 'menu-item',
      icon: 'mdi-help-circle',
      to: '/help-center',
    },
  ]
}
