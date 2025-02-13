import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const navigate = useNavigate();
  const { lat, lon } = useParams(); // Get lat/lon from URL

  const [location, setLocation] = useState(lat && lon ? [parseFloat(lat), parseFloat(lon)] : [28.7041, 77.1025]); // Default: Delhi
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch search suggestions
  const fetchSuggestions = async (query) => {
    if (query.length < 3) return; // Minimum 3 characters to search
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    try {
      const response = await axios.get(url);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle selection & update URL
  const handleSelect = (lat, lon) => {
    setLocation([parseFloat(lat), parseFloat(lon)]); // Update state
    setSuggestions([]); // Clear dropdown
    setSearch(""); // Clear input
    navigate(`/map/${lat}/${lon}`); // Redirect with new coordinates
  };

  return (
    <div>
      {/* Search Box */}
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        placeholder="Search location..."
        style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul style={{ background: "white", border: "1px solid #ccc", padding: "10px", listStyle: "none", width: "300px" }}>
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item.lat, item.lon)}
              style={{ cursor: "pointer", padding: "5px 0" }}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}

      {/* Map */}
      <MapContainer center={location} zoom={10} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={location}>
          <Popup>Selected Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
