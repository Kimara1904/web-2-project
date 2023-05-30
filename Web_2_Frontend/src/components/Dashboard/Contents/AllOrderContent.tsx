import { useEffect, useState } from 'react'

import { AxiosError, isAxiosError } from 'axios'
import { Alert, AlertTitle } from '@mui/material'

import OrderList from '../../OrderList/OrderList'
import { getAllOrders } from '../../../services/OrderService'
import { Order } from '../../../models/OrderModels'
import styles from './AllOrderContent.module.css'

const AllOrderContent = () => {
  const [orderList, setOrderList] = useState<Order[]>([])
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    getAllOrders()
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

export default AllOrderContent
