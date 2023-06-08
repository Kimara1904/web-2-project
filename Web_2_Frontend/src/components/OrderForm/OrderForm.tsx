import { createRef, useContext, useEffect, useState } from 'react'

import { Button, TextField, Typography } from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'

import PickedItem from './PickedItem'
import CartContext from '../../store/cart-context'
import { CreateItem } from '../../models/OrderItemModels'
import { CreateOrder } from '../../models/OrderModels'
import { createOrder } from '../../services/OrderService'

const OrderForm = () => {
  const [isAddressError, setIsAddressError] = useState(false)
  const [isListItemEmpty, setIsListItemEmpty] = useState(false)
  const addressRef = createRef<HTMLInputElement>()
  const commentRef = createRef<HTMLInputElement>()

  const cartContext = useContext(CartContext)

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
        //prosledi u OrderDetail
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          //rokni neki alert
        }
      })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
