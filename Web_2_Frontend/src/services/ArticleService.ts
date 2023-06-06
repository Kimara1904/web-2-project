import axios, { AxiosPromise } from 'axios'

import { Article } from '../models/ArticleModels'
import { baseUrl } from './ServiceConfig'

const url = `${baseUrl}/api/articles`

export const createArticle = async (request: FormData): Promise<AxiosPromise<Article>> => {
  return await axios.post<Article>(`${url}`, request)
}
