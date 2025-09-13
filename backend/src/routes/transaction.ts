import { Router } from "express";
import prisma from "../db/prisma";

const transRouter = Router();

transRouter.post('/addBalance',async (req,res)=>{
    const {amount , username} = req.body;
    // const username = localStorage.getItem('username');
    if(!username){
        return res.send({message:"Please Login First",success:"fail"});
    }
    const response = await prisma.user.update({
        where:{username},
        data:{balance:{increment:parseFloat(amount)}}
    });

    if(!response){
        return res.status(401).send("No User Found");
    }

    return res.json({message:"Balance Updated Successfully",success:true});
})

transRouter.post('/withdrawBalance',async (req,res)=>{
    const {amount , username} = req.body;
    // const username = localStorage.getItem('username');
    if(!username){
        return res.send({message:"Please Login First",success:"fail"});
    }
    const response = await prisma.user.update({
        where:{username},
        data:{balance:{decrement:parseFloat(amount)}}
    });

    if(!response){
        return res.status(401).send("No User Found");
    }

    return res.json({message:"Balance Updated Successfully",success:true});
})

transRouter.post('/getBalance',async(req,res)=>{
    const { username} = req.body;
    // const username = localStorage.getItem('username');
    if(!username){
        return res.send({message:"Please Login First",success:"fail"});
    }
    const response = await prisma.user.findUnique({
        where:{username},
    });

    if(!response){
        return res.status(401).send("No User Found");
    }

    return res.json({message:"Balance Fetched Successfully",balance:response.balance,success:true});
})

export default transRouter;