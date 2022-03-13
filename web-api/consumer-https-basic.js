#!/usr/bin/env node

// npm install fastify@3.2 node-fetch@2.6
const server = require('fastify')()
const fetch = require('node-fetch')
const https = require('https')
const fs = require('fs')
const path = require('path')
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000
const TARGET = process.env.TARGET || 'localhost:4000'

const options = {
  agent: new https.Agent({
    ca: fs.readFileSync(path.join(__dirname, '/../shared/tls/ca-certificate.cert'))
  })
}
server.get('/', async () => {
  const req = await fetch(`https://${TARGET}/recipes/42`, options)
  const payload = await req.json()
  
  const consumerPid = process.pid
  return {
    consumer_pid: consumerPid,
    producer_data: payload
  }
})

server.listen(PORT, HOST, () => {
  console.log(`Consumer running at https://${HOST}:${PORT}/`)
})
