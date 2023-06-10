import { useEffect, useState } from 'react'

import { Button, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AxiosError, isAxiosError } from 'axios'

import { OrderItemProperties } from '../../models/Properties'
import { isAdmin, isCustomer } from '../../helpers/AuthHelper'
import { cancelOrder } from '../../services/OrderService'

const OrderItem = (props: OrderItemProperties) => {
  const [order, setOrder] = useState(props.order)
  const [currentTime, setCurrentTime] = useState(new Date())
  const navigate = useNavigate()

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

  const handleRowClick = () => {
    navigate('/order_detail', { state: { order: order } })
  }

  const handleCancelOrder = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    cancelOrder(order.id)
      .then((response) => {
        setOrder(response.data)
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          //alert
        }
      })
  }

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
      onClick={handleRowClick}
    >
      <TableCell component='th' scope='row'>
        {order.id}
      </TableCell>
      {!isCustomer() && <TableCell align='right'>{order.buyerUsername}</TableCell>}
      <TableCell align='center'>
        {order.items[0].article.name +
          ' x ' +
          order.items[0].amount.toString() +
          (order.items[1]
            ? ', ' +
              order.items[1].article.name +
              ' x ' +
              order.items[1].amount.toString() +
              (order.items[2] ? '...' : '')
            : '')}
      </TableCell>
      <TableCell align='center'>{order.itemPrice + order.deliveryPrice}</TableCell>
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
      {isCustomer() &&
        (!order.isCancled && isInDelivery(new Date(order.deliveryTime)) ? (
          <TableCell align='right'>
            <Button variant='contained' color='primary' onClick={handleCancelOrder}>
              Cancel
            </Button>
          </TableCell>
        ) : (
          <TableCell />
        ))}
    </TableRow>
  )
}

export default OrderItem
