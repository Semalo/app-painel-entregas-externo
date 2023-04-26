import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MdArticle } from "react-icons/md";
import {
  ListContainer,
  MainContainer,
  PaginationContainer,
  StatusDiv,
  LicencePlateDiv,
  ContactDiv,
  DateDiv,
  DestinyDiv,
  NoteDiv,
  BoldSpan,
  ButtonMenu,
  NumberDiv,
  ActionsDiv,
} from "./styles";
import { Modal, Button } from "react-bootstrap";
import ReactLoading from "react-loading";
import "../../index.css";
import { api } from "../../services/api";
import { Pagination, Stack } from "@mui/material";
import {
  RiEmotionHappyFill,
  RiEmotionUnhappyFill,
  RiEmotionNormalFill,
} from "react-icons/ri";

interface IDetailInvoice {
  DESCRICAO?: string;
  LAT?: string;
  LONG?: string;
  eventCategory: {
    OPCAO: string;
  };
}
interface INota {
  NUNOTA: number;
  CODEMP?: number;
  NUMNOTA?: number;
  ORDEMCARGA?: number;
  CODPARC?: number;
  PARCEIRO?: string;
  CIDADE?: string;
  UF?: string;
  PLACA?: string;
  MOTORISTA?: string;
  VENDEDOR?: string;
  DT_SAIDA?: string;
  DT_PEDIDO?: string;
  DT_PREV?: string;
  DT_AGENDA?: string | null;
  M3?: string;
  PESOBRUTO?: string;
  VLRLIQNOTA?: string;
  AD_STATUSPED?: string;
  STATUS?: string;
  OBSERVACAO?: string;
  COR?: number;
}
export interface IImage {
  img: string;
  CAMINHO_FOTO: string;
}

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([] as INota[]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<INota>();
  const [detailInvoice, setDetailInvoice] = useState<IDetailInvoice>();

  const [buttonsMenu, setButtonsMenu] = useState([
    { name: "Viagens em Aberto", selected: true, value: 1 },
    { name: "Viagens em Atraso", selected: false, value: 2 },
    { name: "Viagens Encerradas", selected: false, value: 3 },
    { name: "Todas as Viagens", selected: false, value: undefined },
    { name: "Viagens Canceladas", selected: false, value: 4 },
  ]);

  const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  const [axiosConfig, setAxiosConfig] = useState({
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        process.env.REACT_APP_JWT_NAME || ""
      )}`,
    },
  });

  useEffect(() => {
    const jwt = localStorage.getItem(process.env.REACT_APP_JWT_NAME || "");

    setAxiosConfig({
      headers: { Authorization: `Bearer ${jwt}` },
    });
    getData();
  }, []);

  const toggleButton = async () => {
    try {
      setLoading(true);
      const buttonSelected = buttonsMenu.find((item) => item.selected);
      const response = await api.get("deliveries", {
        params: {
          STATUSFILTRO: buttonSelected?.value,
          page,
          paginate: process.env.REACT_APP_DEFAULT_PAGINATE,
        },
        headers: axiosConfig.headers,
      });

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    toggleButton();
  }, [buttonsMenu]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await api.get("deliveries", {
        params: {
          page,
          paginate: process.env.REACT_APP_DEFAULT_PAGINATE,
        },
        headers: axiosConfig.headers,
      });

      setData(response.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const toggleInvoice = (invoice: INota) => {
    setSelectedRecord(invoice);
    loadDetail(invoice);
  };

  const [loadingDetail, setLoadingDetail] = useState(false);
  const [photoData, setPhotoData] = useState<IImage[]>([]);

  const loadDetail = async (invoice: INota) => {
    try {
      setLoadingDetail(true);
      const response = await api.get("event", {
        params: {
          nunota: invoice?.NUNOTA,
          page,
          paginate: process.env.REACT_APP_DEFAULT_PAGINATE,
        },
        headers: axiosConfig.headers,
      });

      const photoResponse = await api.get(
        `/ticket/id?nunota=${invoice?.NUNOTA}`,
        {
          headers: axiosConfig.headers,
        }
      );

      setPhotoData(photoResponse?.data);

      if (response.data.length > 0) setShowModal(true);

      setDetailInvoice(response.data[0]);

      setLoadingDetail(false);
    } catch (error) {
      console.log(error);
      setLoadingDetail(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "5",
        height: "100vh",
      }}
    >
      <Header label={`Torre Logística (Teste)`} />

      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactLoading
            type={"cylon"}
            color={"#ff8000"}
            height={"150px"}
            width={"150px"}
          />
        </div>
      )}
      {!loading && (
        <MainContainer>
          <ListContainer>
            <div
              style={{
                display: "flex",
                marginBottom: "16px",
                justifyContent: "center",
                flexDirection: "row",
                width: "100%",
                borderRadius: "0.2em",
              }}
            >
              {buttonsMenu.map((button) => (
                <ButtonMenu
                  selected={button.selected}
                  onClick={() =>
                    setButtonsMenu(
                      buttonsMenu.map((item) =>
                        item.name === button.name
                          ? { ...item, selected: true }
                          : { ...item, selected: false }
                      )
                    )
                  }
                >
                  {button.name}
                </ButtonMenu>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                marginBottom: "8px",
                justifyContent: "flex-start",
                flexDirection: "row",
                width: "100%",
                background: "#dd5400",
                gap: "8px",
                padding: "4px",
                borderRadius: "0.2em",
              }}
            >
              <ActionsDiv>
                <BoldSpan>Ações</BoldSpan>
              </ActionsDiv>
              <NumberDiv>
                <BoldSpan>Nota</BoldSpan>
              </NumberDiv>
              <StatusDiv>
                <BoldSpan>Status</BoldSpan>
              </StatusDiv>
              <LicencePlateDiv>
                <BoldSpan>Placa</BoldSpan>
              </LicencePlateDiv>
              <ContactDiv>
                <BoldSpan>Contato</BoldSpan>
              </ContactDiv>
              <DateDiv>
                <BoldSpan>Data Pedido</BoldSpan>
              </DateDiv>
              <DateDiv>
                <BoldSpan>Data Saída</BoldSpan>
              </DateDiv>
              <DestinyDiv>
                <BoldSpan>Destino</BoldSpan>
              </DestinyDiv>
              <DateDiv>
                <BoldSpan>Prev. Entrega</BoldSpan>
              </DateDiv>
              <DateDiv>
                <BoldSpan>Agenda</BoldSpan>
              </DateDiv>
              <NoteDiv>
                <BoldSpan>Observação</BoldSpan>
              </NoteDiv>
            </div>
            {data.map((invoice, idx) => (
              <div
                style={{
                  display: "flex",
                  marginBottom: "8px",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  width: "100%",
                  gap: "8px",
                  padding: "4px",
                  paddingBottom: "0px",
                  paddingTop: "0px",
                }}
                key={idx}
              >
                <ActionsDiv>
                  <MdArticle
                    style={{ cursor: "pointer" }}
                    size={20}
                    onClick={() => toggleInvoice(invoice)}
                  />
                </ActionsDiv>
                <NumberDiv>{invoice.NUMNOTA}</NumberDiv>
                <StatusDiv>
                  {invoice?.COR === 3 && (
                    <RiEmotionUnhappyFill size={20} color="red" />
                  )}
                  {invoice?.COR === 2 && (
                    <RiEmotionNormalFill size={20} color="FFC107" />
                  )}
                  {invoice?.COR === 1 && (
                    <RiEmotionHappyFill size={20} color="green" />
                  )}

                  {invoice.STATUS}
                </StatusDiv>
                <LicencePlateDiv>{invoice.PLACA}</LicencePlateDiv>
                <ContactDiv>{invoice.MOTORISTA}</ContactDiv>
                <DateDiv>
                  {invoice.DT_SAIDA &&
                    new Date(invoice.DT_SAIDA).toLocaleDateString()}
                </DateDiv>
                <DateDiv>
                  {invoice?.DT_PEDIDO &&
                    new Date(invoice?.DT_PEDIDO).toLocaleDateString()}
                </DateDiv>
                <DestinyDiv>{`${invoice?.CIDADE}-${invoice?.UF}`}</DestinyDiv>
                <DateDiv>
                  {invoice.DT_PREV &&
                    new Date(invoice.DT_PREV).toLocaleDateString()}
                </DateDiv>

                <DateDiv>
                  {invoice.DT_AGENDA &&
                    new Date(invoice.DT_AGENDA).toLocaleDateString()}
                </DateDiv>
                <NoteDiv>{invoice.OBSERVACAO}</NoteDiv>
              </div>
            ))}
          </ListContainer>
          <PaginationContainer>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                color="standard"
                page={page}
                onChange={handlePagination}
              />
            </Stack>
          </PaginationContainer>
        </MainContainer>
      )}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ minWidth: "900px" }}
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{detailInvoice?.eventCategory?.OPCAO}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: "100%", paddingBottom: "16px" }}>
            {detailInvoice?.DESCRICAO}
          </div>
          <div style={{ display: "flex", width: "100%" }}>
            {photoData.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxHeight: "400px",
                  overflowY: "scroll",
                }}
              >
                {photoData.map((image) => (
                  <div
                    style={{
                      padding: "4px",
                    }}
                  >
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src={image?.CAMINHO_FOTO.replace(
                        "public",
                        process.env.REACT_APP_BACKEND_URL || ""
                      )}
                      alt="imagem"
                    />
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", width: "100%" }}>
              {isLoaded && detailInvoice?.LAT && detailInvoice?.LONG && (
                <GoogleMap
                  mapContainerStyle={{
                    width: "400px",
                    height: "400px",
                  }}
                  center={{
                    lat: parseFloat(detailInvoice?.LAT),
                    lng: parseFloat(detailInvoice?.LONG),
                  }}
                  zoom={15}
                >
                  <Marker
                    position={{
                      lat: parseFloat(detailInvoice?.LAT),
                      lng: parseFloat(detailInvoice?.LONG),
                    }}
                  />
                </GoogleMap>
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="warning" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
