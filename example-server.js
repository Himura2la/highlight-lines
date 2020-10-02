const http = require('http')
const fs = require('fs')
const path = require('path')

const baseDir = '.'
const servedPaths = [ 'example', 'lib' ]
const rootDir = servedPaths[0]
const rootFile = 'index.html'

http.createServer(function (request, response) {
    const requestedPathParts = request.url.split('/')
    const filePath = !requestedPathParts[1]                      ? path.join(baseDir, rootDir, rootFile)
                   : servedPaths.includes(requestedPathParts[1]) ? path.join(...[baseDir, ...requestedPathParts])
                                                                 : path.join(...[baseDir, rootDir, ...requestedPathParts])
    const ext = String(path.extname(filePath)).toLowerCase()
    const contentType = mimeTypes[ext] || 'application/octet-stream'
    console.log('request', request.url, '<---', filePath, '[', contentType, ']')

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                response.writeHead(404)
                response.end(content, 'utf-8')
            }
            else {
                response.writeHead(500)
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n')
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType })
            response.end(content, 'utf-8')
        }
    })
}).listen(8125)

console.log('Server running at http://127.0.0.1:8125/')
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css'
}