const WebSocket = require('ws')

function startPriceStream(pairs, latestPrices, medians, wsClients) {
  if (!pairs || pairs.length === 0) return

  const streams = pairs.map(p => p.toLowerCase() + '@trade').join('/')
  const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`)

  ws.on('open', () => {
    console.log('Connected to Binance WebSocket for pairs:', pairs)
  })

  ws.on('message', (msg) => {
    const data = JSON.parse(msg)
    const symbol = data.data.s
    const price = parseFloat(data.data.p)

    latestPrices[symbol] = price
    medians[symbol].add(price)

    const median = medians[symbol].getMedian()
    console.log(`Price update - ${symbol}: ${price}, Median: ${median}`)

    for (const client of wsClients[symbol]) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ pair: symbol, median }))
      }
    }
  })

  ws.on('error', (err) => console.error('WebSocket error:', err))
  ws.on('close', () => {
    console.log('WebSocket closed. Reconnecting...')
    startPriceStream(pairs, latestPrices, medians, wsClients)
  })
}

module.exports = { startPriceStream }
