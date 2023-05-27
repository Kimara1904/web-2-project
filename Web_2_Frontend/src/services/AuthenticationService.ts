import axios, { AxiosResponse } from 'axios'

import { TokenResponse } from '../models/TokenModel'
import { LoginRequest } from '../models/AuthenticationModels'
import { baseUrl } from './ServiceConfig'

const url = `${baseUrl}/api/authentication/`

export const login = (request: LoginRequest): Promise<AxiosResponse<TokenResponse>> => {
  return axios.post<TokenResponse>(`${url}login`, request)
}
