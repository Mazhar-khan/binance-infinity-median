const express = require('express')
const WebSocket = require('ws')
const routes = require('../routes/api')
const { wsClients, medians } = require('../services/medianService')

const app = express()
app.use(express.json())
app.use('/', routes)

// Create HTTP server
const server = require('http').createServer(app)

// WebSocket server
const wss = new WebSocket.Server({ noServer: true })

wss.on('connection', (ws, request, pair) => {
  if (!wsClients[pair]) wsClients[pair] = new Set()
  wsClients[pair].add(ws)

  ws.on('close', () => {
    wsClients[pair].delete(ws)
  })
})

server.on('upgrade', (req, socket, head) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const match = url.pathname.match(/^\/median\/(.+)$/)

  if (match) {
    const pair = match[1]
    if (!medians[pair]) {
      socket.destroy()
      return
    }
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req, pair)
    })
  } else {
    socket.destroy()
  }
})

module.exports = { app, server }
