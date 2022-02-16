import axios from 'axios'
import { config } from './config'

export const axiosInstance = axios.create({
  baseURL: `${config.BACKEND_URL}`,
  withCredentials: false,
})

axiosInstance.interceptors.request.use((req) => {
  return req
})

class HTTP {
  // login = async (data: { email: string; password: string }) => {
  //   const response = await axiosInstance.post<{ token: string }>(
  //     `/admin/auth/signin`,
  //     data,
  //   )
  //   return response.data
  // }
  // me = async () => {
  //   const response = await axiosInstance.get<User>(`/users/me`)
  //   return response.data
  // }
}

export const http = new HTTP()
