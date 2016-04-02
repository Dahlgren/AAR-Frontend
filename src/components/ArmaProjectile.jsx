import { polyline } from 'leaflet';
import { Path } from 'react-leaflet';

export default class ArmaProjectile extends Path {
  componentWillMount() {
    super.componentWillMount();
    const { map, polylines } = this.props;
    this.leafletElement = polyline(polylines.map(function (polyline) {
      return map.unproject([polyline.x, polyline.y], map.getMaxZoom())
    }), this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.polylines !== prevProps.polylines) {
      const { map, polylines } = this.props;

      this.leafletElement.setLatLngs(this.props.polylines.map(function (polyline) {
        return map.unproject([polyline.x, polyline.y], map.getMaxZoom())
      }));
    }
    this.setStyleIfChanged(prevProps, this.props);
  }
}
