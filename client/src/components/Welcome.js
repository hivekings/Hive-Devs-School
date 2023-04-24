import React from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../styles/welcomeV2.css";



const Welcome = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      var element = document.getElementsByClassName("secondary-footer")[0];
      element.style.display = "none";
    }
  }, [location]);

  return (
    <Row as="main">
      <img src="https://i.imgur.com/tLKx5Ea.jpg"></img>
      <Col md={6} as="section">
        <img
          className="leftsection__image"
          src="https://i.imgur.com/1mTr1oo.jpg"
          alt="Image description"
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
        <Link to={localStorage.getItem('username')? "/learn" : "/join"}>
          <button className="rightsection__button">START NOW</button>
        </Link>
      </Col>
      <footer className="footer">
        
        <img src="https://i.imgur.com/IQqpoU2.jpg" alt="Footer Logo" />
      </footer>
    </Row> 
  );
};

export default Welcome;
