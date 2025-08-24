const { MedianHeap } = require('../utils/heaps')
const { getRandomPairs } = require('../utils/helpers')
const { startPriceStream } = require('./binanceService')

let selectedPairs = []
let latestPrices = {}
let medians = {}
let wsClients = {}

async function fetchPairs(req, res) {
  try {
    const response = await fetch('https://api.binance.com/api/v3/ticker/price')
    const data = await response.json()

    const symbols = data.map(item => item.symbol)
    selectedPairs = getRandomPairs(symbols, 10)

    selectedPairs.forEach(pair => {
      medians[pair] = new MedianHeap()
      wsClients[pair] = new Set()
    })

    startPriceStream(selectedPairs, latestPrices, medians, wsClients)

    res.json({ selectedPairs })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch pairs' })
  }
}

module.exports = { fetchPairs, latestPrices, medians, wsClients }
