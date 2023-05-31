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

import { SellerVerifyListProperties } from '../models/Properties'
import SellerVerifyItem from './SellerVerifyItem'

const SellerVerifyList = (props: SellerVerifyListProperties) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell align='right'>Address</TableCell>
              <TableCell align='right' />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sellers.length !== 0 ? (
              props.sellers.map((seller) => {
                return (
                  <SellerVerifyItem
                    key={seller.username}
                    seller={seller}
                    verified={props.verified}
                    onVerify={props.onVerify}
                  />
                )
              })
            ) : (
              <TableRow>
                <TableCell align='center' colSpan={6}>
                  <Typography variant='body2'>There is no users</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SellerVerifyList
