import { toast } from 'sonner'

interface Toast {
  title?: string
  description?: string
}

export const Toast = {
  success: ({ title, description }: Toast) => {
    toast.success(title || 'Thành công!', {
      description
    })
  },

  info: ({ title, description }: Toast) => {
    toast.info(title || 'Thông tin', {
      description
    })
  },

  error: ({ title, description }: Toast) => {
    toast.error(title || 'Lỗi!', {
      description
    })
  }
}
