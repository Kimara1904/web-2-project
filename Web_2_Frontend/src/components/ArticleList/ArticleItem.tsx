import { useContext, useEffect, useState } from 'react'

import { IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useNavigate } from 'react-router-dom'

import { ArticleItemProperties } from '../../models/Properties'
import articleDefault from '../../images/default_article_pictures.png'
import styles from './ArticleList.module.css'
import { isCustomer } from '../../helpers/AuthHelper'
import CartContext from '../../store/cart-context'
import { PickedItemInfo } from '../../models/OrderItemModels'

const ArticleItem = (prop: ArticleItemProperties) => {
  const cartContext = useContext(CartContext)
  const [picked, setPicked] = useState(
    cartContext.items.some((item) => item.articleId === prop.article.id)
  )

  const navigate = useNavigate()

  useEffect(() => {
    setPicked(cartContext.items.some((item) => item.articleId === prop.article.id))
  }, [cartContext.items, prop.article.id])

  const handleRemoveItemFromCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    cartContext.onRemove(prop.article.id)
    setPicked(false)
  }

  const handleAddItemInCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    const item: PickedItemInfo = {
      articleId: prop.article.id,
      name: prop.article.name,
      price: prop.article.price,
      amount: 1,
      capacity: prop.article.amount
    }
    cartContext.onAdd(item)
    setPicked(true)
  }

  const handleClickArticle = () => {
    navigate('/article_detail', { state: { article: prop.article } })
  }

  return (
    <div
      className={styles.article_item}
      onClick={handleClickArticle}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClickArticle()
        }
      }}
    >
      <img
        src={prop.article.image ? `data:image/png;base64,${prop.article.image}` : articleDefault}
        alt='article'
      />
      <Typography>{prop.article.name}</Typography>
      <Typography>{`${prop.article.price} RSD`}</Typography>
      <Typography>{`Amount: ${prop.article.amount}`}</Typography>
      {isCustomer() &&
        (picked ? (
          <IconButton aria-label='delete' color='primary' onClick={handleRemoveItemFromCart}>
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton
            color='primary'
            aria-label='add to shopping cart'
            disabled={prop.article.amount <= 0}
            onClick={handleAddItemInCart}
          >
            <AddShoppingCartIcon />
          </IconButton>
        ))}
    </div>
  )
}

export default ArticleItem
