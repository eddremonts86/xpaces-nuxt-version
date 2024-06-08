<script lang="ts" setup>
  import fileType from '@/components/global/Upload/file.vue'
  import fileErrors from '@/components/global/Upload/fileErrors.vue'
  import { uploadImages } from '@/services/spaces'
  import { reactive, ref } from 'vue'
  import type { FileRejectReason } from 'vue3-dropzone'
  import { useDropzone } from 'vue3-dropzone'
  import type { FileRejectReasonExt } from '@/types/Global'

  const files = ref<File[] | null>([])
  const filesWithErrors = ref<FileRejectReasonExt[] | null>(null)
  const props = defineProps({
    multiple: {
      type: Boolean,
      default: true,
    },
    accept: {
      type: String,
      default: '.jpg, .png, .jpeg',
    },
  })

  const emits = defineEmits(['update-files'])

  const onDrop = async (
    acceptedFiles: File[],
    rejectReasons: FileRejectReason[]
  ) => {
    emits('update-files', acceptedFiles)
    files.value = acceptedFiles
    filesWithErrors.value = rejectReasons as FileRejectReasonExt[]

    const id = '65f82083fba103cf0c95006e'
    await uploadImages(acceptedFiles, id)
  }
  const options = reactive({
    multiple: props.multiple,
    onDrop,
    accept: props.accept,
    maxSize: 5000000,
    minSize: 100000,
    maxFiles: 5,
  })

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragReject } =
    useDropzone(options)

  const deleteFile = (file: File) => {
    if (!files.value?.length) return
    files.value = files.value?.filter((f) => f.name !== file.name)
    emits('update-files', files.value)
  }
  const deleteErrorFile = (file: File) => {
    if (!filesWithErrors.value?.length) return
    filesWithErrors.value = filesWithErrors.value?.filter(
      // @ts-ignore
      (f) => f.file?.name !== file.name
    )
    emits('update-files', files.value)
  }
</script>

<template>
  <div>
    <div v-bind="getRootProps()" class="dropzone">
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag 'n' drop some files here, or click to select files</p>
      <div v-if="isFocused" id="focus">focused</div>
      <div v-if="isDragReject" id="isDragReject">
        isDragReject: {{ isDragReject }}
      </div>
    </div>
    <div v-for="file in files" :key="file.name">
      <fileType :file="file" @delete-file="deleteFile($event)" />
    </div>
    <div v-if="filesWithErrors?.length">
      <fileErrors
        :files-with-errors="filesWithErrors"
        @delete-file="deleteErrorFile($event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .dropzone {
    border: 2px dashed #e0e0e0;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
  }
</style>
