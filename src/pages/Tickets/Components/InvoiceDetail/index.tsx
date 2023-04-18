import React, { useState } from "react";
import { MdMap } from "react-icons/md";
import { IEvent, IImage } from "../../interfaces";
import ModalImage from "../ModalImage";
import ModalMop from "../ModalMap";

interface IProps {
  data: IEvent[];
  photoData: IImage[];
}

export default function InvoiceDetail({ data, photoData }: IProps) {
  const [position, setPosition] = useState({
    LAT: "",
    LONG: "",
  });

  const [imageUrlModal, setImageUrlModal] = useState("");

  const toggleMap = () => {
    setPosition({
      LAT: "",
      LONG: "",
    });
  };

  console.log("---->", photoData);

  return (
    <>
      <ModalMop LAT={position.LAT} LONG={position.LONG} toggleMap={toggleMap} />
      <ModalImage imageUrl={imageUrlModal} setImageUrl={setImageUrlModal} />

      <div>
        {data &&
          data?.map((eventData, idx) => (
            <div style={{ display: "flex" }}>
              <div style={{ verticalAlign: "middle" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                  }}
                >
                  <h5>Ocorrência: </h5>
                  {eventData?.eventCategory?.OPCAO}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                  }}
                >
                  <h5>Descrição:</h5>
                  {eventData?.DESCRICAO}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                  }}
                >
                  <h5>Localização: </h5>
                  <p>Lat: {eventData?.LAT}</p>
                  <p>Long: {eventData?.LONG}</p>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setPosition({
                        LAT: eventData?.LAT,
                        LONG: eventData?.LONG,
                      })
                    }
                  >
                    <MdMap size={26} color={"#DD5400"} />
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div style={{ verticalAlign: "middle" }}>
        {photoData?.length > 0 &&
          photoData?.map((image, idx) => (
            <img
              alt="foto"
              key={idx}
              onClick={() =>
                setImageUrlModal(
                  image?.CAMINHO_FOTO.replace(
                    "public",
                    process.env.REACT_APP_BACKEND_URL || ""
                  )
                )
              }
              style={{ maxHeight: "50px", margin: "8px", cursor: "pointer" }}
              src={image?.CAMINHO_FOTO.replace(
                "public",
                process.env.REACT_APP_BACKEND_URL || ""
              )}
            />
          ))}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          color: "#dd5400",
        }}
      >
        {data.length === 0 && photoData.length === 0 && <div>Não há dados</div>}
      </div>
    </>
  );
}
