import React, { useState } from "react";
import { AreaLogin } from "./styled";
import { Button, Form } from "react-bootstrap";
import Api from "./../../Api";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit() {
    const result = await Api.post("/login", { email: email, senha: senha });
    if (result.status === 200) {
      console.log("DEU CERTO");
      console.log(result);
    } else {
      console.log("DEU ERRADO");
      console.log(result);
    }
  }
  return (
    <AreaLogin>
      <h1>Faça seu Login!</h1>
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            id="senha"
            name="senha"
            className="mb-3"
            controlId="formBasicPassword"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          >
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
      </div>
      <div className="d-grid gap-2">
        <Button onClick={handleSubmit}>Entrar</Button>
      </div>
    </AreaLogin>
  );
};
