import { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'

import ArticleForm from '../../ArticleForm/ArticleForm'
import ArticleList from '../../ArticleList/ArticleList'
import { getSellersArticle } from '../../../services/ArticleService'
import { Article } from '../../../models/ArticleModels'

const ArticleContent = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [articleList, setArticleList] = useState<Article[]>([])

  const getSellersArticles = () => {
    getSellersArticle()
      .then((response) => {
        setArticleList(response.data)
      })
      .catch((error: AxiosError) => {
        if (isAxiosError(error)) {
          //
        }
      })
  }

  useEffect(() => {
    getSellersArticles()
  }, [])

  const handleClickButton = () => {
    setIsFormVisible((pervState) => !pervState)
  }

  return (
    <div>
      <Button variant='contained' onClick={handleClickButton}>
        {isFormVisible ? '-' : '+'}
      </Button>
      {isFormVisible && <ArticleForm />}
      <ArticleList articles={articleList} />
    </div>
  )
}
export default ArticleContent
