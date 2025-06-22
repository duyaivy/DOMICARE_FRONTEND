import { IconRedTick } from '@/assets/icons/icon-redTick'
import { IconClear, IconClear2, IconClear3, IconClear4, IconClear5, IconClear6 } from '@/assets/icons/icon-clears'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

export const useFeatures = () => {
  const { t } = useTranslation('about_us')
  return [
    {
      icon: <IconRedTick />,
      title: t('reliable_service'),
      description: t('reliable_service_description')
    },
    {
      icon: <IconRedTick />,
      title: t('quality_assurance'),
      description: t('quality_assurance_description')
    },
    {
      icon: <IconRedTick />,
      title: t('trusted_partner'),
      description: t('trusted_partner_description')
    },
    {
      icon: <IconRedTick />,
      title: t('reliable_solution'),
      description: t('reliable_solution_description')
    }
  ]
}

export const getServices = () => [
  {
    icon: <IconClear />,
    title: i18next.t('about_us:cleaning_program')
  },
  {
    icon: <IconClear2 />,
    title: i18next.t('about_us:modern_equipment')
  },
  {
    icon: <IconClear3 />,
    title: i18next.t('about_us:customer_service')
  },
  {
    icon: <IconClear4 />,
    title: i18next.t('about_us:licensed')
  },
  {
    icon: <IconClear5 />,
    title: i18next.t('about_us:professional_training')
  },
  {
    icon: <IconClear6 />,
    title: i18next.t('about_us:sterilization_program')
  }
]
