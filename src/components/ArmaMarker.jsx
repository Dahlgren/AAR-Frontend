import { Icon, marker } from 'leaflet';
import { Marker } from 'react-leaflet';

export default class ArmaMarker extends Marker {
  componentWillMount() {
    super.componentWillMount();
    const { map, position } = this.props;
    this.leafletElement.setLatLng(map.unproject([position[0], position[1]], map.getMaxZoom()));
  }

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);

    if (this.props.position !== prevProps.position) {
      var map = this.props.map;
      var position = this.props.position;
      this.leafletElement.setLatLng(map.unproject([position[0], position[1]], map.getMaxZoom()));
    }
  }
}
