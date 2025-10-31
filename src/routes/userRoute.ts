import exp from 'express'
import expressAsyncHandler from 'express-async-handler';
import { createNewUser,login, logout ,readOneUser,editUser} from '../controller/userController';

export const userRoute=exp.Router();

userRoute.post("/register",expressAsyncHandler(createNewUser))
userRoute.post("/user-login",expressAsyncHandler(login))
userRoute.get('/user-logout',expressAsyncHandler(logout))
userRoute.get('/user/:id',expressAsyncHandler(readOneUser))
userRoute.put('/edit-user/:id',expressAsyncHandler(editUser))