import { getLocationInfo } from '@/services/spaces'
import type { SpaceModel } from '@/types/Space'

export const formatSpaces = async (space: SpaceModel[]) => {
  if (!space) return []
  const data = await Promise.all(
    space
      .map(async (ele: SpaceModel) => {
        ele.pricePerMonth = ele.pricePerMonth || 0
        ele.pricePerDay = ele.pricePerDay || 0
        if (!ele.address && ele.location.length === 2) {
          const address = await getLocationInfo(
            //@ts-ignore
            ele.location[0],
            //@ts-ignore
            ele.location[1]
          )
          ele.address =
            address &&
            //@ts-ignore
            'locality' in address.data.value &&
            'city' in address.data.value
              ? `${address.data.value.locality}, ${address.data.value.city}`
              : ''
          return ele
        }
        return ele
      })
      .reverse()
  )
  return data
}
