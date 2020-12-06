/* after changing this file run 'npm run webpack:build' */
import '../content/scss/vendor.scss';
import 'leaflet/dist/leaflet.js';
declare let L: { Icon: { Default: { prototype: { _getIconUrl: any; }; mergeOptions: (arg0: { iconRetinaUrl: any; iconUrl: any; shadowUrl: any; }) => void; }; }; };
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
