import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CancelToken } from 'axios'

export default ($axios: NuxtAxiosInstance) => ({
  delete<T>(uri: string, cancelToken?: CancelToken) {
    return $axios.$delete<T>(uri, { withCredentials: true, cancelToken })
  },
  get<T>(uri: string, cancelToken?: CancelToken) {
    return $axios.$get<T>(uri, { withCredentials: true, cancelToken })
  },
  patch<T>(uri: string, data: any[], cancelToken?: CancelToken) {
    return $axios.$patch<T>(uri, data, { withCredentials: true, cancelToken })
  },
  post<T>(uri: string, data: any, cancelToken?: CancelToken) {
    return $axios.$post<T>(uri, data, { withCredentials: true, cancelToken })
  },
  put<T>(uri: string, data: any, cancelToken?: CancelToken) {
    return $axios.$put<T>(uri, data, { withCredentials: true, cancelToken })
  },
})
