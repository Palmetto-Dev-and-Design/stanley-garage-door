"use client";

import dynamic from "next/dynamic";

// Leaflet touches `window` on import, so it can only render on the client.
const MapClient = dynamic(() => import("@/components/Map"), { ssr: false });

export default MapClient;
