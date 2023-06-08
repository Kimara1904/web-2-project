import { ReactNode } from 'react'

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
import { isCustomer } from '../../helpers/AuthHelper'
import OrderItem from './OrderItem'

const OrderList = (prop: OrderListProperties) => {
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
          <OrderItem key={order.id} order={order} />
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
