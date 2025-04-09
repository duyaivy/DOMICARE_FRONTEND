import { createContext, useEffect, useState } from 'react'
import {
  getAccessTokenFromLS,
  getCategoriesFromLocalStorage,
  getUserFromLocalStorage,
  setCateToLS
} from '../shared/storage'
import { User } from '@/models/interface/user.interface'
import { Category } from '@/models/interface/category.interface'
import { categoryApi } from '../services/category.service'
import { useQuery } from '@tanstack/react-query'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  categories: Category[] | null
  setCategories: React.Dispatch<React.SetStateAction<Category[] | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getUserFromLocalStorage(),
  setProfile: () => null,
  categories: getCategoriesFromLocalStorage(),
  setCategories: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [categories, setCategories] = useState<Category[] | null>(initialAppContext.categories)

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.get()
  })
  useEffect(() => {
    const dataCategory = (data && data.data.data.data) || []
    if (dataCategory.length > 0) {
      setCategories(dataCategory)
      setCateToLS(dataCategory)
    }
  }, [data])

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, categories, setCategories }}
    >
      {children}
    </AppContext.Provider>
  )
}
