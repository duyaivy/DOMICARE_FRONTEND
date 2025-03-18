import { IconEye, IconNonEye } from '@/assets/icons'
// import { logo } from '@/assets/images'
import { Button } from '@/components/ui/button'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PASSWORD_TYPE, ROLE_ADMIN, TEXT_TYPE } from '@/configs/consts'
import { EMAIL, REMEMBER_ME } from '@/core/configs/const'
import { path } from '@/core/constants/path'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import { authApi } from '@/core/services/auth.service'
import { setAccessTokenToLS, setRefreshTokenToLS, setUserToLS } from '@/core/shared/storage'
import { LoginSchema } from '@/core/zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useMutation } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { z } from 'zod'
import { loginPic, logoSecond } from '@/assets/images'
import { IconMail } from '@/assets/icons/icon-mail'
import LoginGoogle from './LoginGoogle'
import { Toast } from '@/utils/toastMessage'
import { AxiosError, isAxiosError } from 'axios'
import { isError422 } from '@/utils/isAxioxErr422'
import { FailResponse } from '@/models/interface/response.interface'
import { AppContext } from '@/core/contexts/app.context'

export default function Login() {
  const navigate = useNavigate()
  const { setProfile, setIsAuthenticated } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(localStorage.getItem(REMEMBER_ME) === 'true' ? true : false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: localStorage.getItem(REMEMBER_ME) === 'true' ? localStorage.getItem(EMAIL) || '' : '',
      password: ''
    }
  })

  const mutationLogin = useMutation({
    mutationKey: mutationKeys.login,
    mutationFn: (data: z.infer<typeof LoginSchema>) => authApi.login(data)
  })

  function onSubmit() {
    setIsLoading(true)
    const loginData = form.getValues() as z.infer<typeof LoginSchema>
    mutationLogin.mutate(loginData, {
      onSuccess: ({ data }) => {
        setAccessTokenToLS(data.data.accessToken)
        setRefreshTokenToLS(data.data.refreshToken)
        setUserToLS(data.data.user)
        setIsAuthenticated(true)
        setProfile(data.data.user)

        const roles = data?.data?.user?.roles ?? []
        navigate(isEqual(roles[0], ROLE_ADMIN) ? path.admin.dashboard : path.home)
        Toast.success({ title: 'Thành công', description: 'Đăng nhập thành công 🚀🚀⚡⚡' })
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          if (isError422<FailResponse<null>>(error as AxiosError)) {
            const err: FailResponse<null> = error.response?.data
            form.setError('password', {
              message: err.error,
              type: 'Server'
            })
          } else {
            Toast.error({ title: 'Có lỗi xảy ra', description: 'Đăng nhập thất bại, vui lòng thử lại sau.' })
          }
        } else {
          Toast.error({ title: 'Có lỗi xảy ra', description: 'Đăng nhập thất bại, vui lòng thử lại sau.' })
        }
      },
      onSettled: () => {
        setIsLoading(false)
      }
    })
  }

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  const handleChangeRememberMe = (event: boolean) => {
    setRememberMe(event)
    localStorage.setItem(REMEMBER_ME, JSON.stringify(event))
  }

  useEffect(() => {
    const email = form.getValues('email') // Extract the value of email outside of useEffect

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
              className='w-[90%] md:w-full lg:w-3/4 xl:w-2/3 space-y-6 px-4'
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
                        autoComplete='false'
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
                loading={isLoading}
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
