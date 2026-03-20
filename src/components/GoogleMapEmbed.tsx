"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "250px",
  borderRadius: "12px",
};

// Prashanthi Photo Studio, Nacharam, Hyderabad
const center = {
  lat: 17.4297,
  lng: 78.5562,
};

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function GoogleMapEmbed() {
  // If no API key configured, fall back to an iframe embed
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.015607444468!2d78.51327847431642!3d17.429681499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9958a2aa1617%3A0x9e1bc939c9725836!2sPrashanthi%20Photo%20Studio!5e0!3m2!1sen!2sin!4v1774000969899!5m2!1sen!2sin"
        width="100%"
        height="250"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Prashanthi Studio Location"
      />
    );
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        <Marker
          position={center}
          title="Prashanthi Digital Studio"
        />
      </GoogleMap>
    </LoadScript>
  );
}
