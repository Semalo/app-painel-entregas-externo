import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";

import {
  MdPhotoCamera,
  MdEventAvailable,
  MdOutlineQrCode,
  MdSearch,
} from "react-icons/md";
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
import { Table, Form, Modal, Button } from "react-bootstrap";
import ReactLoading from "react-loading";
import "../../index.css";
import { api } from "../../services/api";
import { Pagination, Stack } from "@mui/material";
interface IDetailInvoice {
  DESCRICAO: string;
  eventCategory: {
    OPCAO: string;
  };
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
    DT_PREV?: string;
    DT_AGENDA?: string | null;
    M3?: string;
    PESOBRUTO?: string;
    VLRLIQNOTA?: string;
    AD_STATUSPED?: string;
    STATUS?: string;
    OBSERVACAO?: string;
  }

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
  };

  const [loadingDetail, setLoadingDetail] = useState(false);

  const loadDetail = async () => {
    try {
      setLoadingDetail(true);
      const response = await api.get("event", {
        params: {
          nunota: selectedRecord?.NUNOTA,
          page,
          paginate: process.env.REACT_APP_DEFAULT_PAGINATE,
        },
        headers: axiosConfig.headers,
      });

      console.log(response);
      if (response.data.length > 0) setShowModal(true);

      setDetailInvoice(response.data[0]);

      setLoadingDetail(false);
    } catch (error) {
      console.log(error);
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [selectedRecord]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "5",
        height: "100vh",
      }}
    >
      <Header label={`Home`} />

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
                  <MdEventAvailable
                    style={{ cursor: "pointer" }}
                    size={30}
                    onClick={() => toggleInvoice(invoice)}
                  />
                </ActionsDiv>
                <NumberDiv>{invoice.NUMNOTA}</NumberDiv>
                <StatusDiv>{invoice.STATUS}</StatusDiv>
                <LicencePlateDiv>{invoice.PLACA}</LicencePlateDiv>
                <ContactDiv>{invoice.MOTORISTA}</ContactDiv>
                <DateDiv>
                  {invoice.DT_SAIDA &&
                    new Date(invoice.DT_SAIDA).toLocaleDateString()}
                </DateDiv>
                <DestinyDiv>{invoice.CIDADE}</DestinyDiv>
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
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{detailInvoice?.eventCategory?.OPCAO}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{detailInvoice?.DESCRICAO}</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
