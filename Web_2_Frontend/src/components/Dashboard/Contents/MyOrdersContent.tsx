import { useEffect, useState } from 'react'

import { Alert, AlertTitle } from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'

import { Order } from '../../../models/OrderModels'
import styles from './AllOrderContent.module.css'
import OrderList from '../../OrderList/OrderList'
import { getMyOrders } from '../../../services/OrderService'

const MyOrdersContent = () => {
  const [orderList, setOrderList] = useState<Order[]>([])
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    getMyOrders()
      .then((response) => {
        setOrderList(response.data)
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          setIsError(true)
        }
      })
  }, [])

  return (
    <>
      {isError && (
        <Alert
          className={styles.alert_all_orders}
          severity='error'
          onClose={() => setIsError(false)}
        >
          <AlertTitle>Error</AlertTitle>
          Internal Server Error: 500
        </Alert>
      )}
      <OrderList orders={orderList} />
    </>
  )
}

export default MyOrdersContent
