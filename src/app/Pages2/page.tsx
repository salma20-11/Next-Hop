'use client'

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RootLayout, { metadata } from '@/app/layout';
import { useRouter } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngLiteral, Map, Polyline } from 'leaflet';

const Page: React.FC = () => {
  const router = useRouter();
  const [bus, setBusInfo] = useState<any>(null);
  const [position, setPosition] = useState<LatLngLiteral | null>(null);
  const [busStops, setBusStops] = useState<LatLngLiteral[]>([]);
  const mapRef = useRef<Map>(null);
  const polylineRef = useRef<Polyline | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    // Get the values
    const busInfoString = queryParams.get('busInfo');
    if (busInfoString) {
      try {
        const busInfoObject = JSON.parse(busInfoString);
        setBusInfo(busInfoObject);
      } catch (error) {
        console.error('Error parsing busInfo:', error);
      }
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });

        // Exemple fictif d'arrêts de bus
        const fakeBusStops = [
          { lat: latitude + 0.01, lng: longitude + 0.01 },
          { lat: latitude - 0.02, lng: longitude + 0.02 },
          { lat: latitude + 0.03, lng: longitude - 0.03 },
        ];

        setBusStops(fakeBusStops);
      },
      (err) => console.error(err)
    );
  }, []);

  const handleGetDirections = async (busStop: LatLngLiteral) => {
    if (!busStop || !position || !mapRef.current) {
      return;
    }

    const openRouteServiceApiKey = '5b3ce3597851110001cf6248c468f751572043f291a82e8a06caf577';
    const endpoint = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${openRouteServiceApiKey}&start=${position.lng},${position.lat}&end=${busStop.lng},${busStop.lat}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      const route = data.features[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]);
      const map = mapRef.current;

      // Supprimez la ligne précédente s'il y en a une
      if (polylineRef.current) {
        map?.removeLayer(polylineRef.current);
      }

      // Tracez la nouvelle ligne
      const polyline = new Polyline(route, { color: 'blue' });
      polyline.addTo(map);

      // Stockez la référence à la nouvelle ligne
      polylineRef.current = polyline;
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  const MapComponent: React.FC = () => {
    const map = useMap();
    if (position) {
      map.setView(position, 13);
    }
    return null;
  };

  // Définissez votre icône personnalisée pour "You are here"
  const yourHereIcon = new L.Icon({
    iconUrl: '/placeholder.png', // Assurez-vous que le chemin d'accès est correct
    iconSize: [32, 32],
  });

  // Définissez votre icône personnalisée pour les arrêts de bus
  const busStopIcon = new L.Icon({
    iconUrl: '/bus.png', // Assurez-vous que le chemin d'accès est correct
    iconSize: [32, 32],
  });

  const pageStyle = {
    backgroundImage: 'url("/bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <main style={pageStyle} className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{ width: 60 }} className="logo">
        <Image src="/logoo.png" alt="back" width={80} height={80} />
      </div>
      <div className="BusForYou">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <Image src="/autobus.png" alt="Bus Image" width={40} height={40} />
          <div style={{ width: 350 }} className="BusForYou-text">
            {bus ? ` Bus nunmero : ${bus.nbr}, Places vacantes: ${bus.places_vacantes} ` : 'Loading...'}
          </div>
        </div>
      </div>


      <div>
     
        {position && (
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: '300px', width: '400px' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Marqueur "You are here" avec icône personnalisée */}
            <Marker position={position} icon={yourHereIcon}>
              <Popup>You are here!</Popup>
            </Marker>
            {/* Ajoutez les marqueurs pour les arrêts de bus ici */}
            {busStops.map((busStop, index) => (
              <Marker
                key={index}
                position={busStop}
                icon={busStopIcon}
                eventHandlers={{
                  click: () => handleGetDirections(busStop),
                }}
              >
                <Popup>Bus Stop {index + 1}</Popup>
              </Marker>
            ))}
            {/* Utilisez MapComponent pour définir la vue */}
            <MapComponent />
          </MapContainer>
        )}
      </div>


      <div style={{ width: 30 }} className="Button">
        <div style={{ width: 350, }} className="Button-text">
          <Link href="./">
            <Image src="/direction-gauche.png" alt="back" width={40} height={40} />Home
          </Link>
        </div>
      </div>

 
    </main>
  );
};

export default Page;
