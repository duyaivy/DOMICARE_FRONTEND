import { UserListConfig } from '@/models/interface/user.interface'
import { useParamsString } from './usePrdQueryConfig'
import { isUndefined, omitBy } from 'lodash'

export type QueryUserConfig = {
  [key in keyof UserListConfig]: string
}

export default function useUserQueryConfig() {
  const queryString: QueryUserConfig = useParamsString()
  const queryParams: QueryUserConfig = omitBy(
    {
      page: queryString.page || 1,
      size: queryString.size || 10
    },
    isUndefined
  )
  return queryParams
}
