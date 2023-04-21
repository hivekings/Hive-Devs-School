import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import SimmilarPost from "./simmilarPost";


const Lesson = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [resources, setResources] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [id, setId] = useState("");
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(false);


  const [liveVersion, setLiveVersion] = useState("");
  const [linkToCode, setLinkToCode] = useState("");

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(data.hiveTag)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}lesson/${params.lesson}`
      );
      // read body as html and not json
      const body = await result.json();
      // console.log(body);
      setData(body.lesson);
      setExplanation(body.lesson.explanation);
      if (body.resources !== null) {
        setResources(body.resources);
      }
      setId(body.lesson._id);
    };
    fetchData();
    fetchUser();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const postProject = async () => {
    if (liveVersion === "" || linkToCode === "") {
      return;
    }

    const result = await fetch(`${process.env.REACT_APP_API_URL}project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        lessonId: `${data._id}`,
        linkToDemo: `${liveVersion}`,
        linkToCode: `${linkToCode}`,
      }),
    });
    const body = await result.json();
    // console.log(body);
    handleClose();
  };

  const fetchUser = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}user/${localStorage.getItem("username")}`
    );
    const body = await result.json();
    // console.log("hola");
    // console.log(body.lessonsCompleted);
    // console.log(data.lesson._id);
    // console.log(id);
    if (body.lessonsCompleted) {
      body.lessonsCompleted.forEach((lesson) => {
        if (lesson === id) {
          setLessonCompleted(true);
        }
      });
    }
  };

  //lesson completed patch route
  const completeLesson = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}user/${data._id}/lessonCompleted`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${localStorage.getItem("username")}`,
        }),
      }
    );
    const body = await result.json();
    // console.log(body);
  };

  const removeLesson = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}user/${data._id}/removeLesson`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${localStorage.getItem("username")}`,
        }),
      }
    );
    const body = await result.json();
    // console.log(body);
  };

  async function fetchRankedPosts(sort, tag, observer) {
    const url = `https://api.hive.blog`;
    const data = {
      jsonrpc: "2.0",
      method: "bridge.get_ranked_posts",
      params: { sort, tag, observer },
      id: 1,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  // const str = params.name;
  // const initials = str.split(" ").map((word) => word[0]);
  // const initialsString = initials.reduce((acc, initial) => acc + initial, "");
  // console.log(initials); // Output: ['H', 'W']
  // console.log(initialsString); // Output: 'HW'

  const getPostas = async () => {
    //take the first letter of the skill name

    const fefe = await fetchRankedPosts(
      "created",
      `hku-${data.hiveTag}`,
      "fefe99"
    ); //'hive-104341 fly awaaaaaay'
    // console.log(fefe, "fefe");
    if (fefe.result.length > 0) {
      setPosts(fefe.result);
    }
  };

  const getProjects = async () => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}lesson/${data._id}/projects`
      );
      
      const body = await result.json();
      // console.log(body);
      setProjects(body);
    } catch (err) {
      console.log(err);
    }
  };

  //filter change selection function
  // const getPosts = async () => {
  //   const filter = "created";
  //   const query = {
  //     tag: "hive-104341",
  //     limit: 10,
  //   };

  //   console.log("Post assembled.\nFilter:", filter, "\nQuery:", query);

  //   client.database
  //     .getDiscussions(filter, query)
  //     .then((result) => {
  //       console.log("Response received:", result);
  //       console.log(result)
  //       if (result) {
  //         setPosts(result);

  //         //   var posts = [];
  //         //   result.forEach((post) => {
  //         //     const json = JSON.parse(post.json_metadata);
  //         //     const image = json.image ? json.image[0] : "";
  //         //     const title = post.title;
  //         //     const author = post.author;
  //         //     const created = new Date(post.created).toDateString();
  //         //     posts.push(
  //         //       `<div class="list-group-item"><h4 class="list-group-item-heading">${title}</h4><p>by ${author}</p><p class="list-group-item-text text-right text-nowrap">${created}</p></div>`
  //         //     );
  //         //   });

  //         //   document.getElementById("postList").innerHTML = posts.join("");
  //       }
  //       // else {
  //       //   document.getElementById("postList").innerHTML = "No result.";
  //       // }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert(`Error:${err}, try again`);
  //     });
  // };

  return (
    <main className="maina">
      <Link to={"/learn/" + params.name}>
        <img width="36" src="https://i.imgur.com/Zry8heK.png" alt="back to skill" />
      </Link>
      <h1 className="lesson-header">{data.title}</h1>
      <Row as="header" className="text-center mt-4">
        <Col md={8} as="section">
          <h3 className="lesson-subheader">Project Goal</h3>

          <p  className="lesson-explanation">{data.content}</p>

        </Col>
        <Col className="lesson-aside" md={4} as="aside">
          <h3 className="lesson-subheader">Learn2earn</h3>
          {(params.lesson.includes("project"))? (<button className="aside__button">Submit project <span>+</span></button>) : 
         (<Link to={"post/" + data.hiveTag }><button className="aside__button">Contribute <span>+</span></button></Link>)
         }
        </Col>
      </Row>

      <article >
        {/* <h3 className="lesson-subheader">Content</h3> */}
        {/* <main className="lesson-article" style={{ width: "94%" }}
       
            dangerouslySetInnerHTML={{ __html: data.explanation }}>
        </main> */}
         <Markdown className="lesson-markdown">{explanation}</Markdown>
      </article>
      <section>
        <h3 className="lesson-subheader">Resources</h3>
        <ul className="resources-list">
          {resources.map((resource) => (
            <li className="resources-list__listitem" key={resource._id}>
              <a href={resource.link}>{resource.title}</a>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="lesson-subheader" >{(params.lesson.includes("project"))? "Student's projects":"Student's contributions to the subject"}</h3>
        {posts.map((post) => (
          <SimmilarPost key={post._id} post={post} />
        ))}
      </section>
      {/* <section>
        <h3 className="lesson-subheader" >Student's contributions to the subject</h3>
      </section> */}




      {/* <div className="ms-4 me-4 d-flex">
        <div style={{ width: "70%" }}>
          <div
            style={{ width: "94%" }}
            dangerouslySetInnerHTML={{ __html: data.explanation }}
          />
          <div className="d-flex justify-content-end">
            {lessonCompleted ? (
              <Button
                onClick={(e) => {
                  removeLesson();
                  setLessonCompleted(false);
                }}
                className="m-2"
                variant="secondary"
                style={{ right: "0" }}
              >
                <img width="20px" src={tick} /> Completed
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  completeLesson();
                  setLessonCompleted(true);
                }}
                className="m-2"
                variant="secondary"
                style={{ right: 0 }}
              >
                Mark as Completed
              </Button>
            )}
          </div>
          <div className="d-flex flex-column align-items-center">
            <h3
              style={{ width: "60%" }}
              className="lightTitle p-4 mb-3 text-center"
            >
                Posts
              <br></br>
              {showPosts ? (
                <a
                  onClick={() => {
                    setShowPosts(false);
                  }}
                  className="h5 load"
                >
                  (Close)
                </a>
              ) : (
                <a
                  onClick={() => {
                    setShowPosts(true);
                    getPostas();
                  }}
                  className="h5 load"
                >
                  (Load)
                </a>
              )}
            </h3>
            {showPosts
              ? posts.map((post) => {
                  // const json = JSON.parse(post.json_metadata);

                  const title = post.title;
                  const author = post.author;
                  const created = new Date(post.created).toDateString();
                  return (
                    <a
                      href={"https://peakd.com" + post.url}
                      style={{ width: "95%" }}
                      className="me-5 mb-3"
                    >
                      <Card border="secondary">
                        <Card.Header>{author}</Card.Header>
                        <Card.Body>
                          <Card.Title>{title}</Card.Title>
                        
                        </Card.Body>
                      </Card>
                    </a>
                  );
                })
              : null}
        
          </div>

          <div className="d-flex flex-column align-items-center">
            <h3
              style={{ width: "60%" }}
              className="lightTitle p-4 mb-3 text-center "
            >
              Students Projects
              <br></br>
              {showProjects ? (
                <a
                  onClick={() => {
                    setShowProjects(false);
                  }}
                  className="h5 load"
                >
                  (Close)
                </a>
              ) : (
                <a
                  onClick={() => {
                    setShowProjects(true);
                    getProjects();
                  }}
                  className="h5 load"
                >
                  (Load)
                </a>
              )}
            </h3>
            {showProjects
              ? projects.map((project) => {
                  return (
                    <div style={{ width: "95%" }} className="me-5 mb-3">
                      <Card border="secondary">
                        <Card.Header></Card.Header>
                        <Card.Body>
                          <Card.Title>{project.userName}</Card.Title>
                          <a href={project.linkToCode}>
                            <Button>Code</Button>
                          </a>
                          <a href={project.linkToDemo}>
                            <Button>Live</Button>
                          </a>

                        </Card.Body>
                      </Card>
                    </div>
                  );
                })
              : null}
          </div>

          <div id="postList"></div>
        </div>
        <div
          style={{ width: "30%", borderLeft: "2px solid grey" }}
          className="d-flex flex-column align-items-center"
        >
          <h3 className="lightTitle ms-4 p-2 text-center">
            {" "}
            Resources For This Project
          </h3>
          <ul>
            {resources &&
              resources.map((item) => (
                <a href={item}>
                  <li style={{ wordWrap: "break-word" }}>{item}</li>
                </a>
              ))}
          </ul>

          <Link
            className="d-flex justify-content-center"
            to={"post"}
          >
            <Button variant="secondary">
              Contribute and Earn Posting Here
            </Button>
          </Link>
          <br></br>
          <Button onClick={handleShow} variant="secondary">
            + Add your Project to this Lesson
          </Button>
        </div>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Upload your project and show it to everyone!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={(event) => {
              postProject();
              handleSubmit(event);
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Link to Code</Form.Label>
              <Form.Control
                required
                value={linkToCode}
                onChange={(e) => setLinkToCode(e.target.value)}
                type="string"
                placeholder="example: https//github.com/fredkelly/hive-devs-school/Project1"
              />
              <Form.Text className="text-muted"></Form.Text>
              <Form.Control.Feedback type="invalid">
                {linkToCode === "" ? "Don't leave this section empty" : ""}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Link to Demo</Form.Label>
              <Form.Control
                required
                value={liveVersion}
                onChange={(e) => setLiveVersion(e.target.value)}
                type="string"
                placeholder="example: https//github.io/fredkelly/hive-devs-school/Project1"
              />
              <Form.Control.Feedback type="invalid">
                {liveVersion === "" ? "Don't leave this section empty" : ""}
              </Form.Control.Feedback>
            </Form.Group> */}
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button style={{ float: "right" }} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body> */}
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      {/* </Modal> */}
    </main>
  );
};

export default Lesson;
