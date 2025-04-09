import { ProductListConfig } from '@/models/interface/product.interface'
import { isUndefined, omitBy } from 'lodash'
import { useSearchParams } from 'react-router-dom'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
// type PurchasesConfig = {
//   [key in keyof PurchasesHistoryConfig]: number
// }
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
      categoryid: queryString.categoryid,
      isAcsending: queryString.isAcsending || false,
      sortByStar: queryString.sortByStar || true,
      sortBy: queryString.sortBy,
      filter: queryString.filter
    },
    isUndefined
  )

  return queryConfig
}

// export const useQueryPurchasesConfig = () => {
//   const queryString: PurchasesConfig = useParamsString()
//   console.log('purchases query', queryString)
//   const purchasesConfig: PurchasesConfig = omitBy(
//     {
//       status: Number(queryString.status) || 0
//     },
//     isUndefined
//   )
//   console.log('params', purchasesConfig)

//   return purchasesConfig
// }
