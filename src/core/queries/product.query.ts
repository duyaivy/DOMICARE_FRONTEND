import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { mutationKeys } from '../helpers/key-tanstack'
import { DataBookingAPI } from '@/models/interface/booking.interface'
import { bookingApi } from '../services/booking.service'

import { Toast } from '@/utils/toastMessage'
import { handleToastError } from '@/utils/handleErrorAPI'
import { path } from '../constants/path'
import { productApi } from '../services/products.service'
import { ProductListConfig } from '@/models/interface/product.interface'
import { QueryConfig } from '@/hooks/usePrdQueryConfig'
import { categoryApi } from '../services/category.service'

//product
export const useProductQuery = ({ queryString }: { queryString: QueryConfig }) => {
  return useQuery({
    queryKey: [path.products, queryString],
    queryFn: () => productApi.get(queryString as ProductListConfig),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 3
  })
}
export const usePrdDetailQuery = ({ id }: { id: number }) =>
  useQuery({
    queryKey: [path.product, id],
    queryFn: () => productApi.getPrdDetail(id),
    staleTime: 60 * 1000
  })

//category
export const useCategoryQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.get()
  })
// review

// booking
export const useBookingMutation = () => {
  return useMutation({
    mutationKey: mutationKeys.booking,
    mutationFn: (data: DataBookingAPI) => {
      const { dataAPI, isLogin } = data
      return bookingApi.post(dataAPI, isLogin)
    },
    onSuccess: () => {
      Toast.success({
        title: 'Thành công',
        description: 'Đặt dịch vụ thành công. Chúng tôi sẽ tư vấn trong thời gian sớm nhất.'
      })
    },
    onError: (error) => handleToastError(error)
  })
}
