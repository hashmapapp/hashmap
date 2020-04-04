import React, { useState } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import styled from 'styled-components';
import AuthenticationServiceFirebase from 'app/services/authentication.service';

const Title = styled.h6`
  width: 100%;
`;

const SubTitle = styled.p`
  width: 100%;
`;

const LogIn = () => {
  const [loginOrSignUp, setLoginOrSignUp] = useState('sign-up');
  const auth = new AuthenticationServiceFirebase();

  return (
    <Container className="text-center mt-4">
      {loginOrSignUp === 'log-in' && (
        <>
          <Row>
            <Title>Fazer Login</Title>
          </Row>
          <Row>
            <SubTitle>Obrigado por isso</SubTitle>
          </Row>
          <Row>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Small"
                name="username"
                id="username"
                placeholder="Usuário"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup className="mb-3">
              <FormControl
                type="password"
                aria-label="Small"
                name="password"
                id="password"
                placeholder="Senha"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Row>
          <Row>
            <Button>Entrar</Button>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <hr />
            </Col>
            <Col xs={6} md={4}>
              <p>ou</p>
            </Col>
            <Col xs={6} md={4}>
              <hr />
            </Col>
          </Row>
          <Row className="show-grid">
            <Col>
              <Button variant="outline-info">Facebook</Button>
            </Col>
            <Col>
              <Button variant="outline-info">Google</Button>
            </Col>
          </Row>
        </>
      )}
      {loginOrSignUp === 'sign-up' && (
        <>
          <Row>
            <Title>Criar Conta</Title>
          </Row>
          <Row>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Small"
                name="username"
                id="username"
                placeholder="Usuário"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup className="mb-3">
              <FormControl
                type="password"
                aria-label="Small"
                name="password"
                id="password"
                placeholder="Senha"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Row>
          <Row>
            <Button
              onClick={() => {
                console.log('Criar Conta');
                auth.createAccount('admin2@gmail.com', 'password1');
              }}
            >
              Criar Conta
            </Button>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <hr />
            </Col>
            <Col xs={6} md={4}>
              <p>ou</p>
            </Col>
            <Col xs={6} md={4}>
              <hr />
            </Col>
          </Row>
          <Row className="show-grid">
            <Col>
              <Button variant="outline-info">Facebook</Button>
            </Col>
            <Col>
              <Button variant="outline-info">Google</Button>
            </Col>
          </Row>
          <Row>
            <SubTitle className="m-2">
              Ao enviar você concorda com os Termos de Uso
            </SubTitle>
          </Row>
        </>
      )}
      {loginOrSignUp === 'sign-up' && (
        <>
          <p>Ainda não tem uma conta?</p>
          <Button
            size="sm"
            variant="link"
            onClick={() => setLoginOrSignUp('log-in')}
          >
            Entrar
          </Button>
        </>
      )}
      {loginOrSignUp === 'log-in' && (
        <>
          <p>Já tem uma conta?</p>
          <Button
            size="sm"
            variant="link"
            onClick={() => setLoginOrSignUp('sign-up')}
          >
            Criar Conta
          </Button>
        </>
      )}
    </Container>
  );
};

export default LogIn;
