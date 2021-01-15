import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Doctors from "./Doctors";
// $hover ? "opacity-0" : ""
const Marker = ({ text, $hover }) => (
  <div className="">
    <img
      src="marker.png"
      style={{
        width: "25px",
        height: "25px",
        marginTop: "-12.5px",
        marginLeft: "-12.5px"
      }}
    ></img>
  </div>
);

export default function Map(props) {
  let defaultProps = {
    center: {
      lat: 51.814592,
      lng: 19.427627
    },
    zoom: 11
  };

  const [markers, setMarkers] = useState([]);

  const API_KEY = "AIzaSyA-m1LnokXGKOciNZcJmZgp5pv6VMx8HmE";

  const getCoordinatesFromAddress = async (street, city) => {
    let res = await fetch(
      `http://api.positionstack.com/v1/forward?access_key=32b8bb201771c5d907777dbf52b863f4&query=${street}%20${city}%20Poland`
    )
      .then(res => res.json())
      .then(response => {
        return {
          lat: response.data[0].latitude,
          lng: response.data[0].longitude
        };
      });
    return res;
  };
  const addMarker = (lat_, lng_, name) => {
    setMarkers([...markers, { lat: lat_, lng: lng_, name: name }]);
  };
  const MarkersList = () => {
    return markers.map((marker, id) => {
      return <Marker lat={marker.lat} lng={marker.lng} text={marker.name} />;
    });
  };
  const showOnMap = async () => {
    setMarkers([]);
    props.doctorsList.map(async doctor => {
      let coords = await getCoordinatesFromAddress(doctor.street, doctor.city);
      addMarker(coords.lat, coords.lng, "TEST");
      // console.log("done", coords.lat, coords.lng);
    });
  };
  useEffect(() => {
    showOnMap();
  }, [props.doctorsList]);
  return (
    <>
      {props.children}

      <div
        style={{
          height: "95%",
          width: "100%",
          position: "absolute",
          zIndex: "2"
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {markers.map(marker => {
            return (
              <Marker lat={marker.lat} lng={marker.lng} text={marker.name} />
            );
          })}
        </GoogleMapReact>
      </div>
    </>
  );
}
