import { ReactNode } from 'react'

import { Typography } from '@mui/material'

import { isAdmin, isCustomer, isSellerVerified } from '../helpers/TokenHelpers'
import DashboardContent from '../components/Dashboard/DashboardContent'

const DashboardPage = () => {
  let content: ReactNode = null

  if (!isAdmin() && !isSellerVerified() && !isCustomer()) {
    content = (
      <Typography variant='h2' color='error' align='center' style={{ marginBottom: '16px' }}>
        You&apos;re not verified
      </Typography>
    )
  } else {
    content = <DashboardContent />
  }
  return <>{content}</>
}

export default DashboardPage
