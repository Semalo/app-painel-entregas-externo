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
import { Table, Form } from "react-bootstrap";

import ReactLoading from "react-loading";
import "../../index.css";
import { api } from "../../services/api";
import { Pagination, Stack } from "@mui/material";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([] as INota[]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const [buttonsMenu, setButtonsMenu] = useState([
    { name: "Viagens em Aberto", selected: true, value: 1 },
    { name: "Viagens em Atraso", selected: false, value: 2 },
    { name: "Viagens Encerradas", selected: false, value: 3 },
    { name: "Todas as Viagens", selected: false, value: undefined },
    { name: "Viagens Canceladas", selected: false, value: 4 },
  ]);

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
    setLoading(true);
    const buttonSelected = buttonsMenu.find((item) => item.selected);
    const response = await api.get("deliveries", {
      params: {
        STATUSFILTRO: buttonSelected?.value,
        page,
        paginate: process.env.REACT_APP_DEFAULT_PAGINATE,
      },
    });

    setData(response.data);
    setLoading(true);
  };

  useEffect(() => {
    toggleButton();
  }, [buttonsMenu]);

  const getData = async () => {
    setLoading(true);
    const response = await api.get("deliveries", {
      params: {
        page,
        paginate: process.env.REACT_APP_DEFAULT_PAGINATE,
      },
    });

    setData(response.data);

    console.log(response);

    setLoading(false);
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
                // background: "#dd5400",
                // padding: "4px",
                // gap: "16px",
                borderRadius: "0.2em",
                // border: "0.1px #dd5400 solid",
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
            {data.map((nota, idx) => (
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
                  <MdEventAvailable size={30} />
                  <MdPhotoCamera size={30} />
                </ActionsDiv>
                <NumberDiv>{nota.NUMNOTA}</NumberDiv>
                <StatusDiv>{nota.STATUS}</StatusDiv>
                <LicencePlateDiv>{nota.PLACA}</LicencePlateDiv>
                <ContactDiv>{nota.MOTORISTA}</ContactDiv>
                <DateDiv>
                  {nota.DT_SAIDA &&
                    new Date(nota.DT_SAIDA).toLocaleDateString()}
                </DateDiv>
                <DestinyDiv>{nota.CIDADE}</DestinyDiv>
                <DateDiv>
                  {nota.DT_PREV && new Date(nota.DT_PREV).toLocaleDateString()}
                </DateDiv>

                <DateDiv>
                  {nota.DT_AGENDA &&
                    new Date(nota.DT_AGENDA).toLocaleDateString()}
                </DateDiv>
                <NoteDiv>{nota.OBSERVACAO}</NoteDiv>
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
    </div>
  );
};
