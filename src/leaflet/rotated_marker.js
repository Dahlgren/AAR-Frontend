import L from 'leaflet'

// save these original methods before they are overwritten
var protoInitIcon = L.Marker.prototype._initIcon
var protoSetPos = L.Marker.prototype._setPos

var oldIE = (L.DomUtil.TRANSFORM === 'msTransform')

L.Marker.addInitHook(function () {
  var iconOptions = this.options.icon && this.options.icon.options
  var iconAnchor = iconOptions && this.options.icon.options.iconAnchor
  if (iconAnchor) {
    iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px')
  }
  this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom'
  this.options.rotationAngle = this.options.rotationAngle || 0
})

L.Marker.include({
  _initIcon: function () {
    protoInitIcon.call(this)
  },

  _setPos: function (pos) {
    protoSetPos.call(this, pos)
    this._applyRotation()
  },

  _applyRotation: function () {
    if (this.options.rotationAngle) {
      this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin

      if (oldIE) {
                // for IE 9, use the 2D rotation
        this._icon.style[L.DomUtil.TRANSFORM] = 'rotate(' + this.options.rotationAngle + 'deg)'
      } else {
                // for modern browsers, prefer the 3D accelerated version
        this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)'
      }
    }
  },

  setRotationAngle: function (angle) {
    this.options.rotationAngle = angle
    this.update()
    return this
  },

  setRotationOrigin: function (origin) {
    this.options.rotationOrigin = origin
    this.update()
    return this
  }
})
