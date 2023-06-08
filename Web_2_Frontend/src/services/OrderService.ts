import axios, { AxiosResponse } from 'axios'

import { CreateOrder, Order } from '../models/OrderModels'
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

export const createOrder = async (request: CreateOrder): Promise<AxiosResponse<Order>> => {
  return await axios.post<Order>(`${url}`, request)
}
