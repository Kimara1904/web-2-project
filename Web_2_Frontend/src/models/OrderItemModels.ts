import { Article } from './ArticleModels'

export interface OrderItem {
  id: number
  amount: number
  article: Article
}
