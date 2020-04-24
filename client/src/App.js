import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import Head2Head from './head2head/Head2Head.js';

const App = () => {
  return (
    <Router>
      <Container fluid className="h-100">
        <Navbar>
          <Navbar.Brand href="/">CIS 550 Project</Navbar.Brand>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="home" as={Link} to="/">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="headtohead" as={Link} to="/headtohead">
                Head to Head
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
        <Row className="h-100">
          <Col>
            {/* Sets up URL routes */}
            <Switch>
              <Route path="/headtohead" component={Head2Head}></Route>
              {/* <Route
                path="/login"
                render={(props) => (
                  <Login onAccountChange={this.updateAccount} {...props} />
                )}
              ></Route> */}
              {/* {isAdmin && <Route path="/admin" component={AdminPage}></Route>} */}
              <Route path="/" component={Head2Head}></Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
