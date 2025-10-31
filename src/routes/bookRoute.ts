import exp from 'express'
import expressAsyncHandler from 'express-async-handler'
import { readAllBooks,editBook, deleteBook, readOneBook, createBook } from '../controller/bookController'

export const bookRouter=exp.Router()

bookRouter.get('/books',expressAsyncHandler(readAllBooks))
bookRouter.put('/edit-book/:id',expressAsyncHandler(editBook))
bookRouter.delete('/delete/:id',expressAsyncHandler(deleteBook))
bookRouter.get('/get-book/:id',expressAsyncHandler(readOneBook))
bookRouter.post('/create-book',expressAsyncHandler(createBook))