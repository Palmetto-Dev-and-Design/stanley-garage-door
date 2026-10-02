"use client";

import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ZOOM = 10;

// Largest breakpoint first; match Tailwind's `md`, `lg` and `xl` breakpoints.
const BREAKPOINT_ZOOMS = [
  { query: "(min-width: 80rem)", zoom: 11 }, // xl: wide half-width map
  { query: "(min-width: 64rem)", zoom: ZOOM }, // lg: map is half the page width
  { query: "(min-width: 48rem)", zoom: 11 }, // md: full-width map
];

const ResponsiveZoom = () => {
  const map = useMap();

  useEffect(() => {
    const mqls = BREAKPOINT_ZOOMS.map(({ query, zoom }) => ({
      mql: window.matchMedia(query),
      zoom,
    }));
    const update = () =>
      map.setZoom(mqls.find(({ mql }) => mql.matches)?.zoom ?? ZOOM);

    update();
    for (const { mql } of mqls) mql.addEventListener("change", update);
    return () => {
      for (const { mql } of mqls) mql.removeEventListener("change", update);
    };
  }, [map]);

  return null;
};

type MapSectionProps = {
  className?: string;
};

const MapSection = ({ className }: MapSectionProps) => {
  const position: [number, number] = [27.7676, -82.6403];

  return (
    <MapContainer
      center={position}
      zoom={ZOOM}
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
      className={cn("z-0 w-full", className)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <ResponsiveZoom />
    </MapContainer>
  );
};

export default MapSection;
