import { ReactNode, useContext } from 'react'

import { Button, Drawer } from '@mui/material'

import { isAdmin, isSellerVerified } from '../../helpers/TokenHelpers'
import styles from './DashboardContent.module.css'
import AllOrderContent from './Contents/AllOrderContent'
import VerifiedSellerContent from './Contents/VerifiedSellerContent'
import UnverifiedSellerContent from './Contents/UnverifiedSellerContent'
import DashContext from '../../store/dashboard-context'

const DashboardContent = () => {
  const contentContext = useContext(DashContext)

  const handleOptionsClick = (mark: string) => {
    contentContext.setContent(mark)
  }

  let content: ReactNode = null
  if (contentContext.content === 'all_orders' || (isAdmin() && contentContext.content === '')) {
    content = <AllOrderContent />
  } else if (contentContext.content === 'verified') {
    content = <VerifiedSellerContent />
  } else if (contentContext.content === 'unverified') {
    content = <UnverifiedSellerContent />
  } else if (
    contentContext.content === 'articles' ||
    (isSellerVerified() && contentContext.content === '')
  ) {
    // articles
  } else if (contentContext.content === 'in_delivery') {
    // in delivery orders
  } else if (contentContext.content === 'delivered') {
    // delivered orders
  } else {
    //customers dashboard
  }

  return (
    <div className={styles.dashboard_div}>
      <Drawer
        variant='permanent'
        className={styles.sidebar}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 110 }
        }}
      >
        <div className={styles.options}>
          {isAdmin() && (
            <Button variant='text' onClick={() => handleOptionsClick('all_orders')}>
              All Orders
            </Button>
          )}
          {isAdmin() && (
            <Button variant='text' onClick={() => handleOptionsClick('verified')}>
              Verified sellers
            </Button>
          )}
          {isAdmin() && (
            <Button
              variant='text'
              className={styles.dashboard_button}
              onClick={() => handleOptionsClick('unverified')}
            >
              Unverified sellers
            </Button>
          )}
          {isSellerVerified() && (
            <Button variant='text' onClick={() => handleOptionsClick('articles')}>
              Articles
            </Button>
          )}
          {isSellerVerified() && (
            <Button variant='text' onClick={() => handleOptionsClick('in_delivery')}>
              Orders in delivery
            </Button>
          )}
          {isSellerVerified() && (
            <Button variant='text' onClick={() => handleOptionsClick('delivered')}>
              Delivered orders
            </Button>
          )}
        </div>
      </Drawer>

      {<div>{content}</div>}
    </div>
  )
}

export default DashboardContent
