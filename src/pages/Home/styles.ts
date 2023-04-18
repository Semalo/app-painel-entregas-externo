import styled from "styled-components";

export const MainContainer = styled.div`
  background: #d2d2d2;
  margin: 0px;
  padding: 0px;
  padding-top: 0.5rem;
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  background-color: white;
`;

export const ListContainer = styled.ul`
  margin: 0px 1.5rem 0px 1.5rem;
  padding: 0.4rem;
  /* overflow-y: auto; */
`;

export const ListItem = styled.li`
  padding: 0.5rem;
  border-radius: 0.5em;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  cursor: pointer;
  background: white;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
  }
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1180px;

  /* overflow-y: auto; */
`;
