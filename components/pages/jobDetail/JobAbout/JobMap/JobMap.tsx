import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGetGeocodeQuery } from "@/lib/redux/services/geocodeApi";

const JobMap = ({
  city,
  companyLogo,
}: {
  city: string;
  companyLogo: string;
}) => {
  const { data } = useGetGeocodeQuery({ query: city });

  const customIcon = new L.Icon({
    iconUrl: companyLogo,
    iconSize: [40, 40],
    iconAnchor: [20, 41],
    popupAnchor: [1, -34],
    className: "rounded-full",
  });

  if (!data?.geo) return;

  const { lat, lon } = data?.geo;

  return (
    <div className="bg-[#f5f7fc] p-[30px] max-[992px]:p-5 rounded-lg">
      <h2 className="text-lg text-[#202124] font-medium mb-[18px]">
        Şirket Konumu
      </h2>

      <MapContainer
        center={[lat, lon]}
        zoom={13}
        style={{
          width: "100%",
          height: "250px",
          borderRadius: "8px",
          position: "relative",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
          zIndex={1}
        />

        <Marker position={[lat, lon]} icon={customIcon}>
          <Popup>
            <a
              href={`https://www.google.com/maps?q=${lat},${lon}`}
              rel="noopener noreferrer"
              target="_blank"
              className="text-blue-600 underline"
            >
              Konumu Google Maps&apos;te aç
            </a>
          </Popup>
        </Marker>

        <div className="bg-black/30 inset-0 absolute pointer-events-none z-[400]" />
      </MapContainer>
    </div>
  );
};

export default JobMap;
