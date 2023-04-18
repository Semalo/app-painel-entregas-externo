import { AxiosRequestConfig, HeadersDefaults } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../components/Toast";
import { TokenDecode } from "../utils/token-decode";
import { api } from "./../services/api";
import { IToastType } from "./Interfaces";
// import { UserToken } from "./user";

type SignInCredentials = {
  user: string;
  password: string;
};

type User = {
  user?: string;
  sectorId?: number;
  idUsuario?: number;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  authenticateUser?: User;
  loading: boolean;
  logoff(): void;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [authenticateUser, setAuthenticatedUser] = useState<User>();
  const isAuthenticated = !!authenticateUser;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessageType, setToastMessageType] = useState<IToastType>(
    IToastType.unknow
  );
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("apontamento.jwt");
    if (tokenFromLocalStorage) {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenFromLocalStorage}`;
      const idUsuario = new TokenDecode(tokenFromLocalStorage).getIdUsuario();
      setAuthenticatedUser((state) => ({ ...state, idUsuario }));
    }
    setLoading(false);
  }, []);

  async function signIn({ user, password }: SignInCredentials) {
    if (user !== "" && password !== "") {
      const response = await api
        .post("authenticate", { user, password })
        .catch(() => {
          setShowToast(true);
          setToastMessageType(IToastType.warning);
          setToastMessage("Login Inválido!");
        });
      console.log(response);
      if (response?.data?.jwt) {
        localStorage.setItem("apontamento.jwt", response?.data?.jwt);
        const idUsuario = new TokenDecode(response.data.jwt).getIdUsuario();
        setAuthenticatedUser({ user, idUsuario });
        navigate("/products", {
          state: {
            jwt: response.data.jwt,
          },
        });
      } else {
        setShowToast(true);
        setToastMessageType(IToastType.warning);
        setToastMessage("Login Inválido!");
      }
    } else {
      setShowToast(true);
      setToastMessageType(IToastType.warning);
      setToastMessage("Login Inválido!");
    }
  }

  const logoff = () => {
    localStorage.removeItem("apontamento.jwt");
    navigate("/");
  };

  if (loading) {
    return <></>;
  }

  return (
    <AuthContext.Provider
      value={{ signIn, isAuthenticated, authenticateUser, loading, logoff }}
    >
      <ToastMessage
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
        toastMessageType={toastMessageType}
      />
      {children}
    </AuthContext.Provider>
  );
}
