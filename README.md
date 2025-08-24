````markdown
# Binance Infinity Median Service

This project is a small Node.js + Express service built around Binance trade pairs.  
It continuously streams live trade prices from Binance and maintains an **“Infinity Median”**  
for each selected trade pair. The infinity median means: the median price calculated from  
**all prices received so far** for that pair (not just the last N).

---

## Features

- **Fetch Trade Pairs**: Selects 10 random trade pairs from Binance.
- **Stream Prices**: Continuously fetches live trade prices in real time using Binance WebSocket.
- **Infinity Median**: Maintains a running median for each trade pair.
- **REST APIs**:
  - `GET /pairs` → Fetch random pairs and start streaming.
  - `GET /prices` → Get latest prices for tracked pairs.
  - `GET /medians` → Get all medians for tracked pairs.
  - `GET /median/:pair` → Get current median for a specific pair.
- **WebSocket**:
  - Subscribe to `/median/:pair` to receive live median updates for that pair.
- **Efficiency**: Median calculation implemented with a dual-heap approach in **O(log n)** time per update.

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/binance-infinity-median.git
cd binance-infinity-median
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
```

(You can change the port as needed.)

### 4. Run the Service

Start with nodemon (recommended during development):

```bash
npm run dev
```

Or run normally:

```bash
node index.js
```

---

## Testing the Service

1. **Fetch Random Pairs**
   Open in browser or use Postman:

   ```
   http://localhost:3000/pairs
   ```

2. **Check Latest Prices**

   ```
   http://localhost:3000/prices
   ```

3. **Check All Medians**

   ```
   http://localhost:3000/medians
   ```

4. **Check Median for a Specific Pair**

   ```
   http://localhost:3000/median/BTCUSDT
   ```

5. **WebSocket Subscription**
   Connect to:

   ```
   ws://localhost:3000/median/BTCUSDT
   ```

   You will receive live median updates whenever a new trade price is streamed.

---

## Notes

* This service uses the official Binance WebSocket stream:
  `wss://stream.binance.com:9443/stream`
* Median is calculated continuously without resetting.
* The system is efficient enough to handle real-time streams.



