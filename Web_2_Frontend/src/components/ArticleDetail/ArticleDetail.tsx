import { useEffect, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'

import { Article } from '../../models/ArticleModels'
import articleDefault from '../../images/default_article_pictures.png'
import styles from './ArticleDetail.module.css'

const ArticleDetail = () => {
  const [article, setArticle] = useState<Article>()
  const location = useLocation().state as { article: Article }

  useEffect(() => {
    setArticle(location.article)
  }, [location.article])

  return (
    <div>
      <div className={styles.article_detail_link_back}>
        <Link to='/dashboard'>Back to Dashboard</Link>
      </div>
      <div className={styles.article_detail}>
        <img
          src={article?.image ? `data:image/png;base64,${article.image}` : articleDefault}
          alt='article'
        />
        <div className={styles.article_info}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Name:</Typography>
                  </TableCell>
                  <TableCell align='right'>{article?.name || ''}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Price:</Typography>
                  </TableCell>
                  <TableCell align='right'>{article?.price || ''} RSD</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Amount:</Typography>
                  </TableCell>
                  <TableCell align='right'>{article?.amount || ''}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <Typography variant='h6'>Description:</Typography>
                  </TableCell>
                  <TableCell align='right'>{article?.description || ''}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail
