import axios, { AxiosResponse } from 'axios'

import { baseUrl } from './ServiceConfig'
import { User, UserVerify } from '../models/UserModels'

const url = `${baseUrl}/api/users`

export const getVerifiedSeller = (): Promise<AxiosResponse<User[]>> => {
  return axios.get<User[]>(`${url}/verified`)
}

export const getUnverifiedSeller = (): Promise<AxiosResponse<User[]>> => {
  return axios.get<User[]>(`${url}/unverified`)
}

export const verifySeller = (request: UserVerify): Promise<AxiosResponse<string>> => {
  return axios.put<string>(`${url}/verify`, request)
}
