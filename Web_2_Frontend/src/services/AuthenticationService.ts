import axios, { AxiosResponse } from 'axios'

import { TokenResponse } from '../models/TokenModel'
import { GoogleAuth, LoginRequest, RegisterRequest } from '../models/AuthenticationModels'
import { baseUrl } from './ServiceConfig'

const url = `${baseUrl}/api/authentication/`

export const login = (request: LoginRequest): Promise<AxiosResponse<TokenResponse>> => {
  return axios.post<TokenResponse>(`${url}login`, request)
}

export const register = (request: RegisterRequest): Promise<AxiosResponse<string>> => {
  return axios.post<string>(`${url}register`, request)
}

export const googleAuth = (request: GoogleAuth): Promise<AxiosResponse<TokenResponse>> => {
  return axios.post<TokenResponse>(`${url}google-authentication`, request)
}
