import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { UserDialogType } from '@/configs/consts'
import { User } from '@/models/interface/user.interface'
import useDialogState from '@/hooks/useDialogState'

// interface CategoryContextType {
//   open: CategoryDialogType | null
//   setOpen: (str: CategoryDialogType | null) => void
//   currentRow: Category | null
//   setCurrentRow: Dispatch<SetStateAction<Category | null>>
// }

// const CategoryContext = createContext<CategoryContextType | null>(null)

// export default function CategoryProvider({ children }: Props) {
//   const [open, setOpen] = useDialogState<CategoryDialogType>(null)
//   const [currentRow, setCurrentRow] = useState<Category | null>(null)

//   return <CategoryContext value={{ open, setOpen, currentRow, setCurrentRow }}>{children}</CategoryContext>
// }

interface UserContextType {
  open: UserDialogType | null
  setOpen: (str: UserDialogType | null) => void
  currentRow: User | null
  setCurrentRow: Dispatch<SetStateAction<User | null>>
}

const UserContext = createContext<UserContextType | null>(null)
interface Props {
  children: ReactNode
}
export function UserProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UserDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  return <UserContext value={{ open, setOpen, currentRow, setCurrentRow }}>{children}</UserContext>
}
// eslint-disable-next-line react-refresh/only-export-components
export function useUsers() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider')
  }
  return context
}
