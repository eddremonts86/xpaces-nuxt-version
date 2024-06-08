<script lang="ts" setup>
  import { deleteSpace, publicSpace } from '@/services/spaces'
  import type { SpaceModel } from '@/types/Space'
  import { ref } from 'vue'

  const emits = defineEmits(['reload-spaces', 'delete-space'])
  const props = defineProps({
    space: {
      type: Object as PropType<SpaceModel>,
      required: true,
    },
  })
  const loadingDelete = ref(false)
  const loadingPublish = ref(false)
  const published = ref(props.space?.published)

  const deleteItem = async (id?: string) => {
    if (!id) return
    try {
      loadingDelete.value = true
      await deleteSpace(id)
      emits('delete-space')
    } catch (error) {
      console.log(error)
    } finally {
      loadingDelete.value = false
    }
  }
  const updatePublished = async (space: SpaceModel) => {
    if (!space.id) return
    try {
      loadingPublish.value = true
      await publicSpace(space.id, !space.published)
      published.value = !published.value
      emits('reload-spaces')
    } catch (error) {
      console.log(error)
    } finally {
      loadingPublish.value = false
    }
  }
  const updateItem = async (space: SpaceModel) => {
    console.log(space)
    emits('reload-spaces')
  }
</script>

<template>
  <v-row>
    <v-col class="d-flex justify-start align-center space-actions">
      <span>Edit your Space here</span>
      <v-spacer />
      <v-btn
        color="deep-purple-lighten-2"
        variant="tonal"
        :loading="loadingPublish"
        @click="updatePublished(space)"
      >
        {{ published ? 'Unpublish' : 'Publish' }}
      </v-btn>
      <v-btn
        color="deep-purple-lighten-2"
        variant="text"
        :loading="loadingDelete"
        @click="updateItem(space)"
      >
        Update
      </v-btn>
      <v-btn
        color="deep-purple-lighten-2"
        variant="text"
        @click="deleteItem(space?.id)"
      >
        Delete
      </v-btn>
    </v-col>
  </v-row>
</template>
<style lang="scss" scoped>
  .space-actions {
    background: #f9f9f9;
    border-radius: 12px;
    padding: 15px 10;
    margin: 25px 0;
  }
</style>
