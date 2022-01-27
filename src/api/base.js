import axios from 'axios'
import cookie from 'js-cookie'
import t from '@/i18n'
// 创建axios实例
console.log(import.meta.VITE_APP_BASE_API,'2123');
const instance = axios.create({
  baseURL: import.meta.VITE_APP_BASE_API||'https://pix.ipv4.host',
  timeout: 20000,
  validateStatus(status) {
    return status >= 200 && status < 600
  },
})
instance.interceptors.request.use(
  (config) => {
    if (cookie.get('jwt')) {
      config.headers.authorization = cookie.get('jwt')
    }
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    // console.log('response', response);
    if (response.headers.hasOwnProperty('authorization')) {
      cookie.set('jwt', response.headers.authorization, {
        expires: 365,
      })
    }
    if (response.status === 401) {
      // 登录过期
      cookie.remove('jwt')
      localStorage.removeItem('user')
      const message = t('filter.loginError')
      alert(message)
      setTimeout(() => { window.location.href = '/' }, 1000)
    }
    return response
  },
  (error) => {
    console.log(`err${error}`)
    return Promise.reject(error)
  },
)

export default instance
