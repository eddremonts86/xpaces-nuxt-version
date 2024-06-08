import type { Space, SpaceModel } from '@/types/Space'
import { defineStore } from 'pinia'

export const useMySpacesStore = defineStore({
  id: 'mySpacesStore',
  state: () => ({
    stepsData: {} as Space,
    space: {} as SpaceModel,
  }),
  actions: {
    setData(stepsData: Space) {
      this.stepsData = stepsData
    },
    setSpace(space: SpaceModel) {
      this.space = space
    },
  },
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMySpacesStore, import.meta.hot))
}
