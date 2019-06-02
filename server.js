var express = require('express')
var fs = require('fs')
var favicon = require('serve-favicon')
var path = require('path')
var app = express()

var staticPath = path.join(__dirname, 'build')
var indexPath = path.join(staticPath, 'index.html')
var indexFile = fs.readFileSync(indexPath, { encoding: 'utf-8' })

var aarApiUrl = process.env.AAR_API_URL
if (aarApiUrl) {
  indexFile = indexFile.replace('AAR_API_URL = undefined', 'AAR_API_URL = \'' + aarApiUrl + '\'')
}

var worldsApiUrl = process.env.WORLDS_API_URL
if (worldsApiUrl) {
  indexFile = indexFile.replace('WORLDS_API_URL = undefined', 'WORLDS_API_URL = \'' + worldsApiUrl + '\'')
}

app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(express.static(staticPath))

app.get('/*', function (req, res) {
  res.send(indexFile)
})

app.listen(process.env.PORT || 8080, function (err) {
  if (err) { console.log(err) };
  console.log('Listening at localhost:8080')
})
