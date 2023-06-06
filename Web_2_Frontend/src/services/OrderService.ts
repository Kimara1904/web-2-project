import axios, { AxiosResponse } from 'axios'

import { Order } from '../models/OrderModels'
import { baseUrl } from './ServiceConfig'

const url = `${baseUrl}/api/orders`

export const getAllOrders = async (): Promise<AxiosResponse<Order[]>> => {
  return await axios.get<Order[]>(`${url}`)
}

export const getOrdersInDelivery = async (): Promise<AxiosResponse<Order[]>> => {
  return await axios.get<Order[]>(`${url}/sellers-in-delivery`)
}

export const getDeliveredOrder = async (): Promise<AxiosResponse<Order[]>> => {
  return await axios.get<Order[]>(`${url}/sellers-delivered`)
}
