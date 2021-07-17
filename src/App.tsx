import DateTime from "components/DateTime";
import Location from "components/Location";
import Todo from "components/Todo";
import WeatherCardList from "components/WeatherCardList";
import TodoProvider from "context/TodoContext";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "styles/app.scss";

function App() {
  return (
    <Container>
      <div className="app">
        <div className="header">
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <DateTime />
            </Col>
            <Col xs={12} md={6}>
              <Location />
            </Col>
          </Row>
        </div>
        <div className="body">
          <TodoProvider>
            <Todo />
          </TodoProvider>
        </div>
        <div className="footer">
          <WeatherCardList />
        </div>
      </div>
    </Container>
  );
}

export default App;
