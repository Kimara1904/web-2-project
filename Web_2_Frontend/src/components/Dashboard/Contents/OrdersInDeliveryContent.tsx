import { useEffect, useState } from 'react'

import { AxiosError, isAxiosError } from 'axios'
import { Alert, AlertTitle } from '@mui/material'

import { Order } from '../../../models/OrderModels'
import { getOrdersInDelivery } from '../../../services/OrderService'
import OrderList from '../../OrderList/OrderList'
import styles from './AllOrderContent.module.css'

const OrderInDeliveryContent = () => {
  const [orderList, setOrderList] = useState<Order[]>([])
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    getOrdersInDelivery()
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

export default OrderInDeliveryContent
