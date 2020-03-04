import React, { useState } from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';

const auth = () => {
  const [show, setShow] = useState(false);
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
        {/* <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Autenticação
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Container>
            {loginOrSignUp === 'log-in' && (
              <>
                <Row>
                  <h6>Fazer Login</h6>
                </Row>
                <Row>
                  <p>Obrigado por isso</p>
                </Row>
                <Row>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Usuário"
                  />
                </Row>
                <Row>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Senha"
                  />
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
                    <button type="button">Facebook</button>
                  </Col>
                  <Col>
                    <button type="button">Google</button>
                  </Col>
                </Row>
              </>
            )}
            {loginOrSignUp === 'sign-up' && (
              <>
                <Row>
                  <h6>Criar Conta</h6>
                </Row>
                <Row>
                  <p>Obrigado por isso</p>
                </Row>
                <Row>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Usuário"
                  />
                </Row>
                <Row>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Senha"
                  />
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
                    <button type="button">Facebook</button>
                  </Col>
                  <Col>
                    <button type="button">Google</button>
                  </Col>
                </Row>
                <Row>
                  <p>Ao enviar você</p>
                </Row>
              </>
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            {loginOrSignUp === 'sign-up' && (
              <>
                <p>Ainda tem uma conta?</p>
                <a onClick={() => setLoginOrSignUp('log-in')}>Entrar</a>
              </>
            )}
            {loginOrSignUp === 'log-in' && (
              <>
                <p>Já tem uma conta?</p>
                <a onClick={() => setLoginOrSignUp('sign-up')}>Criar Conta</a>
              </>
            )}
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default auth;
