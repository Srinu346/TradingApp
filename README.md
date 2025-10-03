# 📈 TradeX

A stock trading simulation platform with a fake market engine, live price fluctuations, and interactive portfolio management.

---

## ✨ Features
- ⚡ Real-time market engine generating price fluctuations with OHLC data  
- 📊 Interactive candlestick charts using `lightweight-charts`  
- 💼 Portfolio management with stock purchase and live holdings tracking  
- 🗄️ Prisma ORM with Express backend for users, holdings, transactions, and history  
- 🎨 Responsive UI built with Tailwind CSS for smooth trading experience  

---

## 🛠 Tech Stack
- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js, Prisma  
- **Database**: PostgreSQL  
- **Charts**: lightweight-charts  

---

## 📸 Screenshots
(Add screenshots or GIFs here, e.g. trading dashboard, charts, portfolio page)

---

## ⚡ Getting Started

### 1️⃣ Clone the repository
```
git clone https://github.com/Srinu346/TradeX.git
cd TradeX
```

### 2️⃣ Install dependencies
```
npm install
```


3️⃣ Setup environment variables

Create a .env file in the root directory:
```
DATABASE_URL=postgresql://user:password@localhost:5432/tradex
PORT=5000
```

4️⃣ Run database migrations
```
npx prisma migrate dev
```

5️⃣ Start the development server
```
npm run dev
``` 

## 🧩 Folder Structure
├── client/        # Frontend (React + Tailwind CSS)
├── server/        # Backend (Node.js + Express + Prisma)
├── prisma/        # Prisma schema & migrations
├── package.json
├── README.md

## 🎯 Roadmap

 Add stock selling feature

 Implement transaction history UI

 Introduce leaderboard & gamification

 Support multiple markets/sectors

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the issues page.

## 📜 License

Distributed under the MIT License. See LICENSE for more information.


## 👉 This way, when you paste it into your repo’s `README.md`, it’ll look **structured, clean, and professional**.  

Want me to also add **GitHub badges** (stars, forks, tech logos, license) at the very top to make it l
