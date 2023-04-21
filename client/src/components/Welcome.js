import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import logohk from "../images/logo-hk.png";
import "../styles/welcomeV2.css";



const Welcome = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setUser] = useState("");
  const [reasonsForDeveloping, setReasonsForDeveloping] = useState("");
  const [languageUsed, setLanguageUsed] = useState("");
  const [experiencieInHive, setExperiencieInHive] = useState("");
  const [validated, setValidated] = useState(false);
  const [userNameError, setUserNameError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {

    if (location.pathname === '/') {
      var element = document.getElementsByClassName("secondary-footer")[0];
      element.style.display = "none";
    }
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

 


  function login() {
    const loginButton = document.getElementById("login");
    const user = document.getElementById("user");
    if (localStorage.getItem("username")) {
      loginButton.style.display = "none";
      user.style.display = "block";
      user.innerHTML = "User: " + localStorage.getItem("username");
    } else {
      const username = prompt("Please enter your hive username.");
      if (username) {
        window.hive_keychain.requestSignBuffer(
          username,
          "Login",
          "Posting",
          (res) => {
            if (res.success) {
              localStorage.setItem("username", res.data.username);
              setUser(localStorage.getItem("username"));
              window.location.reload();
            }
          }
        );
      }
    }
  }

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
        <Link to="/join">
          <button className="rightsection__button">START NOW</button>
        </Link>
      </Col>
      <footer className="footer">
        
        <img src="https://i.imgur.com/IQqpoU2.jpg" alt="Footer Logo" />
      </footer>

      {/* <Modal className="modal" centered show={show} onHide={handleClose}>
        <Modal.Body className="know_hive_modal">
        <Row className="form_section" as="form">
          <h1 className="know_hive_modal__header1">It's a pleasure to see you here!</h1>
          <h2 className="know_hive_modal__header2">
            It may be your first time on the HIVE blockchain, isn’t it?
          </h2>
          <Col className="form_leftcol" md={12}>
            
            <Link to="join">
            <input
              className="know_hive_modal_button"
              type="button"
              id="username"
              name="username"
              value="No, I already have a hive account!"
              required
            />
            </Link>
          
            <Link to="?"><input
              className="know_hive_modal_button"
              type="button"
              id="experienceInHive"
              name="experienceInHive"
              value="Yes, I would like to know about HIVE"
              required
            /></Link>
          </Col>
      </Row>
    
        </Modal.Body>
     
      </Modal>*/}
    </Row> 

    // <div style={{ height: "100%" }} className="bg mt-5 ">
    //   <div
    //     style={{ marginTop:"15vh", marginLeft: "10vw", marginRight: "10vw" }}
    //     className="d-flex flex-column justify-content-center align-items-center text-center"
    //   >
    //     <h1 className="me-5 ms-5">Welcome to HIVE DEVS SCHOOL</h1>
    //     <img width="300px" src={logohk}></img>
    //     <p className="me-5 ms-5 h4">
    //       HIVE DEVS SCHOOL will help you develop and enhance your skills as a
    //       blockchain developer for free with a Learn2earn system and adapting to
    //       each student
    //     </p>
    //     {localStorage.getItem("username") ? (
    //       <div>
    //         {" "}
    //         <Link to="/Learn">
    //           <Button
    //             style={{ fontSize: "1.8rem" }}
    //             variant="secondary"
    //             className="p-4 m-2"
    //           >
    //             Continue your Journey
    //           </Button>
    //         </Link>{" "}
    //       </div>
    //     ) : (
    //       <div style={{width:"100%"}} className="d-flex flex-column align-items-center  justify-content-center mt-3 ">
    //         <Button variant="secondary" onClick={handleShow} className="p-4 me-1">
    //           Sing Up
    //         </Button>
    //         <span>
    //           Already a Student? <a className="login" onClick={login}> Log in </a>
    //         </span>
    //       </div>
    //     )}

    //     <Modal centered show={show} onHide={handleClose}>
    //       <Modal.Header closeButton>
    //         <Modal.Title>Hive devs school join form</Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>
    //         <Form
    //           noValidate
    //           validated={validated}
    //           onSubmit={(event) => {
    //             createUser();
    //             handleSubmit(event)
    //           }}
    //         >
    //           <Form.Group className="mb-3" controlId="formBasicEmail">
    //             <Form.Label>Hive Username</Form.Label>
    //             <Form.Control
    //               required
    //               value={user}
    //               onChange={(e) => setUser(e.target.value)}
    //               type="string"
    //               placeholder="Hive Username"
    //             />
    //             <Form.Text className="text-muted">
    //               Example hive username: @hive-devs-school
    //             </Form.Text>
    //             <Form.Control.Feedback type="invalid">
    //               {user === "" ? "Don't leave this section empty" : userNameError}
    //             </Form.Control.Feedback>
    //           </Form.Group>

    //           <Form.Group className="mb-3" controlId="">
    //             <Form.Label>
    //               Have you any experiencie developing in the blockchain?
    //             </Form.Label>
    //             <Form.Control
    //               required

    //               value={experiencieInHive}
    //               onChange={(e) => setExperiencieInHive(e.target.value)}
    //               type="string"
    //               placeholder=""
    //             />
    //             <Form.Control.Feedback type="invalid">
    //               {experiencieInHive === "" ? "Don't leave this section empty" : ""}
    //             </Form.Control.Feedback>
    //           </Form.Group>
    //           <Form.Group className="mb-3" controlId="f">
    //             <Form.Label>
    //               What is your purpose in learning to develop for the
    //               blockchain?
    //             </Form.Label>
    //             <Form.Control

    //               required
    //               value={reasonsForDeveloping}
    //               onChange={(e) => setReasonsForDeveloping(e.target.value)}
    //               type="string"
    //               placeholder=""
    //             />
    //           </Form.Group>
    //           <Form.Control.Feedback type="invalid">
    //             {reasonsForDeveloping === ""
    //               ? "Don't leave this section empty"
    //               : ""}
    //           </Form.Control.Feedback>
    //           <Form.Group className="mb-3" controlId="">
    //             <Form.Label>
    //               What language do you use most in your projects?
    //             </Form.Label>
    //             <Form.Control
    //               required

    //               value={languageUsed}
    //               onChange={(e) => setLanguageUsed(e.target.value)}
    //               type="string"
    //               placeholder=""
    //             />
    //             <Form.Control.Feedback type="invalid">
    //               {languageUsed === "" ? "Don't leave this section empty" : ""}
    //             </Form.Control.Feedback>
    //           </Form.Group>

    //           {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
    //           <Form.Check type="checkbox" label="Check me out" />
    //         </Form.Group> */}
    //           <Button variant="secondary" onClick={handleClose}>
    //             Close
    //           </Button>
    //           <Button
    //             style={{ float: "right" }}
    //             variant="primary"
    //             type="submit"
    //           >
    //             Submit
    //           </Button>
    //         </Form>
    //       </Modal.Body>
    //       {/* <Modal.Footer>
    //       <Button variant="secondary" onClick={handleClose}>
    //         Close
    //       </Button>
    //       <Button variant="primary" onClick={handleClose}>
    //         Save Changes
    //       </Button>
    //     </Modal.Footer> */}
    //     </Modal>
    //   </div>
    // </div>
  );
};

export default Welcome;
