import { Response,Request,NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWTSECRETKEY||"hello";

export function AuthMiddleWare(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["token"];

    console.log(token);

    if (!token) {
        return res.status(401).json({message:"Invalid Token"});
    }

    //@ts-ignore
    const tokenVerification = jwt.verify(token, secret);

    if(tokenVerification){
        next();
    }
    else{
        res.status(401).json({message:"Session Expires Login Again"})
    }
}