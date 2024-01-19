import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';

const ConstituencyHeatmap = () => {
  useEffect(() => {
    // Cleanup function
    return () => {
      // Optional: You can clean up resources when the component unmounts
    };
  }, []);

  const heatmapData = [
    [27.045, 88.2623],
    [38.2813, 91.2388],
    [27.102, 88.0111],
    [-5.8869, 77.0114],
    [25.7833, 81.8667],
  ];

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Data by © <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
      />
      <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={heatmapData}
        longitudeExtractor={(point) => point[1]}
        latitudeExtractor={(point) => point[0]}
        intensityExtractor={() => 1}
      />
    </MapContainer>
  );
};

export default ConstituencyHeatmap;
