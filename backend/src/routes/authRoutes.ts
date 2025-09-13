import e, { Router } from "express";
import prisma from "../db/prisma";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import { AuthMiddleWare } from "../middleware/authMiddleware";

const router = Router();
const jwt = jsonwebtoken;
const secret = process.env.JWTSECRETKEY || "hello";

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password , firstName , lastName } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    else
    {
      const hashedPassword = bcrypt.hashSync(password,5);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password:hashedPassword,
        firstName,
        lastName
      },
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/signin", async (req,res)=>{
  const {username,password} = req.body;

  const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if(!existingUser){
      res.redirect("/signup");
    }

  const hashedPassword = existingUser?.password;
  if (!hashedPassword) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  const passwordMatch = bcrypt.compareSync(password, hashedPassword);

  if(passwordMatch){
    const token = jwt.sign({
      data:username
    },secret);

    console.log(secret);
    res.status(200).json({token,username});
  }
  else{
    res.status(500).send("Login Failed");
  }
})

router.get("/check",AuthMiddleWare,(req,res)=>{
  res.json({message:"Middleware is working!!!"});
})
export default router;
