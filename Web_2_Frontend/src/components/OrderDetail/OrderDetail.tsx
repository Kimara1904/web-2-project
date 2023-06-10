import { useEffect, useState } from 'react'

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { AxiosError, isAxiosError } from 'axios'

import { Order } from '../../models/OrderModels'
import { isAdmin, isCustomer } from '../../helpers/AuthHelper'
import styles from './OrderDetail.module.css'
import { cancelOrder } from '../../services/OrderService'
import { GetTimeUntilDelivery, isInDelivery } from '../../helpers/DateTimeHelper'

const OrderDetail = () => {
  const [order, setOrder] = useState<Order>()
  const [currentTime, setCurrentTime] = useState(new Date())
  const location = useLocation().state as { order: Order }

  useEffect(() => {
    const storedOrderData = sessionStorage.getItem('order')
    if (storedOrderData) {
      const parsedOrder = JSON.parse(storedOrderData) as Order
      setOrder(parsedOrder)
    } else if (location.order) {
      setOrder(location.order)
    }
  }, [location.order])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const handleCancelOrder = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    cancelOrder(order?.id as number)
      .then((response) => {
        setOrder(response.data)
        sessionStorage.setItem('order', JSON.stringify(response.data))
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          //alert
        }
      })
  }
  const handleDeleteLocalOrder = () => {
    sessionStorage.removeItem('order')
  }

  return (
    <div>
      <div className={styles.order_detail_link_back}>
        <Link to='/dashboard' onClick={handleDeleteLocalOrder}>
          Back to Dashboard
        </Link>
      </div>
      <div className={styles.order_detail_div}>
        <div className={styles.order_detail}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Order id:</Typography>
                  </TableCell>
                  <TableCell align='right'>{order?.id || ''}</TableCell>
                </TableRow>
                {!isCustomer() && (
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      <Typography variant='h6'>Buyer:</Typography>
                    </TableCell>
                    <TableCell align='right'>{order?.buyerUsername || ''}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Address:</Typography>
                  </TableCell>
                  <TableCell align='right'>{order?.address || ''}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Status:</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    {order?.isCancled
                      ? 'Canceled'
                      : isInDelivery(new Date(order?.deliveryTime as string), currentTime)
                      ? isAdmin()
                        ? 'In Delivery'
                        : GetTimeUntilDelivery(new Date(order?.deliveryTime as string), currentTime)
                      : 'Delivered'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Items:</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    {order?.items.map((item) => {
                      return (
                        <Typography key={item.id} variant='body2'>
                          {`${item.article.name} x ${item.amount}: ${
                            item.article.price * item.amount
                          }RSD`}
                        </Typography>
                      )
                    })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Comment:</Typography>
                  </TableCell>
                  <TableCell align='right'>{order?.comment || ''}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Delivery price:</Typography>
                  </TableCell>
                  <TableCell align='right'>{order?.deliveryPrice || ''} RSD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Total price:</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    {(order?.itemPrice as number) + (order?.deliveryPrice as number) || ''} RSD
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {isCustomer() &&
          !order?.isCancled &&
          isInDelivery(new Date(order?.deliveryTime as string), currentTime) && (
            <Button variant='contained' color='primary' onClick={handleCancelOrder}>
              Cancel
            </Button>
          )}
      </div>
    </div>
  )
}

export default OrderDetail
