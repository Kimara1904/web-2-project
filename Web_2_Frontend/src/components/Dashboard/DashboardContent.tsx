import { ReactNode, useState } from 'react'

import { Button, Drawer } from '@mui/material'

import { isAdmin, isSellerVerified } from '../../helpers/TokenHelpers'
import styles from './DashboardContent.module.css'
import AllOrderContent from './Contents/AllOrderContent'

const DashboardContent = () => {
  const [contentMark, setContentMark] = useState('')

  const handleAllOrdersClick = () => {
    setContentMark('all_orders')
  }

  const handleVerifyClick = () => {
    setContentMark('verify')
  }

  const handleArticlesClick = () => {
    setContentMark('articles')
  }

  const handleOrdersInDeliveryClick = () => {
    setContentMark('in_delivery')
  }

  const handleDeliveredOrdersClick = () => {
    setContentMark('delivered')
  }

  let content: ReactNode = null
  if (contentMark === 'all_orders' || (isAdmin() && contentMark === '')) {
    content = <AllOrderContent />
  } else if (contentMark === 'verify') {
    // verify component
  } else if (contentMark === 'articles' || (isSellerVerified() && contentMark === '')) {
    // articles
  } else if (contentMark === 'in_delivery') {
    // in delivery orders
  } else if (contentMark === 'delivered') {
    // delivered orders
  } else {
    //customers dashboard
  }

  return (
    <div>
      <Drawer variant='permanent' className={styles.sidebar}>
        <div className={styles.options}>
          {isAdmin() && (
            <Button variant='text' onClick={handleAllOrdersClick}>
              All Orders
            </Button>
          )}
          {isAdmin() && (
            <Button variant='text' onClick={handleVerifyClick}>
              Verify
            </Button>
          )}
          {isSellerVerified() && (
            <Button variant='text' onClick={handleArticlesClick}>
              Articles
            </Button>
          )}
          {isSellerVerified() && (
            <Button variant='text' onClick={handleOrdersInDeliveryClick}>
              Orders in delivery
            </Button>
          )}
          {isSellerVerified() && (
            <Button variant='text' onClick={handleDeliveredOrdersClick}>
              Delivered orders
            </Button>
          )}
        </div>
      </Drawer>

      {<div className={styles.dashboard_div}>{content}</div>}
    </div>
  )
}

export default DashboardContent
