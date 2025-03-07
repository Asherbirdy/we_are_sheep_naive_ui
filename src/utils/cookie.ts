import Cookies from 'js-cookie'

import { CookieEnum } from '@/types'

export const cookieJs = {
	setToken: setToken,
	setTokenWithExpiration: setTokenWithExpiration,
	getToken: getToken,
	removeToken: removeToken,
	clearToken: clearToken
}

export function setToken (name: string, token: string) {
	Cookies.set(name, token)
}

export function setTokenWithExpiration (name: string, token: string, expiration: number) {
	Cookies.set(name, token, { expires: expiration })
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