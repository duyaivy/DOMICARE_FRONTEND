import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Product } from '@/models/interface/product.interface'
import { Toast } from '@/utils/toastMessage'
import axios from 'axios'
import { CheckCircle, Copy } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface PaymentProps {
  product?: Product
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Payment({ product, isOpen, setIsOpen }: PaymentProps) {
  const { t } = useTranslation('product')
  const count = useRef<number>(0)
  const sandboxCard = {
    bank: 'NCB',
    cardNumber: '9704198526191432198',
    cardHolder: 'NGUYEN VAN A',
    expiry: '07/15',
    otp: '123456'
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      Toast.info({
        description: `Copy ${text} `
      })
    } catch (error) {
      console.error('Copy failed', error)
      Toast.error({
        description: 'Failed to copy to clipboard'
      })
    }
  }
  const handleDeposit = async () => {
    if (count.current > 0) {
      Toast.info({
        description: t('payment.already_in_deposit')
      })
      return
    }
    count.current += 1
    const amount = product?.priceAfterDiscount ? product.priceAfterDiscount * 0.1 : 0
    const amountRounded = Math.max(amount, 25000)
    const orderInfo = `${product?.name} - ${amount} VND`
    const orderId = `ORDER_${new Date().getTime()}`
    const paymentURL = await axios
      .post('/api/create-payment', {
        amount: amountRounded,
        orderInfo,
        orderId
      })
      .then((res) => {
        return res.data
      })

    window.open(paymentURL, '_blank')
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='flex justify-center items-center'>
        <Card className='max-w-3xl w-full  p-4'>
          <CardHeader className='text-center'>
            <CheckCircle className='w-12 h-12 text-green-500 mx-auto mb-2' />
            <CardTitle className='text-xl font-semibold text-green-600'>{t('payment.success_title')}</CardTitle>
          </CardHeader>

          <CardContent className='text-center space-y-4'>
            <p className='text-gray-700 leading-relaxed'>
              {t('payment.thank_you_message')}
              <br />
              {t('payment.deposit_option_text')}{' '}
              <span className='font-semibold text-green-600'>{t('payment.deposit_option_highlight')}</span>{' '}
              {t('payment.deposit_option_suffix')}
            </p>

            <p className='text-gray-600 italic'>
              {t('payment.refund_policy_prefix')}
              <span className='font-semibold text-green-600'> {t('payment.refund_policy_highlight')}</span>.
            </p>
            <div className='border rounded-lg p-4 bg-gray-50 text-left'>
              <h4 className='font-semibold mb-2'>{t('payment.infor_payment')}</h4>
              <p className='text-sm text-red-600 mb-2'>
                <strong>{t('payment.note')}</strong> {t('payment.infor_title')} <br />
                <span className='font-medium'>{t('payment.infor_note')}</span>
              </p>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                <div className='flex items-center justify-between p-2 bg-white rounded shadow-sm'>
                  <div>
                    <div className='text-xs text-gray-500'>{t('payment.bank')}</div>
                    <div className='font-medium'>{sandboxCard.bank}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(sandboxCard.bank)}
                    className='ml-2 inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900'
                    aria-label='Copy bank'
                  >
                    <Copy className='w-4 h-4' /> Copy
                  </button>
                </div>

                <div className='flex items-center justify-between p-2 bg-white rounded shadow-sm'>
                  <div>
                    <div className='text-xs text-gray-500'>{t('payment.card_number')}</div>
                    <div className='font-medium'>{sandboxCard.cardNumber}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(sandboxCard.cardNumber)}
                    className='ml-2 inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900'
                    aria-label='Copy card number'
                  >
                    <Copy className='w-4 h-4' /> Copy
                  </button>
                </div>

                <div className='flex items-center justify-between p-2 bg-white rounded shadow-sm'>
                  <div>
                    <div className='text-xs text-gray-500'>{t('payment.card_holder')}</div>
                    <div className='font-medium'>{sandboxCard.cardHolder}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(sandboxCard.cardHolder)}
                    className='ml-2 inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900'
                    aria-label='Copy card holder'
                  >
                    <Copy className='w-4 h-4' /> Copy
                  </button>
                </div>

                <div className='flex items-center justify-between p-2 bg-white rounded shadow-sm'>
                  <div>
                    <div className='text-xs text-gray-500'>{t('payment.exp_date')}</div>
                    <div className='font-medium'>{sandboxCard.expiry}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(sandboxCard.expiry)}
                    className='ml-2 inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900'
                    aria-label='Copy expiry'
                  >
                    <Copy className='w-4 h-4' /> Copy
                  </button>
                </div>

                <div className='col-span-1 sm:col-span-2 flex items-center justify-between p-2 bg-white rounded shadow-sm'>
                  <div>
                    <div className='text-xs text-gray-500'>{t('payment.otp')}</div>
                    <div className='font-medium'>{sandboxCard.otp}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(sandboxCard.otp)}
                    className='ml-2 inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900'
                    aria-label='Copy otp'
                  >
                    <Copy className='w-4 h-4' /> Copy
                  </button>
                </div>
              </div>
            </div>
            <div className='flex justify-center gap-4 pt-4'>
              <Button
                className='hover:bg-mainStrong cursor-pointer bg-green-700 text-white px-6 py-2 rounded-xl'
                onClick={handleDeposit}
              >
                {t('payment.deposit_button')}
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant='outline'
                className='  cursor-pointer px-6 py-2 rounded-xl'
              >
                {t('payment.no_deposit_button')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
