import { Category } from '@/models/interface/category.interface'
import { User } from '@/models/interface/user.interface'
import { Sidebar } from '../constants/sidebar.const'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('category')
  localStorage.removeItem('user')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

export const getSideBarFromLS = () => (): Sidebar | null => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}
export const getOpenSidebarFromLS = (): boolean => {
  const isOpen = localStorage.getItem('isOpen')
  return isOpen ? JSON.parse(isOpen) : true
}
export const getCategoriesFromLocalStorage = (): Category[] | null => {
  const category = localStorage.getItem('category')
  return category ? JSON.parse(category) : null
}
export const removeAccessTokenFromLS = () => {
  localStorage.removeItem('access_token')
}
export const removeRefreshTokenFromLS = () => {
  localStorage.removeItem('refresh_token')
}

export const removeSidebarFromLS = () => {
  localStorage.removeItem('sidebar')
}

export const setUserToLS = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}
export const setSidebarToLS = (sidebar: Sidebar) => {
  localStorage.setItem('sidebar', JSON.stringify(sidebar))
}
export const setOpenSidebarToLS = (isOpen: boolean) => {
  localStorage.setItem('isOpen', JSON.stringify(isOpen))
}
export const setCateToLS = (category: Category[]) => {
  localStorage.setItem('category', JSON.stringify(category))
}
