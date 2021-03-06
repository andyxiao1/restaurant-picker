import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import RestaurantComparison from './comparison/RestaurantComparison';
import Filter from './filter/Filter.js';
import Home from './home/Home';
import Preferences from './recommendations/Preferences.js';
import History from './history/History.js';

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
            <Nav.Item>
              <Nav.Link eventKey="preferences" as={Link} to="/preferences">
                Recommendation Engine
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="history" as={Link} to="/history">
                Saved Restaurants
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
              <Route path="/preferences" component={Preferences}></Route>
              <Route path="/history" component={History}></Route>
              <Route path="/" component={Home}></Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
