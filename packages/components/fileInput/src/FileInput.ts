import { ref, type Ref } from 'vue'
import { remove } from 'lodash-es'

export type FileInput = {
  files: File[]
}

export interface FileInputProps {
  name: string
  modelValue?: string
  accept?: string
  multiple?: boolean
  type?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'secondary'
}

export const useFileInput = (props: FileInputProps, _ref: Ref<HTMLInputElement | null>) => {
  const _prop = {
    name: props.name,
    accept: props.accept,
    multiple: props.multiple
  }

  const files = ref<File[]>([])

  const inputHandler = () => {
    const input: HTMLInputElement | null = _ref.value
    if (input?.files) {
      files.value.push(...Array.from(input.files))
    }
  }

  const deleteFile = (file: File) => {
    remove(files.value, (item) => item === file)
  }

  return {
    _prop,
    deleteFile,
    files,
    inputHandler
  }
}
