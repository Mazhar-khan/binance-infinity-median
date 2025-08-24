const express = require('express')
const router = express.Router()
const { fetchPairs, latestPrices, medians } = require('../services/medianService')

// get pairs
router.get('/pairs', async (req, res) => {
  try {
    await fetchPairs(req, res)
  } catch (err) {
    console.error('[API] Error in /pairs:', err.message)
    res.status(500).json({ error: 'Failed to fetch trade pairs' })
  }
})

// get prices
router.get('/prices', (req, res) => {
  try {
    res.json(latestPrices)
  } catch (err) {
    console.error('[API] Error in /prices:', err.message)
    res.status(500).json({ error: 'Failed to fetch latest prices' })
  }
})

// get medians
router.get('/medians', (req, res) => {
  try {
    const result = {}
    for (const pair in medians) {
      result[pair] = medians[pair]?.getMedian() || null
    }
    res.json(result)
  } catch (err) {
    console.error('[API] Error in /medians:', err.message)
    res.status(500).json({ error: 'Failed to fetch medians' })
  }
})

// get median pair
router.get('/median/:pair', (req, res) => {
  try {
    const { pair } = req.params
    if (!medians[pair]) {
      return res.status(404).json({ error: `Pair ${pair} not tracked` })
    }
    res.json({ pair, median: medians[pair].getMedian() })
  } catch (err) {
    console.error(`[API] Error in /median/${req.params.pair}:`, err.message)
    res.status(500).json({ error: 'Failed to fetch median for this pair' })
  }
})

// root 
router.get('/', (req, res) => {
  try {
    res.send('Hello World!')
  } catch (err) {
    console.error('[API] Error in /:', err.message)
    res.status(500).json({ error: 'Unexpected server error' })
  }
})

module.exports = router
