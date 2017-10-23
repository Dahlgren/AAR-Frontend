var express = require('express')
var favicon = require('serve-favicon')
var path = require('path')
var app = express()

var staticPath = path.join(__dirname, 'build')

app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(express.static(staticPath))

app.get('/*', function (req, res) {
  res.sendFile('index.html', {
    root: staticPath
  })
})

app.listen(process.env.PORT || 8080, function (err) {
  if (err) { console.log(err) };
  console.log('Listening at localhost:8080')
})
