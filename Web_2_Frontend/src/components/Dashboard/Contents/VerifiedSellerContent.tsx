import { useEffect, useState } from 'react'

import { AxiosError, isAxiosError } from 'axios'

import SellerVerifyList from '../../../SellerVerifyList/SellerVerifyList'
import { User } from '../../../models/UserModels'
import { getVerifiedSeller } from '../../../services/UserService'

const VerifyContent = () => {
  const [verifiedSellers, setVerifiedSellers] = useState<User[]>([])

  useEffect(() => {
    getVerifiedSeller()
      .then((response) => {
        setVerifiedSellers(response.data)
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          //ispisati gresku na alertu
        }
      })
  }, [])

  return (
    <>
      <SellerVerifyList sellers={verifiedSellers} verified={true} />
    </>
  )
}

export default VerifyContent
