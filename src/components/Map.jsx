"use client";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

const Map = ({center,setCenter}) => {
  

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    border:"1px solid gray",
    borderRadius:"15px",
    overflow:"hidden",
    boxShadow:"0px 0px 10px 1px #0002"
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      } 
    });
  }, []);

  const [searchResult, setSearchResult] = useState("Result: none");

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      alert("Please enter text");
    }
  }

  return (
    <div>
      <LoadScript
        libraries={["places"]}
        googleMapsApiKey="AIzaSyCURVZDeDimYplXjBBebgYu-FepsYycJjc"
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className="relative mb-4">
          <input
            id="location"
            className="block placeholder:opacity-0 focus:placeholder:opacity-100 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
            type="text"
          />
          <label
            className="absolute rounded-md bg-white text-sm text-gray-500  duration-300 transform -translate-y-4 scale-[0.85] top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-priborder-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.85] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            htmlFor="location"
          >
            Search Location
          </label>
          </div>
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
        >
          <Marker
            draggable={true}
            onDragEnd={(e) => {
              setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            }}
            position={center}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;