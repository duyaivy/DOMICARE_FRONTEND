import config from '@/configs'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS } from '@/core/shared/storage'
import { SuccessResponse } from '@/models/interface/response.interface'
import axios, { HttpStatusCode } from 'axios'
import { isEqual } from 'lodash'

const axiosClient = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
// const noRequestAuth = ['/api/products', '/api/categories']
const noRequestAuth = ['/api/products']
axiosClient.interceptors.request.use(
  (config) => {
    const urlBase = config?.url
    if (urlBase && noRequestAuth.includes(urlBase)) return config
    const token = getAccessTokenFromLS()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response && isEqual(error.response.status, HttpStatusCode.Unauthorized) && !originalRequest._retry) {
      originalRequest._retry = true
      console.log('gọi lại lần 1')
      try {
        const refreshToken = getRefreshTokenFromLS()
        const response = await axios.post<SuccessResponse<{ accessToken: string; email: string }>>(
          `${config.baseUrl}/refresh-token`,
          {
            refresh_token: refreshToken
          }
        )

        if (isEqual(response.status, HttpStatusCode.Ok)) {
          const { accessToken } = response.data.data
          setAccessTokenToLS(accessToken)

          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
          return axiosClient(originalRequest)
        }
      } catch (refreshError) {
        clearLS()
        return Promise.reject(refreshError)
      }
    } else if (error.response && isEqual(error.response.status, HttpStatusCode.Unauthorized)) {
      clearLS()
    }
    return Promise.reject(error)
  }
)

export default axiosClient
