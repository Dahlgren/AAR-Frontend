import { divIcon } from 'leaflet';
import { Marker } from 'react-leaflet';

export default class RotationMarker extends Marker {
  componentWillMount() {
    this.props.icon = this.createIcon()

    super.componentWillMount();
    this.leafletElement.setRotationAngle(this.props.rotation);
    this.leafletElement.setRotationOrigin("center center");
  }

  componentDidUpdate(prevProps) {
    if (this.props.className !== prevProps.className || this.props.markerSize[0] !== prevProps.markerSize[0] || this.props.markerSize[1] !== prevProps.markerSize[1]) {
      this.props.icon = this.createIcon();
    } else {
      this.props.icon = prevProps.icon;
    }

    super.componentDidUpdate(prevProps);

    if (this.props.rotation !== prevProps.rotation) {
      this.leafletElement.setRotationAngle(this.props.rotation);
    }
  }

  createIcon() {
    return divIcon({
      className: this.props.className,
      iconSize: this.props.markerSize,
    })
  }
}
