import React, { FormEvent, useContext, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdOutlineReceipt } from "react-icons/md";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Container, Logo } from "./styles";
import { AuthContext } from "../../Shared/AuthContext";

export const Login = () => {
  // const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn({ user, password });
    navigate("/panel")
  };

  return (
    <Container>
      <div>
        <span style={{ color: "white" }}>Versão</span>
      </div>
      <Logo>
        <MdOutlineReceipt color="#FB8500" size={90} />
      </Logo>
      <Form onSubmit={handleSubmit}>
        <Form.Group style={{ marginBottom: "1rem" }}>
          <Form.Label style={{ color: "white" }}>Usuário</Form.Label>
          <Form.Control
            type="text"
            placeholder="Usuário"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            name="user"
          />
          <Form.Label style={{ color: "white", marginTop: "1rem" }}>
            Senha
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Form>
    </Container>
  );
};
