const http = require('http')
const fs = require('fs')
const path = require('path')

const baseDir = '.'
const servedPaths = [ 'example', 'lib' ]
const rootDir = servedPaths[0]
const rootFile = 'index.html'
const port = 8125

http.createServer(function (request, response) {
    const requestedPathParts = request.url.split('/')
    if (!requestedPathParts[1]) {
        response.writeHead(301, { 'Location' : '/' + rootDir + '/' + rootFile })
        response.end()
        return
    }
    if (!servedPaths.includes(requestedPathParts[1])) {
        response.writeHead(403)
        response.end()
        return
    }
    const filePath = path.join(...[ baseDir, ...requestedPathParts ])
    const ext = String(path.extname(filePath)).toLowerCase()
    const contentType = mimeTypes[ext] || 'application/octet-stream'
    console.log('request', request.url, '<---', filePath, '[', contentType, ']')

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                response.writeHead(404)
                response.end()
            }
            else {
                response.writeHead(500)
                response.end()
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType })
            response.end(content, 'utf-8')
        }
    })
}).listen(port)

console.log('Server running at http://127.0.0.1:' + port)
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css'
}