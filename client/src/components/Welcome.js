import React from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../styles/welcomeV2.css";



const Welcome = () => {
  // const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     var element = document.getElementsByClassName("secondary-footer")[0];
  //     element.style.display = "none";
  //   }
  // }, [location]);
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
          // max-width="100px"
          // max-height="500px"
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
        {/* <Link to={localStorage.getItem('username')? "/learn" : "/join"}> */}
          <button className="rightsection__button">START NOW</button>
        {/* </Link> */}
      </Col>
    </Row> 
  );
};

export default Welcome;
