import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Banknote, FolderPen } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import InputImage from '@/components/InputImage'
import { useMemo, useState } from 'react'
import { handleError422 } from '@/utils/handleErrorAPI'
import { Product, ProductRequest } from '@/models/interface/product.interface'
import { ProductForm, productSchema } from '@/core/zod/productSearch.zod'
import { productApi } from '@/core/services/products.service'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCategoryQuery, usePrdMutation } from '@/core/queries/product.query'
import { QueryCateConfig } from '@/hooks/useCateQueryConfig'
import { useQueryClient } from '@tanstack/react-query'
import { path } from '@/core/constants/path'
import { usePrdQueryConfig } from '@/hooks/usePrdQueryConfig'
import { Label } from '@/components/ui/label'
import InputImages from '@/components/InputImages'
import { discountValues, initialParams } from '@/core/constants/initialValue.const'
import CategoryPagination from '@/components/CategoryPagination'
import { useUploadFileMutation, useUploadMutilFileMutation } from '@/core/queries/file.query'

interface Props {
  currentRow?: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const queryClient = useQueryClient()
  const queryString = usePrdQueryConfig()
  const [params, setParams] = useState<QueryCateConfig>(initialParams)
  // load category
  const { data } = useCategoryQuery({ queryString: params })
  const categories = data?.data?.data.data
  const pageController = data?.data?.data.meta

  const form = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          price: currentRow.price || 0,
          discount: currentRow.discount,
          oldProductId: currentRow.id,
          oldCategoryId: currentRow.categoryMini?.id || undefined,
          landingImageIds: undefined,
          categoryId: currentRow.categoryMini?.id || undefined
        }
      : {
          name: '',
          description: '',
          categoryId: categories?.[0]?.id || 1,
          price: 0,
          discount: 0
        }
  })

  const [file, setFile] = useState<File>()
  const [files, setFiles] = useState<(string | File)[]>(currentRow?.landingImages || [])
  const fileLocal = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const fileLocalImages = useMemo(() => {
    return files ? files.map((file) => (typeof file === 'string' ? file : URL.createObjectURL(file))) : undefined
  }, [files])

  const uploadFileMutation = useUploadFileMutation()
  const uploadMutilFileMutation = useUploadMutilFileMutation()
  const productMutation = usePrdMutation({
    mutationFn: (data: ProductRequest) => (isEdit ? productApi.update : productApi.create)(data),
    handleError: (error) => handleError422({ error, form, fieldName: 'mainImageId' })
  })

  const onSubmit = async (data: ProductForm) => {
    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const avatarRes = await uploadFileMutation.mutateAsync({ formData })
        data.mainImageId = avatarRes?.data?.data?.id
        setFile(undefined)
      }
      if (files && files.length > 0) {
        const formData = new FormData()
        files.forEach((file) => {
          if (file instanceof File) {
            formData.append('files', file)
          }
        })
        const avatarRes = await uploadMutilFileMutation.mutateAsync(formData)
        data.landingImageIds = avatarRes?.data?.data?.map((item) => item.id)
        setFiles([])
      } else {
        //xu ly khi xoa anh luc cap nhat
        data.landingImageIds = []
      }
      await productMutation.mutateAsync(data)
      form.reset()
      onOpenChange(false)
      queryClient.invalidateQueries({ queryKey: [path.products, queryString] })
    } finally {
      // nothing
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='md:max-w-7xl '>
        <DialogHeader className='text-left'>
          <DialogTitle className='capitalize text-lg font-bold'>{isEdit ? 'Chỉnh sửa' : 'Thêm mới'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Cập nhật thông tin sản phẩm.' : 'Tạo mới sản phẩm.'} Nhấn lưu để thực hiện thay đổi.
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 w-full h-[36rem] overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='product-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid grid-cols-1 md:grid-cols-3 gap-6 p-1'
            >
              <div className='md:col-span-2 space-y-4 order-2 md:order-1'>
                {/* Tên sản phẩm */}
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên sản phẩm</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập tên sản phẩm' icon={<FolderPen />} autoComplete='off' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Mô tả */}
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea placeholder='Nhập mô tả' className='min-h-35' autoComplete='off' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Danh mục */}
                {!isEdit ? (
                  <FormField
                    control={form.control}
                    name='categoryId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Danh mục</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Chọn danh mục' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories &&
                              categories.map((cate) => (
                                <SelectItem key={cate.id} value={cate.id.toString()}>
                                  {cate.name}
                                </SelectItem>
                              ))}
                            <CategoryPagination pageController={pageController} setParams={setParams} params={params} />
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}
                {/* Giá và giảm giá */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Nhập số tiền'
                            {...field}
                            icon={<Banknote />}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='discount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giảm giá (%)</FormLabel>
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(value) => field.onChange(Number(value))}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Chọn mức giảm giá' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {discountValues.map((value) => (
                              <SelectItem key={value} value={value.toString()}>
                                {value}%
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='md:col-span-3 '>
                  <Label>Ảnh sản phẩm</Label>
                  <div className='w-full min-h-55 border border-gray-200 shadow rounded-sm overflow-hidden bg-bg relative '>
                    <InputImages values={fileLocalImages || []} setFiles={setFiles} />
                  </div>{' '}
                </div>
              </div>

              {/* Ảnh chính */}
              <div className='md:col-span-1 order-1 md:order-2 '>
                <FormField
                  control={form.control}
                  name='mainImageId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ảnh chính</FormLabel>
                      <FormControl>
                        <div className='col-span-4 h-55 border border-gray-200 shadow rounded-sm overflow-hidden bg-bg relative '>
                          <InputImage
                            value={fileLocal || currentRow?.image || ''}
                            setFile={(file) => {
                              setFile(file)
                              field.onChange(undefined)
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        <div className='flex justify-end gap-4 mt-4'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            type='submit'
            loading={productMutation.isPending || uploadFileMutation.isPending || uploadMutilFileMutation.isPending}
            className='hover:bg-main bg-neutral-700 cursor-pointer'
            form='product-form'
          >
            {isEdit ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
