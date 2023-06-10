import { Article } from './ArticleModels'
import { PickedItemInfo } from './OrderItemModels'
import { Order } from './OrderModels'
import { User } from './UserModels'

export interface OrderListProperties {
  orders: Order[]
}

export interface OrderItemProperties {
  order: Order
}

export interface SellerVerifyListProperties {
  sellers: User[]
  verified: boolean
  onVerify?: () => void
}

export interface SellerVerifyItemProperties {
  seller: User
  verified: boolean
  onVerify?: () => void
}

export interface ArticleListProperties {
  articles: Article[]
}

export interface ArticleItemProperties {
  article: Article
}

export interface PickedItemProperties {
  item: PickedItemInfo
}

export interface ArticleFormProperties {
  article?: Article
  onChangeValue?: (article: Article) => void
  afterSucc?: 'navigate' | 'changeValue'
}
