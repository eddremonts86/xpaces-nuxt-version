<script lang="ts" setup>
  const props = defineProps<{ file: File }>()
  const emits = defineEmits(['delete-file'])
  const fileType = (file: File) => {
    const name = file.name.split('.')
    return name[name.length - 1]
  }

  const fileSize = (file: File) => {
    return Math.round((file.size / 1024 / 1024) * 100) / 100
  }
  const fileData = computed(() => {
    return {
      fileType: fileType(props.file),
      fileSize: fileSize(props.file),
      fileName: props.file.name,
    }
  })

  const isAImage = computed(() => {
    const type = fileType(props.file)
    return type === 'jpg' || type === 'jpeg' || type === 'png'
  })

  const imagesBoldUrl = computed(() => {
    return URL.createObjectURL(props.file)
  })

  const deleteFile = (e: Event) => {
    e.preventDefault()
    emits('delete-file', props.file)
  }
</script>

<template>
  <div class="upload-files">
    <div class="d-flex justify-center align-center">
      <div v-if="isAImage" class="px-2">
        <img :src="imagesBoldUrl" :alt="fileData.fileName" class="file-image" />
      </div>
      <div class="file-desc">
        <div>{{ fileData.fileName }}</div>
        <div>{{ fileData.fileSize }} MBytes</div>
      </div>
    </div>
    <div class="px-2">
      <v-btn color="error" icon flat size="36" @click="deleteFile($event)">
        <v-icon size="20">mdi-delete</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .upload-files {
    background-color: rgba(209, 207, 207, 0.737);
    padding: 10px;
    border-radius: 5px;
    margin: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      background-color: rgba(209, 207, 207, 0.28);
    }
    .file-desc {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .file-image {
      border-radius: 5px;
      width: 80px;
      height: 60px;
    }
  }
</style>
