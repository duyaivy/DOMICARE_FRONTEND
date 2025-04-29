import React from 'react'
import { Label } from '../ui/label'
import config from '@/configs'
import { Toast } from '@/utils/toastMessage'
import { ImagePlus } from 'lucide-react'
interface InputImageProps {
  setFile: (file: File) => void
  value: string
}
export default function InputImage({ setFile, value }: InputImageProps) {
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.size < config.maxSizeUploadAvatar && file.type.includes('image')) {
      setFile?.(file)
    } else {
      // validate
      Toast.error({
        title: `Dung lượng file tối đa 2MB
                Định dạng .JPEG .PNG`
      })
    }
  }
  return (
    <>
      <input
        id='inputFile'
        hidden
        type='file'
        accept='.jpg, .jpeg, .png'
        onChange={onFileChange}
        onClick={(e) => ((e.target as any).value = null)}
      />
      <Label
        htmlFor='inputFile'
        className=' absolute group !z-10 top-0 left-0 duration-300 cursor-pointer w-full h-full hover:bg-[rgba(0,0,0,0.2)] flex justify-center items-center flex-col'
      >
        <ImagePlus className=' duration-300 group-hover:opacity-100 opacity-0 !w-8 h-8 text-gray-400' />
        <span className='text-sm text-gray-500 duration-300 group-hover:opacity-100 opacity-0'>
          Chọn ảnh chính (tối đa 2MB/ảnh)
        </span>
      </Label>
      {value && <img className='w-full h-full object-cover ' alt='Hinh_anh' src={value} />}
    </>
  )
}
