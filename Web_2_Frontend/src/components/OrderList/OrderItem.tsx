import { useEffect, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TableCell,
  TableRow
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AxiosError, isAxiosError } from 'axios'

import { OrderItemProperties } from '../../models/Properties'
import { isAdmin, isCustomer } from '../../helpers/AuthHelper'
import { cancelOrder } from '../../services/OrderService'
import { GetTimeUntilDelivery, hasPassedOneHour, isInDelivery } from '../../helpers/DateTimeHelper'
import { ErrorData } from '../../models/ErrorModels'

const OrderItem = (props: OrderItemProperties) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const handleRowClick = () => {
    navigate('/order_detail', { state: { order: props.order } })
  }

  const handleCancelOrder = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    cancelOrder(props.order.id)
      .then((response) => {
        props.onCancel(response.data)
      })
      .catch((error: AxiosError<ErrorData>) => {
        if (isAxiosError(error)) {
          props.onError(error.response?.data.Exception as string)
        }
      })
  }

  const handleOpenDialog = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        cursor: 'pointer',
        backgroundColor: 'var(--cream_color)'
      }}
      onClick={handleRowClick}
    >
      <TableCell component='th' scope='row'>
        {props.order.id}
      </TableCell>
      {!isCustomer() && <TableCell align='right'>{props.order.buyerUsername}</TableCell>}
      <TableCell align='center'>
        {props.order.items[0].articleName +
          ' x ' +
          props.order.items[0].amount.toString() +
          (props.order.items[1]
            ? ', ' +
              props.order.items[1].articleName +
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
          : isInDelivery(new Date(props.order.deliveryTime), currentTime)
          ? isAdmin()
            ? 'In Delivery'
            : GetTimeUntilDelivery(new Date(props.order.deliveryTime), currentTime)
          : 'Delivered'}
      </TableCell>
      {isCustomer() &&
        (!props.order.isCancled &&
        isInDelivery(new Date(props.order.deliveryTime), currentTime) &&
        !hasPassedOneHour(new Date(props.order.deliveryTime), currentTime) ? (
          <TableCell align='right'>
            <Button variant='contained' color='error' onClick={handleOpenDialog}>
              Cancel
            </Button>
          </TableCell>
        ) : (
          <TableCell />
        ))}
      {isDialogOpen && (
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {`Are you sure you want to cancel order with id: ${props.order.id}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelOrder}>Yes</Button>
            <Button onClick={handleCloseDialog}>No</Button>
          </DialogActions>
        </Dialog>
      )}
    </TableRow>
  )
}

export default OrderItem
