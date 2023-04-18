import React from "react";

import { IInvoice } from "../../interfaces";
import { MdAdd, MdRemove } from "react-icons/md";
import {
  FieldCustomerDocument,
  FieldCustomerName,
  FieldDeliveryMan,
  FieldDeliveryManDocument,
  FieldInvoiceNumber,
  FieldVehiclePlate,
} from "../../styles";

import {
  MdPhotoCamera,
  MdEventAvailable,
  MdOutlineQrCode,
} from "react-icons/md";

interface IProps {
  data: IInvoice;
  showDetail: boolean;
  toggleDetail: () => {};
}

export default function Invoice({ data, showDetail, toggleDetail }: IProps) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{ minWidth: "50px", cursor: "pointer" }}
        onClick={toggleDetail}
      >
        {showDetail && <MdRemove size={24} />}
        {!showDetail && <MdAdd size={24} />}
      </div>
      <FieldInvoiceNumber>{data?.NUMNOTA}</FieldInvoiceNumber>
      <FieldCustomerName>
        {data?.CODPARC + " - " + data?.NOMEPARC}
      </FieldCustomerName>
      <FieldCustomerDocument>{data?.CNPJPARC}</FieldCustomerDocument>
      {/* <FieldVehiclePlate>{data?.PLACA}</FieldVehiclePlate> */}
      {/* <FieldDeliveryMan>{data?.MOTORISTA}</FieldDeliveryMan>
      <FieldDeliveryManDocument>{data?.CPFCNPJ}</FieldDeliveryManDocument> */}

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "4px" }}>
          {data?.TEMFOTO > 0 ? (
            <MdPhotoCamera size={16} color={"#dd5400"} />
          ) : (
            <MdPhotoCamera size={16} />
          )}
          {data?.TEMOCO > 0 ? (
            <MdEventAvailable size={16} color={"#dd5400"} />
          ) : (
            <MdEventAvailable size={16} />
          )}
          {data?.TEMPIX > 0 ? (
            <MdOutlineQrCode
              size={16}
              color={
                data?.STATUSPIX === "CONCLUIDA"
                  ? "green"
                  : data?.STATUSPIX === "ATIVA"
                  ? "red"
                  : "black"
              }
            />
          ) : (
            <MdOutlineQrCode size={16} />
          )}
        </div>
      </div>
    </div>
  );
}
