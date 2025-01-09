import { config } from '@/config'
const isDev = import.meta.env.DEV
const baseUrl = isDev ? config.apiUrl : `${window.location.origin}/api/v1`

export default {
  baseUrl
}