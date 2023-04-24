import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/joinForm.css";

const KnowAboutHive = () => {
  return (
    <main className="form_main">
      <Row className="form_section" as="form">
          <h1 className="form_section__header1">Stunning!</h1>
          <h2 className="form_section__header2">
            We would like to know about you to offer you a better experience.
          </h2>
          <Col className="form_leftcol" md={12}>
            <label className="form_section__label "  htmlFor="username">
              Username
            </label>
            <input
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
              className="form_section__input form_section__input--big"
              type="text"
              id="experienceInHive"
              name="experienceInHive"
              placeholder="type  here..."
              required
            />
          </Col>
      </Row>
    </main>
  );
};

export default KnowAboutHive;
