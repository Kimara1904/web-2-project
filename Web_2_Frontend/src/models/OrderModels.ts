import { OrderItem } from './OrderItemModels'

export interface Order {
  id: number
  buyerUsername: string
  items: OrderItem[]
  address: string
  comment: string
  deliveryTime: string
  isCancled: boolean
}
