import { CategoryListConfig } from '@/models/interface/category.interface'

import { isUndefined, omitBy } from 'lodash'
import { useParamsString } from './usePrdQueryConfig'

export type QueryCateConfig = {
  [key in keyof CategoryListConfig]: string
}

export const useCateQueryConfig = () => {
  const queryString: QueryCateConfig = useParamsString()
  const queryConfig: QueryCateConfig = omitBy(
    {
      page: queryString.page || 1,
      size: queryString.size || 10
    },
    isUndefined
  )

  return queryConfig
}
