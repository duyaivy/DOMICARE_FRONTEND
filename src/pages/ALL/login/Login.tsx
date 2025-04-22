import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { LoginSchema } from '@/core/zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import LoginGoogle from './LoginGoogle'

import { PASSWORD_TYPE, TEXT_TYPE } from '@/configs/consts'
import { EMAIL, REMEMBER_ME } from '@/core/configs/const'
import { path } from '@/core/constants/path'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { IconEye, IconNonEye } from '@/assets/icons'
import { loginPic, logoSecond } from '@/assets/images'
import { IconMail } from '@/assets/icons/icon-mail'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { isEqual } from 'lodash'
import { useLoginMutation } from '@/core/queries/auth.query'
import { authApi } from '@/core/services/auth.service'
import { handleErrorAPI } from '@/utils/handleErrorAPI'
export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const REMEMBER = localStorage.getItem(REMEMBER_ME)
  const [rememberMe, setRememberMe] = useState<boolean>(isEqual(REMEMBER, 'true') ? true : false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: isEqual(REMEMBER, 'true') ? localStorage.getItem(EMAIL) || '' : '',
      password: ''
    }
  })

  const mutationLogin = useLoginMutation({
    mutationFn: authApi.login,
    handleError: (error) => handleErrorAPI(error, form)
  })
  function onSubmit() {
    const loginData = form.getValues() as z.infer<typeof LoginSchema>
    mutationLogin.mutate(loginData)
  }

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  const handleChangeRememberMe = (event: boolean) => {
    setRememberMe(event)
    localStorage.setItem(REMEMBER_ME, JSON.stringify(event))
  }

  useEffect(() => {
    const email = form.getValues('email')
    if (rememberMe) {
      localStorage.setItem(EMAIL, email)
    }
  }, [rememberMe, form])
  return (
    <div className='grid grid-cols-1 md:grid-cols-12 gap-6 h-screen'>
      <div className='col-span-1 md:col-span-7  h-[40vh] md:h-full'>
        <div className='bg-[#0d5b4d] w-full h-full'>
          <div
            style={{ backgroundImage: `url(${loginPic})` }}
            className={`bg-center w-full h-full bg-contain bg-no-repeat relative`}
          ></div>
        </div>
      </div>
      <div className='col-span-1 md:col-span-5 md:h-full '>
        <div className='flex justify-center flex-col items-center md:h-screen '>
          <Link to={path.home}>
            <img src={logoSecond} alt='logo' className='hidden md:block mb-4' />
          </Link>
          <h1 className='text-2xl md:text-5xl font-semibold text-black mb-6'>Đăng nhập</h1>
          <div className='flex  items-center justify-start gap-2 mb-4'>
            <p className='text-sm text-[#112211]  text-left'>Đăng nhập vào hệ thống </p>
            <Link to={path.home} className='text-main text-sub1 font-bold'>
              DomiCare
            </Link>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-[90%] md:w-full lg:w-3/4 xl:w-2/3 space-y-2 px-4'
              noValidate
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email </FormLabel>
                    <FormControl>
                      <Input
                        className='focus:outline-0 mt-1'
                        placeholder='Nhập email'
                        type='email'
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
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập password'
                        autoComplete='off'
                        className='w-full focus:outline-0 mt-1'
                        type={isPasswordVisible ? TEXT_TYPE : PASSWORD_TYPE}
                        {...field}
                        icon={isPasswordVisible ? <IconNonEye /> : <IconEye />}
                        iconOnClick={togglePasswordVisibility}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-between items-center'>
                <div className='flex items-center justify-center space-x-2'>
                  <input
                    onChange={(e) => handleChangeRememberMe((e.target as HTMLInputElement).checked)}
                    checked={rememberMe}
                    type='checkbox'
                    id='terms'
                    className='accent-[green] w-4 h-4'
                  />

                  <Label htmlFor='terms' className=' text-sub2  text-gray-500 cursor-pointer'>
                    Lưu thông tin
                  </Label>
                </div>
                <Link to={path.forgotPassword} className='text-main text-sub2 hover:underline'>
                  Quên mật khẩu
                </Link>
              </div>

              <Button
                loading={mutationLogin.isPending}
                className='w-full text-lg cursor-pointer text-white h-12 bg-main py-3 hover:bg-main/80 duration-300 hover:shadow-lg '
                type='submit'
              >
                Đăng nhập
              </Button>
              <p className='flex items-center justify-center'>
                Chưa có tài khoản?&nbsp;
                <Link to='/register' className='cursor-pointer text-main hover:underline'>
                  Đăng ký
                </Link>
              </p>
            </form>
          </Form>
          <div className='w-[90%] md:w-full lg:w-3/4 xl:w-2/3 space-y-6 px-4 pt-4 mb-10'>
            <div className='flex justify-center'>
              <div className='text-black flex justify-center items-center gap-3 w-1/2'>
                <hr className='h-[1px] w-full' />
                Hoặc
                <hr className='h-[1px] w-full' />
              </div>
            </div>
            <LoginGoogle />
          </div>
        </div>
      </div>
    </div>
  )
}
