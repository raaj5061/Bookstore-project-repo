import {Request,Response,NextFunction} from 'express'
import {verify} from 'jsonwebtoken'
export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    let token=req.cookies['token']
    if(!token){
        res.status(401).json({message:"UNAUTHORISED ACCESS"})
    }
    else{
        try{
            let check=verify(token,process.env['SECRET']!);
            console.log(check); //{user:userData,int,exat}
            (req as any).user =(check as any).user
            next()
        }catch(err){
            console.log("the error is ",err)
            res.status(401).json({message:"Invalid token"})
        }
    }
    
}