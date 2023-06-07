import { createRef, useState } from 'react'

import { TextField } from '@mui/material'

const OrderForm = () => {
  const [isAddressError, setIsAddressError] = useState(false)
  const addressRef = createRef<HTMLInputElement>()
  const commentRef = createRef<HTMLInputElement>()

  function handleBlurName(): void {
    if (addressRef.current?.value.trim().length === 0) {
      setIsAddressError(true)
    }
  }

  return (
    <div>
      <form>
        <div>Ovde ide lista itema</div>
        <TextField
          id='OrderAddress'
          type='text'
          label='Address'
          variant='outlined'
          error={isAddressError}
          helperText={isAddressError && 'Address is required.'}
          inputRef={addressRef}
          onBlur={handleBlurName}
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
      </form>
    </div>
  )
}

export default OrderForm
