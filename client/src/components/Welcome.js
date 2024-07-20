import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../styles/welcomeV2.css";
import { Link } from "react-router-dom";
import { login } from "./utils";  


const Welcome = () => {
  const handleLogin = () => {
    login();
  }

  return (
    <Row as="main">
      <img alt="logo" src="https://i.ibb.co/hV7xFZf/t-LKx5-Ea-1.webp"></img>
      <Col md={6} as="section">
        <img
          preload="true"
          fetchpriority="high"
          className="leftsection__image"
          src="https://i.ibb.co/rGGxsFm/1m-Tr1oo-2.webp"
          alt="decorative image"
          width="90%"
        />
      </Col>
      <Col className="rightsection" md={6} as="section">
        <h1 className="rightsection__header">
          HIVE <span style={{ color: "black" }}>LEARN</span>
        </h1>
        <p className="rightsection__paragraph">
          Empowering the next generation of Hive blockchain developers through
          expert-led education and hands-on learning
        </p>
          {localStorage.getItem("username") ? <Link to="/learn">
            <button className="rightsection__button">CONTINUE</button>
          </Link> :
          <button onClick={handleLogin} className="rightsection__button">START NOW</button>}
      </Col>
    </Row> 
  );
};

export default Welcome;
