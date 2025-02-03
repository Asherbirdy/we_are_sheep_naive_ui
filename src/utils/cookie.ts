import Cookies from 'js-cookie'

import { CookieEnum } from '@/enums'

export const cookieJs = {
	setToken: setToken,
	getToken: getToken,
	removeToken: removeToken,
	clearToken: clearToken
}

export function setToken (name: string, token: string) {
	Cookies.set(name, token)
}

export function getToken (name: string) {
	return Cookies.get(name)
}

export function removeToken (name: string) {
	Cookies.remove(name)
}

export function clearToken () {
	Cookies.remove(CookieEnum.accessToken)
	Cookies.remove(CookieEnum.refreshToken)
}