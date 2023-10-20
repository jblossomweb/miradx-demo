import { useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'

import type { PostState } from './usePostNewAccount'

export interface ToastMessage {
  type?: 'success' | 'error'
  text: string
}

const useToastEffect = (postState: PostState) => {
  let toastMessage: ToastMessage | undefined = undefined

  if (postState.success) {
    toastMessage = {
      type: 'success',
      text: postState.result?.description || 'Success',
    }
  } else if (postState.error) {
    toastMessage = {
      type: 'error',
      text: postState.error.message || 'Error',
    }
  }

  useEffect(() => {
    if (toastMessage) {
      switch (toastMessage.type) {
        case 'success':
          toast.success(toastMessage.text)
          break
        case 'error':
          toast.error(toastMessage.text)
          break
        default:
          toast(toastMessage.text)
      }
    }
  }, [toastMessage])

  return Toaster
}

export default useToastEffect
