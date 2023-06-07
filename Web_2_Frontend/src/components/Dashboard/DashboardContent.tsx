import { ReactNode, useContext } from 'react'

import { Button, Drawer } from '@mui/material'

import { isAdmin, isCustomer, isSellerVerified } from '../../helpers/AuthHelper'
import styles from './DashboardContent.module.css'
import AllOrderContent from './Contents/AllOrderContent'
import VerifiedSellerContent from './Contents/VerifiedSellerContent'
import UnverifiedSellerContent from './Contents/UnverifiedSellerContent'
import DashContext from '../../store/dashboard-context'
import OrdersInDeliveryContent from './Contents/OrdersInDeliveryContent'
import DeliveredOrdersContent from './Contents/DeliveredOrdersContent'
import ArticleContent from './Contents/ArticleContent'
import PlaceOrderContent from './Contents/PlaceOrderContent'

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
    content = <ArticleContent />
  } else if (contentContext.content === 'in_delivery') {
    content = <OrdersInDeliveryContent />
  } else if (contentContext.content === 'delivered') {
    content = <DeliveredOrdersContent />
  } else if (
    contentContext.content === 'place_order' ||
    (isCustomer() && contentContext.content === '')
  ) {
    content = <PlaceOrderContent />
  } else if (contentContext.content === 'my_orders') {
    //my orders
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
          {isCustomer() && (
            <Button variant='text' onClick={() => handleOptionsClick('place_order')}>
              Place order
            </Button>
          )}
          {isCustomer() && (
            <Button variant='text' onClick={() => handleOptionsClick('my_orders')}>
              My orders
            </Button>
          )}
        </div>
      </Drawer>

      {<div>{content}</div>}
    </div>
  )
}

export default DashboardContent
