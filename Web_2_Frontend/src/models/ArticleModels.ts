export interface Article {
  id: number
  name: string
  price: number
  amount: number
  description: string
  image: string
}

export interface CreateArticle {
  name: string
  price: number
  amount: number
  description: string
  imageFile?: string
}
