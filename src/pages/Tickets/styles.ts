import styled from "styled-components";

export const MainContainer = styled.div`
  background: #d2d2d2;
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  display: flex;
  margin: 0;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
`;

export const ListContainer = styled.ul`
  margin: 0px 1.5rem 0px 1.5rem;
  padding: 0.4rem;
  display: flex;
  justify-content: center;
  max-width: 1180px;

  /* overflow-y: auto; */
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-left: 32px;

  /* overflow-y: auto; */
`;

export const FieldInvoiceNumber = styled.div`
  min-width: 100px;
  margin-right: 8px;
`;
export const FieldCustomerName = styled.div`
  width: 450px;
  margin-right: 8px;
`;

export const FieldCustomerDocument = styled.div`
  min-width: 150px;
  margin-right: 8px;
`;
export const FieldDeliveryManDocument = styled.div`
  min-width: 150px;
  margin-right: 8px;
`;

export const FieldVehiclePlate = styled.div`
  min-width: 80px;
  margin-right: 8px;
`;

export const FieldDeliveryMan = styled.div`
  width: 250px;
  margin-right: 8px;
`;

interface IListItemProps {
  showColor: boolean;
}

export const ListItem = styled.div<IListItemProps>`
  background: ${(props) => (props.showColor ? "#F4F4F4" : "white")};
  transition: 0.2s;
  :hover {
    opacity: 0.8;
    color: black;
    box-shadow: 3px 3px 3px #dd5400;
  }
`;

export const BackButton = styled.div`
  flex: 1;
  cursor: pointer;
  align-items: center;
  color: #dd5400;
`;
