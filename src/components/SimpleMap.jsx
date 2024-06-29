"use client";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect } from "react";


const SimpleMap = ({center,setCenter}) => {

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    border:"1px solid gray",
    borderRadius:"15px",
    overflow:"hidden",
    boxShadow:"0px 0px 10px 1px #0002"
  };

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     if (position) {
  //       setCenter({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       });
  //     }
  //   });
  // }, []);


  return (
    <div>
      <LoadScript
        libraries={["places"]}
        googleMapsApiKey="AIzaSyDa9wzMFWk03neKgcOmteJBKu6yjv-uE-w"
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
        >
          <MarkerF
            position={center}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default SimpleMap;