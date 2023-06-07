import { Article } from './ArticleModels'

export interface OrderItem {
  id: number
  amount: number
  article: Article
}

export interface CreateItem {
  articleId: number
  amount: number
}
