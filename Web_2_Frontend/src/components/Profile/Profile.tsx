import { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { isAxiosError } from 'axios'

import { User } from '../../models/UserModels'
import profileDefault from '../../images/default_user_picture.jpg'
import styles from './Profile.module.css'
import { getMyProfile } from '../../services/UserService'

const Profile = () => {
  const [userInfo, setUserInfo] = useState<User>()

  useEffect(() => {
    getProfileInfo()
  }, [])

  const getProfileInfo = () => {
    getMyProfile()
      .then((response) => {
        setUserInfo(response.data)
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          //alert
        }
      })
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`
  }

  return (
    <div className={styles.profile_detail}>
      <img
        src={userInfo?.image ? `data:image/png;base64,${userInfo?.image}` : profileDefault}
        alt='article'
      />
      <div className={styles.profile_info}>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component='th' scope='row'>
                  <Typography variant='h6'>Username:</Typography>
                </TableCell>
                <TableCell align='right'>{userInfo?.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  <Typography variant='h6'>Email:</Typography>
                </TableCell>
                <TableCell align='right'>{userInfo?.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  <Typography variant='h6'>Name:</Typography>
                </TableCell>
                <TableCell align='right'>
                  {(userInfo?.firstName as string) + ' ' + (userInfo?.lastName as string)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  <Typography variant='h6'>Birth date:</Typography>
                </TableCell>
                <TableCell align='right'>{formatDate(userInfo?.birthDate as string)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  <Typography variant='h6'>Address:</Typography>
                </TableCell>
                <TableCell align='right'>{userInfo?.address}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Profile
