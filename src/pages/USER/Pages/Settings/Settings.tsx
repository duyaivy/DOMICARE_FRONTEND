import SectionUser from '../../Layouts/SectionUser'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { languagesDefault } from '@/configs/consts'
import { ThemeToggle } from '@/components/theme/theme-toogle'
export default function Settings() {
  const [language, setLanguage] = useState(languagesDefault[0].code)
  return (
    <SectionUser title='Cài đặt' description='Cài đặt ngôn ngữ và chế độ hiển thị cho trang web của bạn.'>
      <div className='mb-6 max-w-xs mt-5'>
        <Label htmlFor='lang-select' className='mb-2 block text-lg text-mainStrong'>
          Ngôn ngữ
        </Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger id='lang-select'>
            <SelectValue placeholder='Select language' />
          </SelectTrigger>
          <SelectContent>
            {languagesDefault.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className='text-sm text-gray-500 mt-1'>Lựa chọn ngôn ngữ cho ứng dụng.</p>
      </div>
      {/* Theme */}
      <div className='mb-6'>
        <ThemeToggle />
      </div>
    </SectionUser>
  )
}
