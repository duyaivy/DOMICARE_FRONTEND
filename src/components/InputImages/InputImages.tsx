import { Label } from '../ui/label'
import config from '@/configs'
import { Toast } from '@/utils/toastMessage'
import { ImagePlus, Trash2 } from 'lucide-react'
import { isEqual } from 'lodash'
import classNames from 'classnames'

interface InputImagesProps {
  values: (string | File)[]
  setFiles: (files: (string | File)[]) => void
}

export default function InputImages({ values, setFiles }: InputImagesProps) {
  const isEmpty = isEqual(values.length, 0)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files
    if (!newFiles) return

    // kiem tra dieu kien
    const validFiles: File[] = []
    let hasInvalidFile = false

    Array.from(newFiles).forEach((file) => {
      if (file.size < config.maxSizeUploadAvatar && file.type.includes('image')) {
        validFiles.push(file)
      } else {
        hasInvalidFile = true
      }
    })

    if (hasInvalidFile) {
      Toast.error({
        title: `Dung lượng file tối đa 2MB
                Định dạng .JPEG .PNG`
      })
    }

    if (validFiles.length > 0) {
      setFiles([...values, ...validFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = [...values]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  return (
    <div className='w-full h-full'>
      <div className='mt-4 absolute bottom-0 left-0 right-0 bg-bg overflow-auto'>
        <div className='flex gap-1 items-center h-full'>
          {!isEmpty && (
            <>
              {values.map((item, index) => (
                <div key={`new-${index}`} className='relative w-full md:w-1/2 flex-shrink-0 group h-full'>
                  <img
                    className='w-full h-55 object-cover rounded-xs'
                    alt={`Preview ${index + 1}`}
                    src={typeof item === 'string' ? item : URL.createObjectURL(item)}
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveFile(index)}
                    className='absolute group top-0 left-0 bottom-0 right-0 duration-300 cursor-pointer hover:bg-[rgba(0,0,0,0.2)] flex flex-col justify-center items-center'
                  >
                    <Trash2 className='group-hover:opacity-100 md:opacity-0 w-10 h-10 text-gray-400' />
                  </button>
                </div>
              ))}
            </>
          )}
          <div
            className={classNames(
              'relative h-55 flex-shrink-0 group',
              { 'w-full': isEmpty },
              { 'w-full md:1/2': !isEmpty }
            )}
          >
            <input
              id='inputFiles'
              hidden
              type='file'
              accept='.jpg, .jpeg, .png'
              multiple
              onChange={onFileChange}
              onClick={(e) => ((e.target as any).value = null)}
            />
            <Label
              htmlFor='inputFiles'
              className='absolute group top-0 left-0 bottom-0 right-0 duration-300 cursor-pointer hover:bg-[rgba(0,0,0,0.2)] flex flex-col justify-center items-center'
            >
              <ImagePlus className='w-8 h-8 text-gray-400 mb-2' />
              <span className='text-sm text-gray-500'>Chọn nhiều ảnh (tối đa 2MB/ảnh)</span>
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
