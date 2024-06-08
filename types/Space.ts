import type { Component } from 'vue'

export enum Amenities {
  electricity_socket = 'Electricity socket',
  lights = 'Lights',
  shelves = 'Shelves',
}
export enum LockType {
  lock_key = 'Lock key',
  electronic_num_pad = 'Electronic num pad',
  fixed_to_wall = 'Fixed to wall',
  fixed_to_door = 'Fixed to door',
  electronic_card = 'Electronic card',
}
export enum SecurityItems {
  video_vigilance = 'Video vigilance',
  controlled_access = 'Controlled access',
  alarm = 'alarm',
}
export enum SafetyItems {
  smoke_alarm = 'Smoke alarm',
  fire_extinguisher = 'Fire extinguisher',
}
export enum Availability {
  fullday = 'Fullday',
  daytime = 'Daytime',
  limited = 'Limited',
}
export enum StorageType {
  container = 'Container',
  house = 'House',
  garage = 'Garage',
  locker = 'Locker',
  basement = 'Basement',
  parking = 'Parking',
  open_space = 'Open space',
}
export enum AccessType {
  lift_access = 'Lift access',
  front_door_access = 'Front door access',
  stairs_access = 'Stairs access',
  street_access = 'Street access',
  independent_access = 'Independent access',
  car_access = 'Car access',
}
export enum Currency {
  EUR = 'EUR',
}
interface ImagesEntity {
  spaceId: string
  ownerId: string
  originalname: string
  encoding: string
  mimetype: string
  filename: string
  size: number
  id: string
}
interface Publisher {
  id: string
  name: string
  nickname: string
  picture: string
}
export interface Space {
  ownerId: string
  description: string
  width: number
  length: number
  height: number
  address: string
  published: boolean
  pricePerDay: number
  pricePerMonth: number
  currency: Currency
  location: {
    alt: number
    lat: number
  }
  amenities: Amenities[]
  lockType: LockType[]
  securityItems: SecurityItems[]
  safetyItems: SafetyItems[]
  availability: Availability
  storageType: StorageType[]
  accessType: AccessType[]
  images?: ImagesEntity[] | null
  publisher: Publisher
  createdAt: string
  updatedAt: string
  id?: string
}

export interface SpaceModel extends Omit<Space, 'location'> {
  location: string[]
}

export interface SpaceForm {
  title: string
  component: Component
  subtitle?: string
  complete: boolean
  error: boolean
  header: string
  config?: SpaceFormConfig[]
}
export interface SpaceFormConfig {
  step?: number
  title?: string
  description?: string
  img?: string
  type?: string
  name?: string
  label?: string
  variant?: string
  placeholder?: string
  defValue?: number | string | string[]
  config?: formConfig
  options?: StepChildren[]
}
export interface formConfig {
  rowHeight?: number
  rows?: number
  autoGrow?: boolean
  clearable?: boolean
}
export interface StepChildren {
  value: string
  label: string
  icon: string
}
