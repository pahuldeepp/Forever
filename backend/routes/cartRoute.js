import express from 'express'
import { addProduct, getUserCart, updateCart } from '../controllers/productController'
import authUser from '../middleware/auth'

const cartRouter = express.Router()

cartRouter.post('/get', authUser, getUserCart)
cartRouter.post('/add', authUser, addProduct)
cartRouter.post('/update', authUser, updateCart)

export default cartRouter