import { divIcon } from 'leaflet';
import { Marker } from 'react-leaflet';

export default class RotationMarker extends Marker {
  componentWillMount() {
    super.componentWillMount();
    
    this.leafletElement.setIcon(this.createIcon());
    this.leafletElement.setRotationAngle(this.props.rotation);
    this.leafletElement.setRotationOrigin("center center");
  }

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);

    const classNameChanged = this.props.className !== prevProps.className;
    const markerSizeChanged  = this.props.markerSize[0] !== prevProps.markerSize[0] || this.props.markerSize[1] !== prevProps.markerSize[1];
    const rotationChanged = this.props.rotation !== prevProps.rotation;

    if (classNameChanged || markerSizeChanged) {
      this.leafletElement.setIcon(this.createIcon());
    }

    if (rotationChanged) {
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
