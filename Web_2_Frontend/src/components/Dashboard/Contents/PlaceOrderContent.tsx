import { useEffect, useState } from 'react'

import { AxiosError, isAxiosError } from 'axios'

import { getAllArticles } from '../../../services/ArticleService'
import ArticlePicker from '../../ArticlePicker/ArticlePicker'
import { Article } from '../../../models/ArticleModels'
import styles from './PlaceOrderContent.module.css'

const PlaceOrderContent = () => {
  const [articleList, setArticleList] = useState<Article[]>([])

  useEffect(() => {
    getArticles()
  }, [])

  function getArticles() {
    getAllArticles()
      .then((response) => setArticleList(response.data))
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          //ispisi gresku
        }
      })
  }
  return (
    <div className={styles.place_order_div}>
      <ArticlePicker articles={articleList} />
    </div>
  )
}

export default PlaceOrderContent
