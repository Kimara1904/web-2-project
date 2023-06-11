import { ReactNode, useState } from 'react'

import {
  Alert,
  AlertTitle,
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
import { isCustomer } from '../../helpers/AuthHelper'
import OrderItem from './OrderItem'
import alertStyle from '../../App.module.css'

const OrderList = (prop: OrderListProperties) => {
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })

  const handleError = (message: string) => {
    setAlertError({
      isError: true,
      message: message
    })
  }

  let content: ReactNode = null
  if (prop.orders.length === 0) {
    content = (
      <TableBody>
        <TableRow>
          <TableCell align='center' colSpan={6}>
            <Typography variant='body2' align='center' style={{ marginBottom: '16px' }}>
              There is no orders
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  } else {
    content = (
      <TableBody>
        {prop.orders.map((order) => (
          <OrderItem key={order.id} order={order} onError={handleError} />
        ))}
      </TableBody>
    )
  }
  return (
    <>
      {alertError.isError && (
        <Alert
          className={alertStyle.alert}
          severity='error'
          onClose={() =>
            setAlertError((pervState) => ({
              ...pervState,
              isError: false
            }))
          }
        >
          <AlertTitle>Error</AlertTitle>
          {alertError.message}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              {!isCustomer() && <TableCell align='right'>Buyer</TableCell>}
              <TableCell align='center'>Items</TableCell>
              <TableCell align='center'>Total Price</TableCell>
              <TableCell align='right'>Address</TableCell>
              <TableCell align='right'>Status</TableCell>
              {isCustomer() && <TableCell />}
            </TableRow>
          </TableHead>
          {content}
        </Table>
      </TableContainer>
    </>
  )
}

export default OrderList
