import { Typography } from '@mui/material'

import { ArticleItemProperties } from '../../models/Properties'
import articleDefault from '../../images/default_article_pictures.png'
import styles from './ArticleList.module.css'

const ArticleItem = (prop: ArticleItemProperties) => {
  return (
    <div className={styles.article_item}>
      <img
        src={prop.article.image ? `data:image/png;base64,${prop.article.image}` : articleDefault}
        alt='article'
      />
      <Typography>{prop.article.name}</Typography>
      <Typography>{`${prop.article.price} RSD`}</Typography>
      <Typography>{`Amount: ${prop.article.amount}`}</Typography>
    </div>
  )
}

export default ArticleItem
