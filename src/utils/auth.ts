import Cookies from 'js-cookie'

import { CookieEnum } from '@/enums'

export const setToken = (name: string, token: string) => Cookies.set(name, token)
export const getToken = (name: string) => Cookies.get(name)
export const removeToken = (name: string) => Cookies.remove(name)
export const clearToken = () => {
	Cookies.remove(CookieEnum.accessToken)
	Cookies.remove(CookieEnum.refreshToken)
}
export const cookieJs = {
	setToken: setToken,
	getToken: getToken,
	removeToken: removeToken,
	clearToken: clearToken
}
