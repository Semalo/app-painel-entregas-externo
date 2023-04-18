import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";

import {
  MdPhotoCamera,
  MdEventAvailable,
  MdOutlineQrCode,
  MdSearch,
} from "react-icons/md";
import { ListContainer, MainContainer, PaginationContainer } from "./styles";
import { Table, Form } from "react-bootstrap";

import ReactLoading from "react-loading";
import "../../index.css";
import { api } from "../../services/api";
import { Pagination, Stack } from "@mui/material";

interface IInvoice {
  NOMEPARC: string;
  NUMNOTA: number;
  CNPJPARC: number;
  STATUSPIX?: string;
  MOTORISTA: string;
  PLACA: string;
  CPFCNPJ: string;
  CODPARC: string;
  ORDEMCARGA: string;
  NUNOTA: number;
  OCDATA: Date;
  _sum: {
    TEMFOTO: number;
    TEMOCO: number;
    TEMPIX: number;
  };
}

export const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([] as IInvoice[]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [ordemCarga, setOrdemCarga] = useState();

  const getData = async (ordemCarga: any) => {
    setLoading(true);

    if (ordemCarga > 0) {
      const response = await api.get("shippingOrdersPanel", {
        params: {
          page,
          paginate: process.env.REACT_APP_DEFAULT_PAGINATE,
          ordemCarga,
        },
      });

      if (response?.data) {
        setData(response?.data?.data);
        setTotalPages(response?.data?.totalPages);
      }
    } else {
      const response = await api.get("shippingOrdersPanel", {
        params: { page, paginate: process.env.REACT_APP_DEFAULT_PAGINATE },
      });

      if (response?.data) {
        setData(response?.data?.data);
        setTotalPages(response?.data?.totalPages);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    getData(ordemCarga);
  }, [page]);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleNotas = async (ordemCarga: string) => {
    console.log(ordemCarga, "ordem");
    navigate("/tickets", {
      state: {
        ordemCarga: ordemCarga,
      },
    });
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
            <Table striped className="sm-table">
              <thead>
                <tr>
                  {!showSearch && (
                    <th>
                      ORDEM DE CARGA
                      <MdSearch
                        size={24}
                        color={"#dd5400"}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setShowSearch(true);
                        }}
                      />
                    </th>
                  )}
                  {showSearch && (
                    <th>
                      <Form style={{ display: "flex", alignItems: "center" }}>
                        <Form.Control
                          type="number"
                          placeholder="N° ORDEM DE CARGA"
                          value={ordemCarga}
                          onChange={(e: any) =>
                            setOrdemCarga(e.currentTarget.value)
                          }
                          onKeyDown={(e: any) => {
                            if (e.key === "Enter") {
                              getData(ordemCarga);
                            }
                          }}
                          style={{ width: "210px" }}
                        />
                        <MdSearch
                          size={24}
                          color={"#dd5400"}
                          style={{ cursor: "pointer", marginLeft: "4px" }}
                          onClick={() => {
                            getData(ordemCarga);
                          }}
                        />
                      </Form>
                    </th>
                  )}
                  <th>MOTORISTA</th>
                  <th>PLACA</th>
                  <th>DATA</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 &&
                  data?.map((data) => (
                    <tr
                      key={data?.NUMNOTA}
                      onClick={() => {
                        handleNotas(data?.ORDEMCARGA);
                      }}
                      style={{
                        cursor: "pointer",
                        height: "40px",
                      }}
                    >
                      <td>{data?.ORDEMCARGA}</td>
                      <td>{data?.MOTORISTA}</td>
                      <td>{data?.PLACA}</td>
                      <td>{new Date(data?.OCDATA).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: "flex", gap: "4px" }}>
                          {data?._sum?.TEMFOTO > 0 ? (
                            <MdPhotoCamera size={16} color={"#dd5400"} />
                          ) : (
                            <MdPhotoCamera size={16} />
                          )}
                          {data?._sum?.TEMOCO > 0 ? (
                            <MdEventAvailable size={16} color={"#dd5400"} />
                          ) : (
                            <MdEventAvailable size={16} />
                          )}
                          {data?._sum?.TEMPIX > 0 ? (
                            <MdOutlineQrCode size={16} color={"#dd5400"} />
                          ) : (
                            <MdOutlineQrCode size={16} />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
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
