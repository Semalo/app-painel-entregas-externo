export interface IEventCategory {
  ID: number;
  OPCAO: string;
}

export interface IEvent {
  eventCategory: IEventCategory;
  DESCRICAO: string;
  LAT: string;
  LONG: string;
}

export interface IImage {
  img: string;
  CAMINHO_FOTO: string;
}

export interface IInvoice {
  NOMEPARC: string;
  NUMNOTA: number;
  CNPJPARC: number;
  STATUSPIX?: string;
  MOTORISTA: string;
  PLACA: string;
  CPFCNPJ: string;
  CODPARC: string;
  ORDEMCARGA: number;
  NUNOTA: number;
  TEMFOTO: number;
  TEMOCO: number;
  TEMPIX: number;
}
