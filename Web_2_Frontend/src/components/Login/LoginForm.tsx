import React, { createRef, useState } from 'react'

import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { AxiosError, isAxiosError } from 'axios'
import { Button, TextField, Typography } from '@mui/material'

import { login } from '../../services/AuthenticationService'
import { Jwt, roleKey } from '../../models/TokenModel'
import styles from './LoginForm.module.css'

const LoginForm = () => {
  const [isEmailError, setIsEmailError] = useState(false)
  const [isPasswordError, setIsPasswordError] = useState(false)
  const [isLoginError, setIsLoginError] = useState(false)

  const navigate = useNavigate()

  const emailRef = createRef<HTMLInputElement>()
  const passwordRef = createRef<HTMLInputElement>()

  const handleBlurEmail = () => {
    if (emailRef.current?.value.trim().length === 0) {
      setIsEmailError(true)
    }
  }

  const handleBlurPassword = () => {
    if (passwordRef.current?.value.trim().length === 0) {
      setIsPasswordError(true)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const enteredEmail = emailRef.current?.value as string
    const enteredPassword = passwordRef.current?.value as string

    if (enteredEmail.trim().length === 0) {
      setIsEmailError(true)
      return
    }

    if (enteredPassword.trim().length === 0) {
      setIsPasswordError(true)
      return
    }

    login({ email: enteredEmail, password: enteredPassword })
      .then((response) => {
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('role', jwtDecode<Jwt>(response.data.token)[roleKey])
        sessionStorage.setItem('verified', jwtDecode<Jwt>(response.data.token).Verified)
        navigate('/')
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          setIsLoginError(true)
        }
      })
  }

  return (
    <div className={styles.div_login_form}>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <TextField
          id='LoginEmail'
          type='email'
          label='Email'
          variant='outlined'
          error={isEmailError}
          helperText={isEmailError && 'Email is required'}
          inputRef={emailRef}
          onBlur={handleBlurEmail}
          onFocus={() => setIsEmailError(false)}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          id='LoginPassword'
          type='password'
          label='Password'
          variant='outlined'
          error={isPasswordError}
          helperText={isPasswordError && 'Email is required'}
          inputRef={passwordRef}
          onBlur={handleBlurPassword}
          onFocus={() => setIsPasswordError(false)}
          style={{ marginBottom: '16px' }}
        />
        {isLoginError && (
          <Typography variant='body2' color='error' style={{ marginBottom: '16px' }}>
            Wrong credentials
          </Typography>
        )}
        <Button type='submit' variant='contained' color='primary'>
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
