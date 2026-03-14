import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLazyGetGeocodeQuery } from "@/features/job-detail/components/JobAbout/JobMap/geocodeApi";
import { useEffect, useMemo } from "react";

const JobMap = ({
  city,
  companyLogo,
}: {
  city: string;
  companyLogo: string;
}) => {
  const [trigger, { data }] = useLazyGetGeocodeQuery();

  useEffect(() => {
    if (city) {
      trigger({ query: city });
    }
  }, [city, trigger]);

  const customIcon = useMemo(() => {
    return new L.Icon({
      iconUrl:
        companyLogo ??
        "https://res.cloudinary.com/dvolwkh6r/image/upload/v1769207955/company_utxzmj.webp",
      iconSize: [40, 40],
      iconAnchor: [20, 41],
      popupAnchor: [1, -34],
      className: "rounded-full",
    });
  }, [companyLogo]);

  if (!data?.geo) return null;

  const { lat, lon } = data.geo;

  return (
    <div className="mt-12.5 max-[1200px]:mt-6.25">
      <h2 className="text-lg text-[#202124] font-medium mb-4.5">
        Şirket Konumu
      </h2>

      <MapContainer
        center={[lat, lon]}
        zoom={13}
        className="h-100 max-[1200px]:h-62.5 w-full relative"
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

        <div className="bg-black/30 inset-0 absolute pointer-events-none z-400" />
      </MapContainer>
    </div>
  );
};

export default JobMap;
