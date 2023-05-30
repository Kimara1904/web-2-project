import { Button, TableCell, TableRow } from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'

import { SellerVerifyItemProperties } from '../models/Properties'
import DefaultUserImage from '../images/default_user_picture.jpg'
import { verifySeller } from '../services/UserService'

const SellerVerifyItem = (props: SellerVerifyItemProperties) => {
  const handleVerify = (verified: string) => {
    verifySeller({ username: props.seller.username, verified })
      .then(() => {
        if (props.onVerify) {
          props.onVerify()
        }
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          //izbaciti alert
        }
      })
  }

  const handleAcceptClick = () => {
    handleVerify('Accepted')
  }

  const handleDenyClick = () => {
    handleVerify('Denied')
  }

  return (
    <TableRow
      key={props.seller.username}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <img
          src={
            props.seller.image !== ''
              ? 'data:image/png;base64,' + props.seller.image
              : DefaultUserImage
          }
          alt='Book cover'
        />
      </TableCell>
      <TableCell component='th' scope='row'>
        {props.seller.username}
      </TableCell>
      <TableCell>{props.seller.email}</TableCell>
      <TableCell>{props.seller.firstName + ' ' + props.seller.lastName}</TableCell>
      <TableCell>{props.seller.address}</TableCell>
      <TableCell align='right'>
        {!props.verified && (
          <>
            <Button variant='contained' onClick={handleAcceptClick}>
              Accept
            </Button>
            <Button variant='contained' onClick={handleDenyClick}>
              Denied
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  )
}

export default SellerVerifyItem
