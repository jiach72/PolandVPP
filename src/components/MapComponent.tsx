'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useTranslations } from 'next-intl';
import HeatmapLayer from '@/components/HeatmapLayer';

const PolishAssets = [
    { id: '1', name: 'PV Warsaw South', type: 'Solar', lat: 52.2297, lng: 21.0122, output: '15 MW', status: 'Online' },
    { id: '2', name: 'Wind Farm Kraków', type: 'Wind', lat: 50.0647, lng: 19.9450, output: '42 MW', status: 'Online' },
    { id: '3', name: 'BESS Gdańsk', type: 'Battery', lat: 54.3520, lng: 18.6466, output: '10 MW', status: 'Online' },
    { id: '4', name: 'Poznań Industrial', type: 'Load', lat: 52.4064, lng: 16.9252, output: '-5 MW', status: 'Online' },
    { id: '5', name: 'Wrocław CHP', type: 'CHP', lat: 51.1079, lng: 17.0385, output: '25 MW', status: 'Online' },
    { id: '6', name: 'EV Hub Łódź', type: 'EV', lat: 51.7592, lng: 19.4560, output: '-2 MW', status: 'Active' },
    { id: '7', name: 'Solar Park Lublin', type: 'Solar', lat: 51.2465, lng: 22.5684, output: '8 MW', status: 'Online' },
    { id: '8', name: 'BESS Szczecin', type: 'Battery', lat: 53.4285, lng: 14.5528, output: '12 MW', status: 'Standby' }
];

// Generate mock heatmap points focused around major cities to simulate load density
const heatmapPoints: [number, number, number][] = [
    [52.2297, 21.0122, 1.0], // Warsaw (High load)
    [52.2297, 21.0222, 0.8],
    [52.2197, 21.0122, 0.9],
    [50.0647, 19.9450, 0.9], // Kraków
    [50.0547, 19.9550, 0.7],
    [51.1079, 17.0385, 0.8], // Wrocław
    [52.4064, 16.9252, 0.7], // Poznań
    [54.3520, 18.6466, 0.8], // Gdańsk
    [51.7592, 19.4560, 0.6], // Łódź
    [53.4285, 14.5528, 0.5], // Szczecin
    [50.2649, 19.0238, 0.9], // Katowice (Industrial)
    [50.2549, 19.0338, 0.8],
];

export default function MapComponent() {
    const t = useTranslations('dashboard');

    return (
        <div className="h-full w-full rounded-lg overflow-hidden relative z-0">
            <MapContainer
                center={[52.0693, 19.4803]}
                zoom={6}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="map-tiles filter invert brightness-90 contrast-125 grayscale" // Dark mode map style
                />
                <HeatmapLayer points={heatmapPoints} />
                {PolishAssets.map((asset) => (
                    <Marker
                        key={asset.id}
                        position={[asset.lat, asset.lng]}
                    >
                        <Popup className="custom-popup">
                            <div className="p-2">
                                <h3 className="font-bold text-slate-900">{asset.name}</h3>
                                <div className="text-sm text-slate-600 mt-1">
                                    <p>Type: <span className="font-medium">{asset.type}</span></p>
                                    <p>Output: <span className="font-medium text-blue-600">{asset.output}</span></p>
                                    <p>Status: <span className={`font-medium ${asset.status === 'Online' ? 'text-green-600' : 'text-amber-600'}`}>
                                        {asset.status}
                                    </span></p>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Legend Overlay */}
            <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur border border-slate-700 p-3 rounded-lg z-[1000] text-xs shadow-xl">
                <p className="font-bold text-slate-300 mb-2">Map Layers</p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-slate-400">Assets</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 opacity-70"></div>
                        <span className="text-slate-400">Load Intensity</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
