import HttpStatusCode from '@/core/constants/http'
import { FailResponse } from '@/models/interface/response.interface'
import { AxiosError } from 'axios'
import { isEqual } from 'lodash'

export const isError422 = <T>(error: AxiosError): error is AxiosError<FailResponse<T>> => {
  // be tra ve loi 400, em lam loi 400 theo logic sau be sua lai loi 422 thi em doi lai nha seppp
  if (isEqual(error.status, HttpStatusCode.UnprocessableEntity)) {
    return true
  }

  return false
}
