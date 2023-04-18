import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface IProps {
  imageUrl: string;
  setImageUrl: (value: string) => void;
}

export default function ModalImage({ imageUrl, setImageUrl }: IProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setImageUrl("");
    setShow(false);
  };

  useEffect(() => {
    if (imageUrl !== "") setShow(true);
  }, [imageUrl]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Foto</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{ width: "400px", height: "400px" }}
          src={imageUrl}
          alt="imagem"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
