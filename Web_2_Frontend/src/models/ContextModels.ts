import { ReactNode } from 'react'

import { CreateItem } from './OrderItemModels'

export interface DashboardContextModel {
  content: string
  setContent: (mark: string) => void
}

export interface ProviderModel {
  children: ReactNode
}

export interface CartContextModel {
  items: CreateItem[]
  onAdd: (item: CreateItem) => void
  onRemove: (id: number) => void
  onChange: (id: number, amount: number) => void
}
