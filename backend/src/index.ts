import express from "express";
import dotenv from "dotenv"
import router from "./routes/authRoutes";
import routerMarketNews from "./routes/marketNews";
import cors from "cors";
import transRouter from "./routes/transaction";
import stockRoutes from "./routes/stockRoutes";
import purchaseRouter from "./routes/purchaseRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/auth',router);
app.use('/api',routerMarketNews);
app.use('/api',transRouter);
app.use('/api',stockRoutes);
app.use('/api',purchaseRouter)

app.listen(PORT,()=>{
    console.log("Server Listening ON ");
})