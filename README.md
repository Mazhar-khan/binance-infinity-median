# Binance Infinity Median Service

A lightweight **Node.js + Express** service that streams real-time Binance trade data and calculates a continuous **Infinity Median** for selected trading pairs.

The **Infinity Median** represents the median price derived from **all received trade prices** for a given pair (not just a limited window).  
This makes it suitable for **real-time analytics, trading insights, and data-driven backends**.

---

## ✨ Features

- **Fetch Random Trade Pairs** → Selects 10 random trade pairs from Binance REST API.
- **Live Price Streaming** → Subscribes to Binance WebSocket stream for continuous price updates.
- **Infinity Median Calculation** → Maintains a running median per pair using a dual-heap approach (**O(log n)** per update).
- **REST APIs**
  - `GET /pairs` → Fetch random pairs & start streaming.
  - `GET /prices` → Latest price snapshot of tracked pairs.
  - `GET /medians` → Current median values for all pairs.
  - `GET /median/:pair` → Current median of a specific pair.
- **WebSocket Support**
  - Subscribe to `/median/:pair` → Get **live median updates** for that pair.
- **Scalable & Efficient** → Designed to handle high-frequency real-time trade streams.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/binance-infinity-median.git
cd binance-infinity-median
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file in the root directory:

```env
PORT=3000
```

> Default port is `3000`, but you can change it if required.

### 4. Run the Service
Start in **development mode** with auto-restart:
```bash
npm run dev
```

Or run in **production mode**:
```bash
node index.js
```

---

## 🧪 Testing the APIs

Once the server is running:

1. **Fetch 10 Random Pairs**  
   ```http
   GET http://localhost:3000/pairs
   ```

2. **Get Latest Prices**  
   ```http
   GET http://localhost:3000/prices
   ```

3. **Get All Medians**  
   ```http
   GET http://localhost:3000/medians
   ```

4. **Get Median for a Specific Pair**  
   ```http
   GET http://localhost:3000/median/BTCUSDT
   ```

5. **Subscribe via WebSocket**  
   Connect to:
   ```ws
   ws://localhost:3000/median/BTCUSDT
   ```
   → You’ll start receiving **live median updates** in JSON format.

---

## 📌 Notes

- Uses official Binance WebSocket stream:  
  `wss://stream.binance.com:9443/stream`
- Medians are **never reset** – they continuously evolve with incoming trades.
- Built with efficiency in mind: median calculation runs in **O(log n)** time.
- Ideal for real-time financial systems, trading dashboards, or backtesting tools.

---
