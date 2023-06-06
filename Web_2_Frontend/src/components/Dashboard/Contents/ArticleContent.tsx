import { useState } from 'react'

import { Button } from '@mui/material'

import ArticleForm from '../../ArticleForm/ArticleForm'

const ArticleContent = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const handleClickButton = () => {
    setIsFormVisible((pervState) => !pervState)
  }
  return (
    <>
      <Button variant='contained' onClick={handleClickButton}>
        {isFormVisible ? '-' : '+'}
      </Button>
      {isFormVisible && <ArticleForm />}
    </>
  )
}
export default ArticleContent
