import {
  DynamicContainerSelector,
  DynamicForm,
  DynamicInfoMap,
  DynamicUpload,
  Information,
} from '@/components/hosting/ListingSteps'
import type { SpaceForm, StepChildren } from '@/types/Space'
import {
  AccessType,
  Amenities,
  Availability,
  Currency,
  LockType,
  SafetyItems,
  SecurityItems,
  StorageType,
} from '@/types/Space'

export const steps: SpaceForm[] = [
  {
    title: 'Get started',
    component: Information,
    subtitle: 'It’s easy to get started on.',
    complete: true,
    error: false,
    header: 'MySpaceX',
    config: [
      {
        step: 1,
        title: 'Tell us about your place',
        description:
          'Share some basic info, such as where it is and how many guests can  stay.',
        img: 'https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg',
      },
      {
        step: 2,
        title: 'Make it stand out',
        description:
          'Add 5 or more photos plus a title and description – we’ll help you out',
        img: 'https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg',
      },
      {
        step: 3,
        title: 'Finish up and publish',
        description:
          "Choose if you'd like to start with an experienced guest, set a starting price and publish your listing.",
        img: 'https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg',
      },
    ],
  },
  {
    title: 'Step Two',
    component: DynamicForm,
    subtitle: 'Test Content',
    complete: false,
    error: false,
    header: 'Tell us about your place',
    config: [
      {
        type: 'textArea',
        name: 'address',
        label: 'Address',
        variant: 'htmlEditor',
        placeholder: 'Address',
        config: {
          rowHeight: 15,
          rows: 1,
          autoGrow: true,
          clearable: true,
        },
      },
      {
        type: 'htmlEditor',
        name: 'description',
        label: 'Description',
        variant: 'htmlEditor',
        placeholder: 'Description',
        config: {
          rowHeight: 30,
          rows: 3,
          autoGrow: true,
          clearable: true,
        },
      },
      {
        type: 'textField',
        name: 'width',
        label: 'Width(m)',
        variant: 'number',
        placeholder: 'Width',
        defValue: 3,
      },
      {
        type: 'textField',
        name: 'length',
        label: 'Length(m)',
        variant: 'number',
        placeholder: 'Length',
        defValue: 3,
      },
      {
        type: 'textField',
        name: 'height',
        label: 'Height(m)',
        variant: 'number',
        placeholder: 'Height',
        defValue: 3,
      },
      {
        type: 'textField',
        name: 'pricePerDay',
        label: 'Price per day(€)',
        variant: 'number',
        placeholder: 'Price per day',
        defValue: 10,
      },
      {
        type: 'textField',
        name: 'pricePerMonth',
        label: 'Price per month(€)',
        variant: 'number',
        placeholder: 'Price per month',
        defValue: 300,
      },
      {
        type: 'select',
        name: 'currency',
        label: 'Currency(€/$)',
        variant: 'text',
        placeholder: 'currency',
        options: getChildren(Currency),
        defValue: 'EUR',
      },
    ],
  },
  {
    title: 'Localization',
    subtitle: 'Localization',
    header: 'Localization',
    component: DynamicInfoMap,
    complete: false,
    error: false,
  },
  {
    title: 'Step Three',
    header: 'Amenities',
    subtitle: 'Test Content',
    complete: false,
    error: false,
    component: DynamicContainerSelector,
    config: [
      {
        type: 'MultiSelect',
        name: 'amenities',
        label: 'Amenities',
        options: getChildren(Amenities),
      },
    ],
  },
  {
    title: 'Step Two',
    component: DynamicContainerSelector,
    subtitle: 'Test Content',
    header: 'Lock Type',
    complete: false,
    error: true,
    config: [
      {
        type: 'MultiSelect',
        name: 'lockType',
        label: 'LockType',
        options: getChildren(LockType),
      },
    ],
  },
  {
    title: 'Step Three',
    component: DynamicContainerSelector,
    subtitle: 'Test Content',
    complete: false,
    header: 'Security Items',
    error: false,
    config: [
      {
        type: 'MultiSelect',
        name: 'securityItems',
        label: 'SecurityItems',
        options: getChildren(SecurityItems),
      },
    ],
  },
  {
    title: 'Step Two',
    component: DynamicContainerSelector,
    subtitle: 'Test Content',
    header: 'Safety Items',
    complete: false,
    error: false,
    config: [
      {
        type: 'MultiSelect',
        name: 'safetyItems',
        label: 'SafetyItems',
        options: getChildren(SafetyItems),
      },
    ],
  },
  {
    title: 'Step Three',
    component: DynamicContainerSelector,
    subtitle: 'Test Content',
    header: 'Availability',
    complete: false,
    error: false,
    config: [
      {
        type: 'singleSelect',
        name: 'availability',
        label: 'Availability',
        options: getChildren(Availability),
      },
    ],
  },
  {
    title: 'Step Three',
    component: DynamicContainerSelector,
    subtitle: 'Test Content',
    header: 'Storage Type',
    complete: false,
    error: false,
    config: [
      {
        type: 'singleSelect',
        name: 'storageType',
        label: 'StorageType',
        options: getChildren(StorageType),
      },
    ],
  },
  {
    title: 'Step Three',
    component: DynamicContainerSelector,
    subtitle: 'Test Content',
    header: 'Access Type',
    complete: false,
    error: false,
    config: [
      {
        type: 'MultiSelect',
        name: 'accessType',
        label: 'AccessType',
        options: getChildren(AccessType),
      },
    ],
  },
  {
    title: 'Finish',
    component: Information,
    header: 'Create your hosting listing',
    complete: false,
    error: false,
    config: [
      {
        title: 'It is time to finish up!',
        description:
          'Ones you’ve finished up, you can publish your listing and start receiving bookings.',
        img: 'https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg',
      },
    ],
  },
  {
    title: 'Upload Images',
    component: DynamicUpload,
    header: 'Upload Images',
    complete: false,
    error: false,
    config: [
      {
        title: 'Upload Images',
        description:
          'Upload 5 or more photos plus a title and description – we’ll help you out',
        img: 'https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg',
      },
    ],
  },
  {
    title: 'Published',
    component: Information,
    header: 'Your listing is published!',
    complete: false,
    error: false,
    config: [
      {
        title: 'Congratulations!',
        description: 'Your listing is now live and bookable by guests.',
        img: 'https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg',
      },
    ],
  },
]

function getChildren(ele: { [key: string]: string }): StepChildren[] {
  const keys = Object.keys(ele)
  return keys.map((key) => {
    return {
      value: key,
      label: ele[key],
      icon: getIcons(key),
    }
  })
}

function getIcons(key: string): string {
  const iconsList: { [key: string]: string } = {
    electricity_socket: 'mdi-power-socket-us',
    lights: 'mdi-lamps-outline',
    shelves: ' mdi-library-shelves',
    lock_key: 'mdi-shield-lock-open-outline',
    electronic_num_pad: 'mdi-dialpad',
    fixed_to_wall: 'mdi-wall',
    fixed_to_door: 'mdi-door-closed-lock',
    electronic_card: 'mdi-credit-card-settings-outline',
    video_vigilance: 'mdi-monitor-account',
    controlled_access: 'mdi-human',
    alarm: 'mdi-alarm-light-outline',
    smoke_alarm: 'mdi-smoke',
    fire_extinguisher: 'mdi-fire-extinguisher',
    fullday: 'mdi-theme-light-dark',
    daytime: 'mdi-weather-sunset-up',
    limited: 'mdi-sun-clock-outline',
    container: 'mdi-train-car-container',
    house: 'mdi-hoop-house',
    garage: 'mdi-garage-variant',
    locker: 'mdi-locker',
    basement: 'mdi-home-floor-b',
    parking: ' mdi-car-brake-parking',
    open_space: 'mdi-door-sliding-open',
    lift_access: 'mdi-forklift',
    front_door_access: 'mdi-door-closed',
    stairs_access: 'mdi-stairs-box',
    street_access: 'mdi-google-street-view',
    independent_access: 'mdi-fence',
    car_access: ' mdi-shield-car',
    EUR: 'mdi-currency-eur',
  }
  return iconsList[key] || 'mdi-home-outline'
}
