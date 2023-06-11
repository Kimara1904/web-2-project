import { createRef, useContext, useEffect, useState } from 'react'

import { Alert, AlertTitle, Button, TextField, Typography } from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import PickedItem from './PickedItem'
import CartContext from '../../store/cart-context'
import { CreateItem } from '../../models/OrderItemModels'
import { CreateOrder } from '../../models/OrderModels'
import { createOrder } from '../../services/OrderService'
import styles from './OrderForm.module.css'
import alertStyle from '../../App.module.css'
import { ErrorData } from '../../models/ErrorModels'

const OrderForm = () => {
  const [isAddressError, setIsAddressError] = useState(false)
  const [isListItemEmpty, setIsListItemEmpty] = useState(false)
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })

  const addressRef = createRef<HTMLInputElement>()
  const commentRef = createRef<HTMLInputElement>()

  const cartContext = useContext(CartContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (cartContext.items.length !== 0) {
      setIsListItemEmpty(false)
    }
  }, [cartContext.items.length])

  function handleBlurAddress(): void {
    if (addressRef.current?.value.trim().length === 0) {
      setIsAddressError(true)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const enteredAddrress = addressRef.current?.value.trim() as string
    const enteredComment = commentRef.current?.value.trim() as string
    if (enteredAddrress.length === 0) {
      setIsAddressError(true)
      return
    }

    if (cartContext.items.length === 0) {
      setIsListItemEmpty(true)
      return
    }

    const pickedItems: CreateItem[] = []

    cartContext.items.map((item) => {
      const pickedItem: CreateItem = {
        articleId: item.articleId,
        amount: item.amount
      }
      pickedItems.push(pickedItem)
    })

    const request: CreateOrder = {
      items: pickedItems,
      address: enteredAddrress,
      comment: enteredComment
    }

    createOrder(request)
      .then((response) => {
        navigate('/order_detail', { state: { order: response.data } })
      })
      .catch((error: AxiosError<ErrorData>) => {
        if (isAxiosError(error)) {
          setAlertError({
            isError: true,
            message: error.response?.data.Exception as string
          })
        }
      })
  }
  return (
    <div>
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
      <form onSubmit={handleSubmit} className={styles.order_form}>
        <div>
          {cartContext.items.map((item) => {
            return <PickedItem key={item.articleId} item={item} />
          })}
        </div>
        {isListItemEmpty && (
          <Typography variant='body2' color='error' style={{ marginBottom: '16px' }}>
            Cart is empty
          </Typography>
        )}
        <TextField
          id='OrderAddress'
          type='text'
          label='Address'
          variant='outlined'
          error={isAddressError}
          helperText={isAddressError && 'Address is required.'}
          inputRef={addressRef}
          onBlur={handleBlurAddress}
          onFocus={() => setIsAddressError(false)}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          id='OrderComment'
          multiline
          rows={4}
          type='text'
          label='Comment'
          variant='outlined'
          inputRef={commentRef}
          style={{ marginBottom: '16px' }}
        />
        <Button type='submit' variant='contained' color='primary' style={{ marginBottom: '16px' }}>
          Place order
        </Button>
      </form>
    </div>
  )
}

export default OrderForm
