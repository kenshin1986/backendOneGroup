import { Router } from 'express'
import { getProducts, getProductId, getProductsLike, patchProduct, postProduct, deleteProduct } from '../controllers/product.controller'

const router = Router()


router
    .get('/', getProducts)
    .get('/:id', getProductId)
    .get('/like/:name', getProductsLike)

router.patch('/:id', patchProduct)

router
    .post('/', postProduct)

router.delete('/:id', deleteProduct)

export default router