import config from '@/configs'
import { Toast } from '@/utils/toastMessage'
import { Label } from '../ui/label'

interface InputFileProps {
  setFile: (file: File) => void
}
export default function InputFile({ setFile }: InputFileProps) {
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
    <div className=''>
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
        className='border border-gray-300 px-4 py-3 text-sm capitalize text-gray duration-300 cursor-pointer hover:bg-[#f4f4f4]'
      >
        Chọn ảnh
      </Label>
    </div>
  )
}
