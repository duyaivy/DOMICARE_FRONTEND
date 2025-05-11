import { useRef, useState } from 'react'
import { Toast } from '@/utils/toastMessage'
import { ImagePlus, Trash2, File as FileIcon, FileImage, FileText } from 'lucide-react'
import classNames from 'classnames'
import { fileApi } from '@/core/services/file.service'
import config from '@/configs'

interface UploadingFile {
  file: File
  progress: number
  status: 'uploading' | 'done' | 'error'
  uploadedFile?: any // dữ liệu trả về từ server
}

interface InputImagesProps {
  values: any[]
  setFiles: (files: any[]) => void
}

export default function InputImages({ values, setFiles }: InputImagesProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Drag & drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  // Chọn file qua input
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    handleFiles(files)
    if (inputRef.current) inputRef.current.value = ''
  }

  // Kiểm tra và upload file
  const handleFiles = (files: File[]) => {
    const validFiles: File[] = []
    let hasInvalidFile = false
    files.forEach((file) => {
      if (file.size < config.maxSizeUploadAvatar && file.type.includes('image')) {
        validFiles.push(file)
      } else {
        hasInvalidFile = true
      }
    })
    if (hasInvalidFile) {
      Toast.error({
        title: `Dung lượng file tối đa 2MB\nĐịnh dạng .JPEG .PNG`
      })
    }
    if (validFiles.length > 0) {
      validFiles.forEach(uploadFile)
    }
  }

  // Upload từng file
  const uploadFile = (file: File) => {
    const newUploading: UploadingFile = { file, progress: 0, status: 'uploading' }
    setUploadingFiles((prev) => [...prev, newUploading])
    const formData = new FormData()
    formData.append('file', file)
    fileApi
      .post(formData, {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          setUploadingFiles((prev) => prev.map((f) => (f.file === file ? { ...f, progress: percent } : f)))
        }
      })
      .then((res: any) => {
        setUploadingFiles((prev) =>
          prev.map((f) => (f.file === file ? { ...f, progress: 100, status: 'done', uploadedFile: res.data.data } : f))
        )
        setFiles([...values, res.data.data])
      })
      .catch(() => {
        setUploadingFiles((prev) => prev.map((f) => (f.file === file ? { ...f, status: 'error' } : f)))
        Toast.error({ title: 'Upload thất bại', description: file.name })
      })
  }

  // Xóa file khỏi danh sách
  const handleRemoveFile = (index: number, isUploading = false) => {
    if (isUploading) {
      setUploadingFiles((prev) => prev.filter((_, i) => i !== index))
    } else {
      const newFiles = [...values]
      newFiles.splice(index, 1)
      setFiles(newFiles)
    }
  }

  // Icon file
  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <FileImage className='w-5 h-5 text-blue-400' />
    if (type.includes('pdf')) return <FileText className='w-5 h-5 text-red-400' />
    return <FileIcon className='w-5 h-5 text-gray-400' />
  }

  return (
    <div className='w-full h-full flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-6 shadow'>
      {/* Drag & Drop + Browse */}
      <div
        className='flex-1 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-xl min-h-[220px] cursor-pointer transition hover:border-blue-400 bg-gray-50'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <ImagePlus className='w-12 h-12 text-blue-400 mb-2' />
        <div className='text-gray-600 mb-2 text-center'>
          Drag and Drop files to upload
          <br />
          or
        </div>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition mb-2'
          onClick={() => inputRef.current?.click()}
        >
          Browse
        </button>
        <div className='text-xs text-gray-400'>Supported files: JPEG, PNG (max 2MB)</div>
        <input
          ref={inputRef}
          id='inputFiles'
          hidden
          type='file'
          accept='.jpg, .jpeg, .png'
          multiple
          onChange={onFileChange}
        />
      </div>
      {/* Danh sách file đã upload và đang upload */}
      <div className='flex-1'>
        <div className='font-semibold mb-2'>Uploaded files</div>
        <div className='flex flex-col gap-3'>
          {/* Đang upload */}
          {uploadingFiles.map((item, idx) => (
            <div key={item.file.name + idx} className='flex items-center gap-3 bg-gray-100 rounded p-2 relative'>
              {getFileIcon(item.file.type)}
              <div className='flex-1'>
                <div className='text-sm font-medium'>{item.file.name}</div>
                <div className='w-full h-2 bg-gray-200 rounded mt-1'>
                  <div
                    className={classNames('h-2 rounded transition-all', {
                      'bg-blue-500': item.status === 'uploading',
                      'bg-green-500': item.status === 'done',
                      'bg-red-400': item.status === 'error'
                    })}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                {item.status === 'error' && <div className='text-xs text-red-500'>Upload failed</div>}
              </div>
              <button
                className='ml-2 text-gray-400 hover:text-red-500 transition'
                onClick={() => handleRemoveFile(idx, true)}
              >
                <Trash2 className='w-5 h-5' />
              </button>
            </div>
          ))}
          {/* Đã upload */}
          {values.map((item, index) => (
            <div key={item.id || index} className='flex items-center gap-3 bg-gray-50 rounded p-2 relative'>
              {getFileIcon(item.type || '')}
              <div className='flex-1'>
                <div className='text-sm font-medium'>{item.name}</div>
                {item.url && (
                  <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-xs text-blue-500 underline'
                  >
                    View
                  </a>
                )}
              </div>
              <button
                className='ml-2 text-gray-400 hover:text-red-500 transition'
                onClick={() => handleRemoveFile(index)}
              >
                <Trash2 className='w-5 h-5' />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
