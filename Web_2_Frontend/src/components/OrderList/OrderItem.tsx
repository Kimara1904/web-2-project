import { useEffect, useState } from 'react'

import { Button, TableCell, TableRow } from '@mui/material'

import { OrderItemProperties } from '../../models/Properties'
import { isAdmin, isCustomer } from '../../helpers/AuthHelper'

const OrderItem = (props: OrderItemProperties) => {
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
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component='th' scope='row'>
        {props.order.id}
      </TableCell>
      {!isCustomer() && <TableCell align='right'>{props.order.buyerUsername}</TableCell>}
      <TableCell align='center'>
        {props.order.items[0].article.name +
          ' x ' +
          props.order.items[0].amount.toString() +
          (props.order.items[1]
            ? ', ' +
              props.order.items[1].article.name +
              ' x ' +
              props.order.items[1].amount.toString() +
              (props.order.items[2] ? '...' : '')
            : '')}
      </TableCell>
      <TableCell align='center'>{props.order.itemPrice + props.order.deliveryPrice}</TableCell>
      <TableCell align='right'>{props.order.address}</TableCell>
      <TableCell align='right'>
        {props.order.isCancled
          ? 'Canceled'
          : isInDelivery(new Date(props.order.deliveryTime))
          ? isAdmin()
            ? 'In Delivery'
            : GetTimeUntilDelivery(new Date(props.order.deliveryTime))
          : 'Delivered'}
      </TableCell>
      {isCustomer() && (
        <TableCell>
          {!props.order.isCancled && (
            <Button variant='contained' color='primary'>
              Cancle
            </Button>
          )}
        </TableCell>
      )}
    </TableRow>
  )
}

export default OrderItem
