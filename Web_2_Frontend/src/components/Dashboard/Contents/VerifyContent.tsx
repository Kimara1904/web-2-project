import { useEffect, useState } from 'react'

import { AxiosError, isAxiosError } from 'axios'

import SellerVerifyList from '../../../SellerVerifyList/SellerVerifyList'
import { User } from '../../../models/UserModels'
import { getUnverifiedSeller, getVerifiedSeller } from '../../../services/UserService'

const VerifyContent = () => {
  const [verifiedSellers, setVerifiedSellers] = useState<User[]>([])
  const [unverifiedSellers, setUnverifiedSellers] = useState<User[]>([])

  const getSellers = () => {
    getVerifiedSeller()
      .then((response) => {
        setVerifiedSellers(response.data)
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          //ispisati gresku na alertu
        }
      })
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

  useEffect(() => {
    getSellers()
  }, [])

  return (
    <>
      <SellerVerifyList sellers={verifiedSellers} verified={true} />
      <SellerVerifyList sellers={unverifiedSellers} verified={false} onVerify={getSellers} />
    </>
  )
}

export default VerifyContent
