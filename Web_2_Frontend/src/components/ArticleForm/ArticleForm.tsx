import { ChangeEvent, createRef, useState } from 'react'

import { Button, TextField, Typography } from '@mui/material'

import articleDefault from '../../images/default_article_pictures.png'
import styles from './ArticleForm.module.css'
import { CreateArticle } from '../../models/ArticleModels'

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
  const [filePreview, setFilePreview] = useState<string>()

  const fileInputRef = createRef<HTMLInputElement>()
  const nameRef = createRef<HTMLInputElement>()
  const descriptionRef = createRef<HTMLInputElement>()

  const handleBlurName = () => {
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
    if (parseInt(amount) <= 0) {
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64String = reader.result as string
        const rawData = base64String.split(';base64,')[1]
        setFilePreview(rawData)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const base64ToBlob = (base64Image: string): Blob => {
    const decodedData = window.atob(base64Image)
    const uIntArray = new Uint8Array(decodedData.length)

    for (let i = 0; i < decodedData.length; ++i) {
      uIntArray[i] = decodedData.charCodeAt(i)
    }

    return new Blob([uIntArray], { type: 'image/png' })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const enteredName = nameRef.current?.value.trim() as string
    const enteredPrice = parseFloat(price)
    const enteredAmount = parseInt(amount)
    const enteredDescription = descriptionRef.current?.value.trim() as string
    const enteredImage = filePreview

    if (enteredName.length === 0 || enteredName.length > 20) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isNameError: true
      }))
      return
    }

    if (enteredPrice <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isPriceError: true
      }))
      return
    }

    if (enteredAmount <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isAmountError: true
      }))
    }

    if (enteredDescription.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isDescriptionError: true
      }))
      return
    }

    const request: CreateArticle = {
      name: enteredName,
      price: enteredPrice,
      amount: enteredAmount,
      description: enteredDescription,
      imageFile: enteredImage
    }

    const formData = new FormData()
    formData.append('name', request.name)
    formData.append('price', request.price.toString())
    formData.append('amount', request.amount.toString())
    if (request.imageFile) {
      formData.append('imageFile', base64ToBlob(request.imageFile))
    }
  }
  return (
    <div className={styles.article_div_form}>
      <Typography variant='h4'>Add new article</Typography>
      <form onSubmit={handleSubmit}>
        <div className={styles.article_form}>
          <div className={styles.article_file}>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <Button
              variant='text'
              color='primary'
              startIcon={
                <img
                  src={filePreview ? `data:image/png;base64,${filePreview}` : articleDefault}
                  alt='article'
                />
              }
              onClick={handleButtonClick}
              style={{
                backgroundSize: 'cover'
              }}
            />
          </div>
          <div className={styles.article_inputs}>
            <TextField
              id='ArticleName'
              type='text'
              label='Name'
              variant='outlined'
              error={errors.isNameError}
              helperText={errors.isNameError && errorNameMessages}
              inputRef={nameRef}
              onBlur={handleBlurName}
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
          </div>
        </div>
        <Button type='submit' variant='contained' color='primary' style={{ marginBottom: '16px' }}>
          Create
        </Button>
      </form>
    </div>
  )
}
export default ArticleForm
