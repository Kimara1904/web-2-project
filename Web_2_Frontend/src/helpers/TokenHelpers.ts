import { UserRole } from '../models/TokenModel'

export const isUserLoggedIn = () => {
  return sessionStorage.getItem('token') !== null
}

export const isAdmin = () => {
  return sessionStorage.getItem('role') === UserRole.Admin
}

export const isSellerVerified = () => {
  return (
    sessionStorage.getItem('role') === UserRole.Seller &&
    sessionStorage.getItem('verified') === 'Accepted'
  )
}

export const isCustomer = () => {
  return sessionStorage.getItem('role') === UserRole.Customer
}
