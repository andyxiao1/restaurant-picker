import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import RestaurantComparison from './RestaurantComparison/RestaurantComparison';
import Filter from './filter/Filter.js';

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
              <Nav.Link eventKey="compare" as={Link} to="/compare">
                Compare
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="filter" as={Link} to="/filter">
                Filter
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
        <Row className="h-100">
          <Col>
            {/* Sets up URL routes */}
            <Switch>
              <Route path="/compare" component={RestaurantComparison}></Route>
              <Route path="/filter" component={Filter}></Route>
              {/* <Route
                path="/login"
                render={(props) => (
                  <Login onAccountChange={this.updateAccount} {...props} />
                )}
              ></Route> */}
              {/* {isAdmin && <Route path="/admin" component={AdminPage}></Route>} */}
              <Route path="/" component={RestaurantComparison}></Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
