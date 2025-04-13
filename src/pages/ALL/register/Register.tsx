import { IconEye, IconNonEye } from '@/assets/icons'
import { IconMail } from '@/assets/icons/icon-mail'
import { pic6, logoSecond } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { PASSWORD_TYPE, TEXT_TYPE } from '@/configs/consts'

import { path } from '@/core/constants/path'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import { authApi } from '@/core/services/auth.service'
import { RegisterSchema } from '@/core/zod'
import { handleErrorAPI } from '@/utils/handleErrorAPI'
import { Toast } from '@/utils/toastMessage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { z } from 'zod'
import SentEmail from './SentEmail'

export default function Register() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isConfirm, setIsconfirm] = useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })
  const mutationRegister = useMutation({
    mutationKey: mutationKeys.register,
    mutationFn: (data: z.infer<typeof RegisterSchema>) => authApi.register(omit(data, 'confirm_password')),
    onSuccess: () => {
      navigate(path.login)
      Toast.success({
        title: 'Thành công',
        description: 'Đăng kí tài khoản thành công. Vui lòng kiểm tra Mail của bạn.'
      })
    },
    onError: (error) => handleErrorAPI(error, form),
    onSettled: () => {
      setIsLoading(false)
    }
  })

  const handleRegister = () => {
    setIsLoading(true)
    mutationRegister.mutate(form.getValues())
  }

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible((prev) => !prev)

  return (
    <div className='grid grid-cols-1 md:grid-cols-12 gap-6 h-screen'>
      <div className='order-2 md:order-1 col-span-1 md:col-span-5 md:h-full '>
        <div className='flex justify-center flex-col items-center md:h-screen'>
          <Link to={path.home}>
            <img src={logoSecond} alt='logo' className='hidden md:block mb-4' />
          </Link>
          <h1 className='text-2xl md:text-5xl font-semibold text-black mb-6'>Đăng ký</h1>
          <div className='flex  items-center justify-start gap-2 mb-4 px-4'>
            <p className='text-sm text-[#112211]  text-center'>
              Hãy đăng ký để trải nghiệm dịch vụ của{' '}
              <Link to={path.home} className='text-main text-sub1 font-bold'>
                DomiCare
              </Link>
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className='w-[90%] md:w-full lg:w-3/4 xl:w-2/3 space-y-2 px-4 mb-10'
              noValidate
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='off'
                        placeholder='Nhập email'
                        type='email'
                        className='w-full focus:outline-0 mt-1'
                        {...field}
                        icon={<IconMail />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={PASSWORD_TYPE}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='off'
                        placeholder='Nhập mật khẩu'
                        className='w-full focus:outline-0 mt-1'
                        type={isPasswordVisible ? TEXT_TYPE : PASSWORD_TYPE}
                        {...field}
                        icon={isPasswordVisible ? <IconNonEye /> : <IconEye />}
                        iconOnClick={togglePasswordVisibility}
                      />
                    </FormControl>
                    <FormMessage />

                    <div className='flex flex-col text-sub2 text-gray'>
                      <h4 className=''>Mật khẩu bao gồm:</h4>
                      <ul className='flex flex-col '>
                        <li>- Ít nhất 6 kí tự.</li>
                        <li>- Chữ in hoa, chữ thường và chữ số.</li>
                      </ul>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhập lại mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập lại mật khẩu'
                        autoComplete='off'
                        className='w-full focus:outline-0 mt-1'
                        type={isConfirmPasswordVisible ? TEXT_TYPE : PASSWORD_TYPE}
                        {...field}
                        icon={isConfirmPasswordVisible ? <IconNonEye /> : <IconEye />}
                        iconOnClick={toggleConfirmPasswordVisibility}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-between'>
                <div className='flex items-center justify-center space-x-2'>
                  <Checkbox
                    onClick={() => setIsconfirm((prev) => !prev)}
                    checked={isConfirm}
                    id='terms'
                    className='cursor-pointer w-4 h-4'
                  />
                  <Label htmlFor='terms' className='text-base font-normal text-gray-500 cursor-default'>
                    Tôi đồng ý với mọi <span className='text-main hover:underline cursor-pointer'>Điều khoản</span> và{' '}
                    <span className='text-main hover:underline cursor-pointer '>Chính sách bảo mật</span>
                  </Label>
                </div>
              </div>
              <Button
                loading={isLoading}
                className='w-full text-lg cursor-pointer text-white h-12 bg-main py-3 hover:bg-main/80 duration-300 hover:shadow-lg '
                type='submit'
              >
                Tạo tài khoản
              </Button>
              <SentEmail />
              <p className='flex items-center justify-center '>
                Đã có tài khoản?&nbsp;
                <Link to='/login' className='cursor-pointer  text-main hover:underline '>
                  Đăng nhập
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
      <div className='order-1 col-span-1 md:col-span-7  h-[40vh] md:h-full'>
        <div className='bg-[#d4e9e0] w-full h-full'>
          <div
            style={{ backgroundImage: `url(${pic6})` }}
            className={`bg-center w-full h-full bg-contain bg-no-repeat relative`}
          ></div>
        </div>
      </div>
    </div>
  )
}
