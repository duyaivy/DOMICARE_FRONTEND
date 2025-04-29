import InputFile from '@/components/InputFile'
import { path } from '@/core/constants/path'
import { AppContext } from '@/core/contexts/app.context'
import { userApi } from '@/core/services/user.service'
import { UserUpdate } from '@/models/interface/user.interface'
import { Toast } from '@/utils/toastMessage'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import SectionUser from '../../Layouts/SectionUser'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IconMail } from '@/assets/icons/icon-mail'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Loader, MapPinned, Phone, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UpdateUserSchema } from '@/core/zod/updateUser.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { gender } from '@/core/constants/user.const'
import { Label } from '@/components/ui/label'
import hideEmail from '@/utils/hideEmail'

import { useUploadFileMutation, useUserMutation } from '@/core/queries/user.query'
import DateTimeSelect from '@/components/DateTimeSelect'

export default function Profile() {
  const { profile } = useContext(AppContext)
  const userId = profile?.id || 1
  const [file, setFile] = useState<File>()
  const fileLocal = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  // call API
  const userUpdateMutation = useUserMutation()
  const updateAvatarMutation = useUploadFileMutation()
  // form
  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      address: '',
      name: '',
      gender: undefined,
      phone: '',
      imageId: undefined,
      dateOfBirth: undefined
    }
  })
  const { data, isLoading, refetch } = useQuery({
    queryKey: [path.user.profile],
    queryFn: () => userApi.getById(userId),
    staleTime: 60 * 1000 * 3
  })
  const user = data?.data.data

  useEffect(() => {
    if (user) {
      form.setValue('gender', user.gender || gender.other)
      form.setValue('address', user.address || '')
      form.setValue('phone', user.phone || '')
      form.setValue('name', user.name || '')
      const dateOfBirth = new Date(user.dateOfBirth as string)
      form.setValue('dateOfBirth', dateOfBirth)
      console.log('value', form.getValues())
    }
  }, [user, form])

  const handleSubmitForm = async (data: UserUpdate) => {
    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const avatarRes = await updateAvatarMutation.mutateAsync(formData)
        data.imageId = avatarRes.data.data.id
        setFile(undefined)
      }
      // submit form
      const dataApi = {
        ...data,
        dateOfBirth: data.dateOfBirth?.toISOString()
      }
      await userUpdateMutation.mutateAsync(dataApi)
      refetch()
    } catch {
      Toast.error({ description: 'Lỗi không xác định.' })
    }
    // upload avatar
  }

  return (
    <SectionUser title='Hồ sơ của tôi' description='Quản lý thông tin hồ sơ để bảo mật tài khoản'>
      {isLoading ? (
        <div className='min-h-[400px] flex justify-center items-center'>
          <Loader className='!w-15 h-auto text-white' />
        </div>
      ) : (
        <Fragment>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitForm)}
              className='w-full md:w-full space-y-2  mb-10'
              noValidate
            >
              <div className='grid grid-cols-12 gap-4 my-4'>
                <div className='col-span-12 md:col-span-7 order-2 md:order-1'>
                  <div>
                    <Label>Email</Label>
                    <Input
                      disabled
                      value={hideEmail(user?.email) || hideEmail(profile?.email)}
                      type='email'
                      className='w-full bg-gray-50 cursor-not-allowed mt-1'
                      icon={<IconMail />}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete='off'
                            placeholder='Nhập họ và tên'
                            type='text'
                            className='w-full focus:outline-0 mt-1'
                            {...field}
                            icon={<User />}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='gender'
                    render={({ field }) => (
                      <FormItem className='flex items-center gap-4 mt-3'>
                        <FormLabel>Giới tính:</FormLabel>

                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value} className='flex'>
                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value={gender.male} />
                              </FormControl>
                              <FormLabel className='font-normal'>Nam</FormLabel>
                            </FormItem>
                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value={gender.female} />
                              </FormControl>
                              <FormLabel className='font-normal'>Nữ</FormLabel>
                            </FormItem>
                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value={gender.other} />
                              </FormControl>
                              <FormLabel className='font-normal'>Khác</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete='off'
                            placeholder='Nhập họ và tên'
                            type='text'
                            className='w-full focus:outline-0 mt-1'
                            {...field}
                            icon={<Phone />}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='dateOfBirth'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày sinh</FormLabel>
                        <FormControl>
                          <DateTimeSelect
                            onChange={field.onChange}
                            value={field.value}
                            errorMessage={form.formState.errors.dateOfBirth?.message}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Nhập địa chỉ'
                            autoComplete='off'
                            className='w-full focus:outline-0 mt-1'
                            {...field}
                            icon={<MapPinned />}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex justify-center items-center'>
                    <Button
                      loading={userUpdateMutation.isPending || updateAvatarMutation.isPending}
                      className='w-full md:w-3/5 mt-10 text-lg cursor-pointer text-white h-12 bg-main py-3 hover:bg-main/80 duration-300 hover:shadow-lg '
                      type='submit'
                    >
                      Lưu Thông Tin
                    </Button>
                  </div>
                </div>
                <div className='col-span-12 md:col-span-5 order-1 w-full h-full'>
                  <div className='h-full flex flex-col items-center justify-center gap-6 mo:pt-10 '>
                    <div className='overflow-hidden rounded-full w-35 h-35'>
                      <img
                        className='w-full h-full object-cover'
                        src={fileLocal || user?.avatar || profile?.avatar}
                        alt='avatar'
                      />
                    </div>
                    <InputFile setFile={setFile} />
                    <div className='text-gray-400 text-sm text-left pl-1 pb-4 md:pb-0'>
                      <p>Dung lượng file tối đa 2MB</p>
                      <p>Định dạng .JPEG .PNG</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </Fragment>
      )}
    </SectionUser>
  )
}
