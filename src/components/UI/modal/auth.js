import React, { useState } from 'react';
import {
  Button,
  Modal,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import styled from 'styled-components';

const Title = styled.h6`
  width: 100%;
`;

const SubTitle = styled.p`
  width: 100%;
`;

const TextInput = styled.input`
  width: 100%;
`;

const auth = () => {
  const [show, setShow] = useState(true);
  const [loginOrSignUp, setLoginOrSignUp] = useState('log-in');

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button>

      <Modal
        show={show}
        onHide={() => {}}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <Container className="text-center">
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
          </Container>
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default auth;
