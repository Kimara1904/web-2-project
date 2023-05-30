import axios, { AxiosResponse } from 'axios'

import { Order } from '../models/OrderModels'
import { baseUrl } from './ServiceConfig'

const url = `${baseUrl}/api/orders`

export const getAllOrders = (): Promise<AxiosResponse<Order[]>> => {
  return axios.get<Order[]>(`${url}`)
}
