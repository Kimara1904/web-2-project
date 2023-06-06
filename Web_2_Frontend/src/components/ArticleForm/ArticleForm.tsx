import { ChangeEvent, createRef, useState } from 'react'

import { TextField, Typography } from '@mui/material'

const ArticleForm = () => {
  const [errorNameMessages, setErrorNameMessages] = useState('Name is required')
  const [errors, setErrors] = useState({
    isNameError: false,
    isPriceError: false,
    isAmountError: false,
    isDescriptionError: false
  })
  const [price, setPrice] = useState('0')
  const [amount, setAmount] = useState('0')

  const nameRef = createRef<HTMLInputElement>()
  const descriptionRef = createRef<HTMLInputElement>()

  const handleBlurUsername = () => {
    const nameLength = nameRef.current?.value.trim().length as number
    if (nameLength === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isNameError: true
      }))
      setErrorNameMessages('Name is required')
    } else if (nameLength > 20) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isNameError: true
      }))
      setErrorNameMessages('Name must have less than 20 characters')
    }
  }

  const handleBlurPrice = () => {
    if (parseFloat(price) <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isPriceError: true
      }))
    }
  }

  const handleBlurAmount = () => {
    if (parseInt(price) <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isAmountError: true
      }))
    }
  }

  const handleBlurDescription = () => {
    if (descriptionRef.current?.value.trim().length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isDescriptionError: true
      }))
    }
  }

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value.trim()

    if (newValue === '') {
      newValue = '0'
    } else if (newValue.startsWith('0') && newValue.length > 1 && !newValue.includes('.')) {
      newValue = newValue.substring(1)
    }

    if (parseFloat(newValue) > 0) {
      setPrice(newValue)
    } else {
      setPrice('0')
    }
  }

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value.trim()

    if (newValue === '') {
      newValue = '0'
    } else if (newValue.startsWith('0') && newValue.length > 1) {
      newValue = newValue.substring(1)
    }

    if (parseInt(newValue) > 0) {
      setAmount(newValue)
    } else {
      setAmount('0')
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '.') {
      event.preventDefault()
    }
  }

  return (
    <div>
      <Typography variant='h4'>Add new article</Typography>
      <form>
        <TextField
          id='ArticleName'
          type='text'
          label='Name'
          variant='outlined'
          error={errors.isNameError}
          helperText={errors.isNameError && errorNameMessages}
          inputRef={nameRef}
          onBlur={handleBlurUsername}
          onFocus={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              isUsernameError: false
            }))
          }
          style={{ marginBottom: '16px' }}
        />
        <TextField
          id='ArticlePrice'
          type='number'
          label='Price'
          variant='outlined'
          error={errors.isPriceError}
          helperText={errors.isPriceError && 'Price must be bigger than 0'}
          value={price}
          onBlur={handleBlurPrice}
          onChange={handlePriceChange}
          onFocus={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              isPriceError: false
            }))
          }
          inputProps={{ inputMode: 'decimal', step: '0.01', min: '0.00' }}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          id='ArticleAmount'
          type='number'
          label='Amount'
          variant='outlined'
          error={errors.isAmountError}
          helperText={errors.isAmountError && 'Amount must be bigger than 0'}
          value={amount}
          onBlur={handleBlurAmount}
          onChange={handleAmountChange}
          onFocus={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              isAmountError: false
            }))
          }
          onKeyPress={handleKeyPress}
          inputProps={{ inputMode: 'numeric', min: '0', step: '1' }}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          id='ArticleDescription'
          type='text'
          label='Description'
          variant='outlined'
          error={errors.isDescriptionError}
          helperText={errors.isDescriptionError && 'Descriptor is required'}
          inputRef={descriptionRef}
          onBlur={handleBlurDescription}
          onFocus={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              isDescriptionError: false
            }))
          }
          style={{ marginBottom: '16px' }}
        />
      </form>
    </div>
  )
}
export default ArticleForm
