import { ReactNode, useEffect, useState } from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

import { OrderListProperties } from '../../models/Properties'
import { isAdmin } from '../../helpers/TokenHelpers'

const OrderList = (prop: OrderListProperties) => {
  const [currentTime, setCurrentTime] = useState(new Date())

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

  let content: ReactNode = null
  if (prop.orders.length === 0) {
    content = (
      <TableBody>
        <TableRow>
          <Typography variant='h2' align='center' style={{ marginBottom: '16px' }}>
            There is no orders
          </Typography>
        </TableRow>
      </TableBody>
    )
  } else {
    content = (
      <TableBody>
        {prop.orders.map((order) => (
          <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component='th' scope='row'>
              {order.id}
            </TableCell>
            <TableCell align='right'>{order.buyerUsername}</TableCell>
            <TableCell align='center'>
              {order.items.map((item) => (
                <span key={item.id}>
                  {item.article.name + ' x ' + item.amount.toString() + ';'}
                </span>
              ))}
            </TableCell>
            <TableCell align='right'>{order.address}</TableCell>
            <TableCell align='right'>
              {order.isCancled
                ? 'Canceled'
                : isInDelivery(new Date(order.deliveryTime))
                ? isAdmin()
                  ? 'In Delivery'
                  : GetTimeUntilDelivery(new Date(order.deliveryTime))
                : 'Delivered'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align='right'>Buyer</TableCell>
              <TableCell align='center'>Items</TableCell>
              <TableCell align='right'>Address</TableCell>
              <TableCell align='right'>Status</TableCell>
            </TableRow>
          </TableHead>
          {content}
        </Table>
      </TableContainer>
    </>
  )
}

export default OrderList
