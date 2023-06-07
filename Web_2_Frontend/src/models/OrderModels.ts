import { OrderItem } from './OrderItemModels'

export interface Order {
  id: number
  buyerUsername: string
  items: OrderItem[]
  itemPrice: number
  deliveryPrice: number
  address: string
  comment: string
  deliveryTime: string
  isCancled: boolean
}
