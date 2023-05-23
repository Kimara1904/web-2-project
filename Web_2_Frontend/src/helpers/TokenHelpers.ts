export const isUserLoggedIn = () => {
  return sessionStorage.getItem('token') !== null
}
