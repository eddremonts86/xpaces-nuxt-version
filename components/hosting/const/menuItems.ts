import type { MenuItems } from '@/types/Global'

export const menuItems = (): MenuItems[] => {
  return [
    {
      title: 'Today',
      icon: 'mdi-calendar-account-outline',
      href: '/spaces',
    },
    {
      title: 'Calendar',
      icon: 'mdi-calendar-month',
      href: '/spaces/calendar',
    },
    {
      title: 'Listings',
      icon: 'mdi-format-list-checks',
      href: '/spaces/listings',
    },
    {
      title: 'Inbox',
      icon: 'mdi-inbox-multiple-outline',
      href: '/spaces/inbox',
    },
  ]
}
