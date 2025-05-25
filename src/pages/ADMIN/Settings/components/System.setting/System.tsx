import { useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { ThemeToggle } from '@/components/theme/theme-toogle'
import HeaderSettings from '../HeaderSettings'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' }
]

export default function SystemSetting() {
  const [language, setLanguage] = useState(languages[0].code)

  return (
    <HeaderSettings
      title='Cài đặt hệ thống'
      description='Tùy chỉnh giao diện của ứng dụng và các cài đặt khác có liên quan.'
    >
      {/* Language */}
      <div className='mb-6 max-w-xs'>
        <Label htmlFor='lang-select' className='mb-2 block text-lg text-mainStrong'>
          Ngôn ngữ
        </Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger id='lang-select'>
            <SelectValue placeholder='Select language' />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
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
    </HeaderSettings>
  )
}
