import exp from 'express'
import expressAsyncHandler from 'express-async-handler'
import { readAllBooks,editBook } from '../controller/bookController'

export const bookRouter=exp.Router()

bookRouter.get('/books',expressAsyncHandler(readAllBooks))
bookRouter.put('/edit-book/:id',expressAsyncHandler(editBook))