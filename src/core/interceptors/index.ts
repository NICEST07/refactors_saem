import axios from 'axios'

export const GlobalInterceptor = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  timeout: 10000
})

GlobalInterceptor.interceptors.request.use(async (req) => {
  const session = null
  const lang = 'es'
  if (session != null) {
    req.headers.Authorization = `Bearer ${session}`
  }
  req.headers['X-language'] = lang
  return req
})
