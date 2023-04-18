import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import {
  BackButton,
  FieldCustomerDocument,
  FieldCustomerName,
  FieldDeliveryMan,
  FieldDeliveryManDocument,
  FieldInvoiceNumber,
  FieldVehiclePlate,
  ListContainer,
  ListItem,
  MainContainer,
  PaginationContainer,
} from "./styles";
import { Table } from "react-bootstrap";
import ReactLoading from "react-loading";
import "../../index.css";
import { api } from "../../services/api";
import { Pagination, Stack } from "@mui/material";
import { IEvent, IImage, IInvoice } from "./interfaces";
import Invoice from "./Components/Invoice";
import InvoiceDetail from "./Components/InvoiceDetail";
import { MdArrowBack } from "react-icons/md";

interface IStateProps {
  ordemCarga: number;
}

export const Tickets = () => {
  const location = useLocation();

  const { ordemCarga } = location?.state as IStateProps;
  const [loading, setLoading] = useState(false);
  const [eventsData, setEventsData] = useState([] as IEvent[]);
  const [idSelectedInvoice, setIdSelectedInvoice] = useState(0);
  const [data, setData] = useState([] as IInvoice[]);
  const [photoData, setPhotoData] = useState([] as IImage[]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const getData = async () => {
    setLoading(true);

    const response = await api.get(
      `shippingOrdersTickets?page=${page}&paginate=${process.env.REACT_APP_DEFAULT_PAGINATE}&ordemCarga=${ordemCarga}`
    );

    // console.log(response);

    if (response?.data) {
      setData(response?.data?.data);
      setTotalPages(response?.data?.totalPages);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  const navigate = useNavigate();

  const getExpandData = async (nunota: number) => {
    if (idSelectedInvoice === nunota) {
      setIdSelectedInvoice(0);
      return;
    }
    setIdSelectedInvoice(nunota);

    const photoResponse = await api.get(`/ticket/id?nunota=${nunota}`);
    const eventResponse = await api.get(`/event?nunota=${nunota}`);

    setPhotoData(photoResponse?.data);
    setEventsData(eventResponse?.data);
  };

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
      }}
    >
      <Header label={`Ordem de Carga ${ordemCarga}`} />
      <div style={{ display: "flex", margin: "0", justifyContent: "center" }}>
        <div style={{ width: "850px", marginTop: "16px" }}>
          <span style={{ fontWeight: "600" }}>Entregador</span>
          <span style={{ fontWeight: "300", marginLeft: "8px" }}>
            {data[0]?.MOTORISTA}
            {"-"}
          </span>
          <span style={{ fontWeight: "300", marginLeft: "8px" }}>
            {data[0]?.PLACA}{" "}
          </span>
        </div>
      </div>
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
            <Table striped className="sm-table">
              <thead>
                <tr style={{ display: "flex" }}>
                  <div style={{ width: "50px" }}></div>
                  <FieldInvoiceNumber>Nota</FieldInvoiceNumber>
                  <FieldCustomerName>Cliente</FieldCustomerName>
                  <FieldCustomerDocument>CNPJ</FieldCustomerDocument>
                  <div>Status</div>
                  {/* <FieldVehiclePlate>Placa</FieldVehiclePlate> */}
                  {/* <FieldDeliveryMan>Entregador</FieldDeliveryMan>
                  <FieldDeliveryManDocument>
                    Doc - Entregador
                  </FieldDeliveryManDocument> */}
                  <div></div>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 &&
                  data?.map((ticketData, idx) => (
                    <ListItem
                      showColor={idx % 2 === 0}
                      key={ticketData?.NUNOTA}
                    >
                      <Invoice
                        data={ticketData}
                        showDetail={ticketData?.NUNOTA === idSelectedInvoice}
                        toggleDetail={() => getExpandData(ticketData?.NUNOTA)}
                      />

                      {ticketData?.NUNOTA === idSelectedInvoice && (
                        <InvoiceDetail
                          data={eventsData}
                          photoData={photoData}
                        />
                      )}
                    </ListItem>
                  ))}
              </tbody>
            </Table>
          </ListContainer>

          <PaginationContainer>
            <div
              style={{ width: "850px", alignItems: "center", display: "flex" }}
            >
              <BackButton onClick={() => navigate(-1)}>
                <MdArrowBack size={16} /> Voltar
              </BackButton>
              <div
                style={{ flex: "2", justifyContent: "center", display: "flex" }}
              >
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    color="standard"
                    page={page}
                    onChange={handlePagination}
                  />
                </Stack>
              </div>
              <div style={{ flex: "1" }}></div>
            </div>
          </PaginationContainer>
        </MainContainer>
      )}
    </div>
  );
};
