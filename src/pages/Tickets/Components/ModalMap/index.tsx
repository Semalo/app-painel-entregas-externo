import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface IProps {
  LAT: string;
  LONG: string;
  toggleMap: () => void;
}

export default function ModalMop({ LAT, LONG, toggleMap }: IProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    toggleMap();
  };

  const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  useEffect(() => {
    if (LAT !== "" && LONG !== "") setShow(true);
  }, [LAT, LONG]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Localização</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{
              width: "400px",
              height: "400px",
            }}
            center={{
              lat: parseFloat(LAT),
              lng: parseFloat(LONG),
            }}
            zoom={15}
          >
            <Marker
              position={{
                lat: parseFloat(LAT),
                lng: parseFloat(LONG),
              }}
            />
          </GoogleMap>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
