import { ProductListConfig } from '@/models/interface/product.interface'
import { isUndefined, omitBy } from 'lodash'
import { useSearchParams } from 'react-router-dom'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export const useParamsString = () => {
  const [searchParams] = useSearchParams()
  return Object.fromEntries(searchParams.entries())
}
export const usePrdQueryConfig = () => {
  const queryString: QueryConfig = useParamsString()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryString.page || 1,
      size: queryString.size || 20,
      categoryId: queryString.categoryId,
      sortDirection: queryString.sortDirection || 'desc',
      sortBy: queryString.sortBy,
      filter: queryString.filter,
      searchName: queryString.searchName
    },
    isUndefined
  )

  return queryConfig
}
