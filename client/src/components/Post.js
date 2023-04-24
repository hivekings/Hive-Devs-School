import React, { useState, useCallback } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";



const Post = () => {
  const params = useParams();

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [permlink, setPermlink] = useState("");
  const [tags, setTags] = useState(`hk-university ${params.tag}`);
  const keychain = window.hive_keychain;
  const [validated, setValidated] = useState(false);

 

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  function publish() {
    if (localStorage.getItem("username") === null) {
      alert("Please login first.");
      return;
    }
    if (title === "" || description === "" || tags === "") {
      return;
    }
    if (value === "") {
      alert("Please enter some content for your post.");
      return;
    }

    const keychain = window.hive_keychain;
    if (!keychain) {
      alert("Please install Hive Keychain");
      return;
    }

    const tagsWithProjectTag = tags.concat([
      
    ]);

    console.log(tagsWithProjectTag);

    keychain.requestPost(
      localStorage.getItem("username"),
      title,
      `${value}`,
      "hive-104341",
      "",
      JSON.stringify({
        format: "markdown",
        description: description,
        tags: tagsWithProjectTag,
      }),
      title.replace(/\s+/g, "-").toLowerCase(),
      JSON.stringify({
        author: localStorage.getItem("username"),
        permlink: title.replace(/\s+/g, "-").toLowerCase(),
        max_accepted_payout: "100000.000 SBD",
        percent_hbd: 10000,
        allow_votes: true,
        allow_curation_rewards: true,
        extensions: [
          [0, { beneficiaries: [{ account: "hk-university", weight: 1000 }] }],
        ],
      }),
      (response) => {
        console.log(response);
      }
    );
  }
  const onChange = useCallback((value) => {
    console.log(value);
    setValue(value);
  }, []);

  return (
    <main className="maina">
      <Link to={"/learn/" + params.name + "/" + params.lesson}>
        <img
          style={{ cursor: "pointer", marginTop: "20px" }}
          width="36"
          src="https://i.imgur.com/Zry8heK.png"
          alt="back to skill"
        />
      </Link>
      <h1 className="post-header1">
        <span style={{ color: "red" }}>Publish</span> A New Proyect
      </h1>
      <h3 className="post-header3">{params.lesson}</h3>

      <Row className="m-4">
        <Col className="post-editor" md={6}>
          <Form
            noValidate
            validated={validated}
            onSubmit={(event) => {
              handleSubmit(event);
              publish();
            }}
          >
            <Form.Group className="mb-3 post-title" controlId="formBasicEmail">
              
              <Form.Control
               className="post-title__input"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="string"
                placeholder="Title"
              />
              <Form.Control.Feedback type="invalid">
                {title === "" ? "Don't leave this section empty" : ""}
              </Form.Control.Feedback>
            </Form.Group>
            <SimpleMdeReact
              options={autofocusNoSpellcheckerOptions}
              value={value}
              onChange={onChange}
            />
    
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <br />
              <div className="tags-box">
                  <span>Tags:</span>
                  <ul>
                    {tags.split(" ").map((tag) => {
                      return (
                        <li key={tag}> 
                            {tag}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              <div className="d-flex mt-2">
             
                <Form.Control
                  required
                  value={tags}
                  onChange={(e) => setTags(e.target.value.toUpperCase())}
                  type="string"
                  placeholder="TAGS"
                />
              </div>
              <Form.Control.Feedback type="invalid">
                {tags === "" ? "Your Post should have atleast 1 tag" : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6}>
          <h3 className="preview-title">Project Preview</h3>
      
          <Markdown className="preview-reactmarkdown">{value}</Markdown>
         
        </Col>
        <div>
          <Button
            style={{ float: "right" }}
            className="pt-2 pb-2 pe-4 ps-4 publish-btn"
            onClick={(event) => {
              handleSubmit(event);
              publish();
            }}
          >
           <b> Publish</b>
          </Button>
        </div>
      </Row>
    </main>
  );
};

export default Post;
