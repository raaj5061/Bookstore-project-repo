import exp from 'express'
export const orderRoute=exp.Router()
import expressAsyncHandler from 'express-async-handler'
import { readAllOrders,createNewOrder } from '../controller/orderController'


orderRoute.post('/orders',expressAsyncHandler(createNewOrder))
orderRoute.get('/orders',expressAsyncHandler(readAllOrders))
