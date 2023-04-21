import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/joinForm.css";

async function postUser(
  user,
  experiencieInHive,
  reasonsForDeveloping,
  languageUsed
) {
  const data = {
    username: user,
    experienceInHive: experiencieInHive,
    reasonsForDeveloping: reasonsForDeveloping,
    languageUsed: languageUsed,
  };
  const response = await fetch("http://localhost:3000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const body = await response.json();
  console.log(body);
}


const JoinForm = () => {
  const [user, setUser] = useState("");
  const [reasonsForDeveloping, setReasonsForDeveloping] = useState("");
  const [languageUsed, setLanguageUsed] = useState("");
  const [experiencieInHive, setExperiencieInHive] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/join') {
      var element = document.getElementsByClassName("navbar")[0];
      element.style.display = "none";
    }
    if (location.pathname === '/join') {
      var element = document.getElementsByClassName("secondary-footer")[0];
      element.style.display = "none";
    }
  }, [location]);


  if (localStorage.getItem("username")) {
    return <Navigate to="/learn" />;
  }



  const createUser = async (e) => {


    const keychain = window.hive_keychain;
    if (!keychain) {
      alert("Please install Hive Keychain");
      return;
    }

    if (
      experiencieInHive === "" ||
      reasonsForDeveloping === "" ||
      languageUsed === "" ||
      user === ""
    ) {
      if (user === "") {
        // setUserNameError("Please enter your hive username.");
      }
      return;
    }

    if (user) {
      window.hive_keychain.requestSignBuffer(
        user,
        "Login",
        "Posting",
        async (res) => {
          if (res.success) {
            localStorage.setItem("username", res.data.username);

            await postUser(
              user,
              experiencieInHive,
              reasonsForDeveloping,
              languageUsed
            );
          } else {
            alert("Wrong username.");
            // setUserNameError("Wrong Username.");
            return;
          }
        }
      );
    }

    e.preventDefault();
  };

  return (
    <main className="form_main">
      <Row className="form_section" as="form">
          <h1 className="form_section__header1">Stunning!</h1>
          <h2 className="form_section__header2">
            We would like to know about you to offer you a better experience.
          </h2>
          <Col className="form_leftcol" md={6}>
            <label className="form_section__label "  htmlFor="username">
              Username
            </label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="form_section__input form_section__input--small"
              type="text"
              id="username"
              name="username"
              placeholder="@USERNAME"
              required
            />
            <label className="form_section__label" htmlFor="experienceInHive">
              Do you have any experience developing on Blockchain
            </label>
            <input
              value={experiencieInHive}
              onChange={(e) => setExperiencieInHive(e.target.value)} 
              className="form_section__input form_section__input--big"
              type="text"
              id="experienceInHive"
              name="experienceInHive"
              placeholder="type  here..."
              required
            />
          </Col>
          <Col className="form_rightcol" md={6}>
            <label className="form_section__label" htmlFor="languageUsed">
            What language do you frequently use in your projects?
            </label>
            <input
              value={languageUsed}
              onChange={(e) => setLanguageUsed(e.target.value)}
              className="form_section__input form_section__input--small"
              type="text"
              id="languageUsed"
              name="languageUsed"
              placeholder="type  here..."
              required
            />
            <label
              className="form_section__label "
              htmlFor="reasonsForDeveloping"
            >
              Why would you like to learn how to develop on blockchain?
            </label>
            <input
              value={reasonsForDeveloping}
              onChange={(e) => setReasonsForDeveloping(e.target.value)}
              className="form_section__input form_section__input--big"
              type="text"
              id="reasonsForDeveloping"
              name="reasonsForDeveloping"
              placeholder="type  here..."
              required
            />
          </Col>
      </Row>
      <footer className="footer_form_screen">
        <button onClick={createUser} className="footer_form_screen__button">
          Login
          <img className="footer-form-screen__image" width="32px" height="35px" src="https://i.imgur.com/gZ0rZ14.png"></img>
        </button>
      </footer>
    </main>
  );
};

export default JoinForm;
