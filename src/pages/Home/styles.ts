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
  font-size: 0.8em;
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

export const LicencePlateDiv = styled.div`
  width: 75px;
  min-width: 75px;
`;
export const StatusDiv = styled.div`
  width: 110px;
  min-width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const ContactDiv = styled.div`
  width: 140px;
  min-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const NoteDiv = styled.div`
  width: auto;
`;
export const DestinyDiv = styled.div`
  width: 140px;
  min-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DateDiv = styled.div`
  width: 84px;
  min-width: 84px;
`;

export const NumberDiv = styled.div`
  width: 84px;
  min-width: 84px;
`;
export const ActionsDiv = styled.div`
  width: 44px;
  min-width: 44px;
`;

export const BoldSpan = styled.span`
  font-weight: 600;
  color: white;
`;

interface IProps {
  selected: boolean;
}

export const ButtonMenu = styled.button<IProps>`
  all: unset;
  cursor: pointer;
  padding: 8px;
  font-weight: 600;
  border: 0.1px #dd5400 solid;
  border-radius: 0.1em;
  color: ${(props) => (props.selected ? "#FFF" : "#dd5400")};
  background-color: ${(props) => (props.selected ? "#dd5400" : "#FFF")};
`;
