import { useState } from 'react'

import { AxiosError, isAxiosError } from 'axios'

import SellerVerifyList from '../../SellerVerifyList/SellerVerifyList'
import { User } from '../../../models/UserModels'
import { getUnverifiedSeller } from '../../../services/UserService'

const UnverifiedSellerContent = () => {
  const [unverifiedSellers, setUnverifiedSellers] = useState<User[]>([])

  const getUnverifiedSellers = () => {
    getUnverifiedSeller()
      .then((response) => {
        setUnverifiedSellers(response.data)
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          //ispisati gresku na alertu
        }
      })
  }
  return (
    <>
      <SellerVerifyList
        sellers={unverifiedSellers}
        verified={false}
        onVerify={getUnverifiedSellers}
      />
    </>
  )
}

export default UnverifiedSellerContent
