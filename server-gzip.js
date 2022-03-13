#!/usr/bin/env node

// Adapted from https://nodejs.org/api/zlib.html
// Warning: Not as efficient as using a Reverse Proxy
const zlib = require('zlib')
const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
	const raw = fs.createReadStream(path.join(__dirname, '/index.html'))
	const acceptEncoding = req.headers['accept-encoding'] || ''
	res.setHeader('Content-Type', 'text-plain')
	console.log(acceptEncoding);
	
	if(acceptEncoding.includes('gzip')) {
		console.log('encoding with gzip');
		res.setHeader('Content-Encoding', 'gzip')
		raw.pipe(zlib.createGzip()).pipe(res)
	} else {
		console.log('no-encoding');
		raw.pipe(res)
	}
}).listen(process.env.PORT || 1337)
