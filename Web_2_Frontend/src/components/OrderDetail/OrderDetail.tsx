import { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

import { Order } from '../../models/OrderModels'
import { isAdmin, isCustomer } from '../../helpers/AuthHelper'
import styles from './OrderDetail.module.css'

const OrderDetail = () => {
  const [order, setOrder] = useState<Order>()
  const [currentTime, setCurrentTime] = useState(new Date())
  const location = useLocation().state as { order: Order }

  useEffect(() => {
    setOrder(location.order)
  }, [location.order])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const isInDelivery = (date: Date) => {
    return currentTime < date
  }

  const GetTimeUntilDelivery = (date: Date) => {
    const timeDiff = date.getTime() - currentTime.getTime()
    const hours = Math.floor(timeDiff / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div>
      <div className={styles.order_detail_link_back}>
        <Link to='/dashboard'>Back to Dashboard</Link>
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
                      : isInDelivery(new Date(order?.deliveryTime as string))
                      ? isAdmin()
                        ? 'In Delivery'
                        : GetTimeUntilDelivery(new Date(order?.deliveryTime as string))
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
      </div>
    </div>
  )
}

export default OrderDetail
