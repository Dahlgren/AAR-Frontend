var path = require('path')

module.exports = {
  alias: {
    leaflet_css: path.join(__dirname, '..', 'node_modules', 'leaflet', 'dist', 'leaflet.css'),
    react_leaflet: path.join(__dirname, '..', 'node_modules', 'react-leaflet', 'src')
  },
  extensions: ['', '.js', '.jsx']
}
