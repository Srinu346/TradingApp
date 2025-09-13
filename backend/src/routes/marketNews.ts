import { Router } from "express";
import { get } from "http";
// @ts-ignore
const routerMarketNews = Router();

// GET /marketNews
routerMarketNews.get("/marketNews", async (req, res) => {
  try {
    const response = await fetch("https://newsdata.io/api/1/latest?apikey=pub_b4071da69dab48c08894fdb9cbb241ca&q=nse",{
        method:"GET"
    });

    const news = await response.json();

    res.json(news);

  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default routerMarketNews;
