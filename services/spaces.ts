import { formatSpaces } from '@/services/spaceFormatter'
import type { Space, SpaceModel } from '@/types/Space'
export const saveSpace = async (space: Space) => {
  try {
    const response = await useFetchApi('space-api/space', {
      method: 'POST',
      body: space,
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getSpaces = async (): Promise<SpaceModel[]> => {
  try {
    const { data } = await useFetchApi('space-api/space', { immediate: true })
    //@ts-ignore
    return formatSpaces(data.value)
  } catch (error) {
    console.log(error)
    return [] as SpaceModel[]
  }
}

export const getSpace = async (id: string): Promise<SpaceModel> => {
  try {
    const { data } = await useFetchApi(`space-api/space/${id}`)
    return data.value as SpaceModel
  } catch (error) {
    console.log(error)
    return {} as SpaceModel
  }
}

export const deleteSpace = async (id: string) => {
  try {
    const response = await useFetchApi(`space-api/space/${id}`, {
      method: 'DELETE',
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const updateSpace = async (space: SpaceModel) => {
  try {
    const response = await useFetchApi(`space-api/space/${space.id}`, {
      method: 'PUT',
      body: space,
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const uploadImages = async (images: File[], id: string) => {
  try {
    const formData = new FormData()
    images.forEach((image) => {
      formData.append('images', image)
    })

    const response = await useFetchApi(`space-api/space/${id}/images`, {
      body: formData,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json',
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getLocationInfo = async (lat: number, lng: number) => {
  try {
    const response = await useFetchApi(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      {
        method: 'GET',
      }
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export const publicSpace = async (id: string, isPublic: boolean) => {
  try {
    const response = await useFetchApi(`space-api/space/${id}`, {
      method: 'PUT',
      body: {
        published: isPublic,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getPublicSpaces = async (): Promise<SpaceModel[]> => {
  try {
    const { data } = await useFetchApi('space-api/space/search', {
      immediate: true,
    })
    //@ts-ignore
    return formatSpaces(data.value) as SpaceModel[]
  } catch (error) {
    console.log(error)
    return [] as SpaceModel[]
  }
}
