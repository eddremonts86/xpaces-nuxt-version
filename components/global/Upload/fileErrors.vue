<script lang="ts" setup="false">
  import _slugify from 'slugify'
  import type { FileRejectReasonExt } from '@/types/Global'

  const props = defineProps<{ filesWithErrors: FileRejectReasonExt[] }>()
  const emits = defineEmits(['delete-file'])

  const deleteFile = (file: FileRejectReasonExt) => {
    emits('delete-file', file)
  }
</script>

<template>
  <div v-for="files in props.filesWithErrors" :key="files.file?.name">
    <div
      v-for="error in files.errors"
      :key="_slugify(error?.message)"
      class="pa-2"
    >
      <v-alert border type="error" closable>
        <template #title>
          <div class="title">{{ files.file?.name }}</div>
        </template>
        <template #text>
          <div class="message">{{ error?.message }}</div>
        </template>
        <template #close>
          <v-btn color="error" icon @click="deleteFile(files)">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </template>
      </v-alert>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .title {
    font-size: 14px;
    text-align: left;
  }
  .message {
    font-size: 12px;
    text-align: left;
  }
</style>
