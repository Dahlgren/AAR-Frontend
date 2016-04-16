import { Marker } from 'react-leaflet';

export default class RotationMarker extends Marker {
  componentWillMount() {
    super.componentWillMount();
    this.leafletElement.setRotationAngle(this.props.rotation);
    this.leafletElement.setRotationOrigin("center center");
  }

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);

    if (this.props.rotation !== prevProps.rotation) {
      this.leafletElement.setRotationAngle(this.props.rotation);
    }
  }
}
