import { ROLE_ADMIN, ROLE_SALE, ROLE_USER } from '@/configs/consts'
import { role } from '@/models/interface/user.interface'
import { isEqual } from 'lodash'

export const rolesCheck = {
  isAdminOrSale: (roles: role[]) =>
    roles.some((role) => isEqual(role.name, ROLE_SALE) || isEqual(role.name, ROLE_ADMIN)),
  isAdmin: (roles: role[]) => roles.some((role) => isEqual(role.name, ROLE_ADMIN)),
  isSale: (roles: role[]) => roles.some((role) => isEqual(role.name, ROLE_SALE)),
  isUser: (roles: role[]) => roles.some((role) => isEqual(role.name, ROLE_USER))
}
