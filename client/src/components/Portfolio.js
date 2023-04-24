import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Figure } from "react-bootstrap";
import SimmilarPost from "./simmilarPost";

const Portfolio = () => {
  const params = useParams();

  useEffect(() => {
    fetchUser();
    fetchData();
    getPosts()
  }, []);

  const [user, setUser] = useState([]);
  const [skills, setSkills] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [tracksCompleted, setTracksCompleted] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [portafolio, setPortafolio] = useState([]);
  const [showPortafolio, setShowPortafolio] = useState(false);

  const fetchUser = async () => {
    const result = await fetch(`${process.env.REACT_APP_API_URL}user/${params.name}`);
    const user = await result.json();
    console.log(user);
    setUser(user);
    if (user.lessonsCompleted !== null) {
      setLessons(user.lessonsCompleted);
    }

    setTracksCompleted(user.trackCompleted);
    console.log(tracksCompleted);
    console.log(skills[0].tracks[0]);
  };

  const fetchData = async () => {
    const result = await fetch(process.env.REACT_APP_API_URL);
    // read body as html and not json
    const body = await result.json();
    console.log(body);
    setSkills(body);
  };

  async function fetchAccountPosts(sort, account, limit) {
    const url = `https://api.hive.blog`;
    const data = {
      jsonrpc: "2.0",
      method: "bridge.get_account_posts",
      params: { sort: sort, account: account, limit: limit },
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

  async function getPosts() {
    const posts = await fetchAccountPosts("posts", params.name, 20);
    console.log(posts);
    const filteredPosts = posts.result.filter(
      (post) => post.category === "hive-104341"

    );
    console.log(filteredPosts);
    if (filteredPosts.length > 0) {
      setPosts(filteredPosts);
    }
  }

  return (
    <main className="userprofile">
      <h1 className="userprofile__header1">Student profile</h1>
      <Row as="section" className="profilea">
        <Col md={6} as="section" className="studentstats">
          <Figure>
            <Figure.Image
        
              style={{ borderRadius: "100px" }}
              className="studentstats__image"
              alt="171x180"
              src={"https://images.hive.blog/u/" + params.name + "/avatar"}
            />
          </Figure>
          <ul className="stats">
            <li className="stats__listedelement">{"Lessons completed: " + lessons.length}</li>
            <li className="stats__listedelement">Projects submitted:</li>
            <li className="stats__listedelement">{"Hive skills: " + tracksCompleted.length} </li>
          </ul>
        </Col>
        <Col md={5} as="aside" className="studentlinks">
            <h5 className="studentlinks__header">My Links</h5>
            <Row as="ul" className="studentlinks__list">
              <Col as="li" className="studentlinks__list-element"><img width="55px" src="https://i.imgur.com/mXEt6ma.png" alt="" /></Col>
              <Col as="li" className="studentlinks__list-element"><img width="55px" src="https://i.imgur.com/6hi1upx.png" alt="" /></Col>
              <Col as="li" className="studentlinks__list-element"><img width="55px" src="https://i.imgur.com/FocPbPL.png" alt="" /></Col>
              <Col as="li" className="studentlinks__list-element"><img width="55px" src="https://i.imgur.com/YBrOrPy.png" alt="" /></Col>
              <Col as="li" className="studentlinks__list-element"><img width="55px" src="https://i.imgur.com/ZV2MIA6.png" alt="" /></Col>
            </Row>
        </Col>
      </Row>

      {/* 
      <Row className="m-4">
        <Col className="m-2 align-middle text-center" md="auto" style={{}}>
          <Figure>
            <Figure.Image
              width={155}
              height={155}
              style={{ borderRadius: "100px" }}
              alt="171x180"
              src={"https://images.hive.blog/u/" + params.name + "/avatar"}
            />
          </Figure>
        </Col>

        <Col>
          <h3>{params.name}</h3>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {"Lessons Completed:  " + lessons.length}
            </ListGroup.Item>
            <ListGroup.Item>{"Minutes of Learning:  "}</ListGroup.Item>

            <ListGroup.Item>
              {user.trackCompleted
                ? "Sections Completed:  " + user.trackCompleted.length
                : "Sections Completed:  " + 0}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <h3>Stats:</h3>
        <ul className="lightTitle">
          {skills.map((skill) => {
            return (
              <li className="d-flex align-items-center" key={skill.id}>
                <Link to={"/learn/" + skill.name}>
                  <h5>{skill.title}</h5>
                </Link>
                <div className="d-flex align-items-center">
                  {skill.tracks.map((track) => {
                    return (
                      <div
                        style={{ fontSize: "1rem" }}
                        className={
                          tracksCompleted.includes(track)
                            ? "five-pointed-star-completed"
                            : "five-pointed-star"
                        }
                      ></div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </Row>
      <div className="d-flex flex-column align-items-center">
       
        <h3
          style={{ width: "60%" }}
          className="lightTitle p-4 mb-3 text-center"
        >
          Portafolio
          {showPortafolio ? (
            <a
              onClick={() => {
                setShowPortafolio(false);
              }}
              className="h5 load"
            >
              (Close)
            </a>
          ) : (
            <a
              onClick={() => {
                setShowPortafolio(true);
                fetchAccountProjects();
              }}
              className="h5 load"
            >
              (Load)
            </a>
          )}
          <br></br>
        </h3>

        {showPortafolio
          ? portafolio.map((project) => {
              return (
                <div style={{ width: "95%" }} className="me-5 mb-3">
                  <Card border="secondary">
                    <Card.Header>{}</Card.Header>
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
      </div> */}
      <section className="projects-section">
        <h2 className="projects-section__header"> PROJECTS PORTFOLIO </h2>
        {posts.map((post) => (
          <SimmilarPost key={post._id} post={post} />
        ))}
      </section>
      {/* <footer className="secondary-footer">
        <h5 className="secondary-footer__brand">HIVE LEARN</h5>
        <img src="https://i.imgur.com/IQqpoU2.jpg" alt="Footer Logo" />
        <ul className="secondary-footer__link-list">
          <li className="secondary-footer__link-list-element"><img width="54px" src="https://i.imgur.com/Td8nOw7.png" alt="" /></li>
          <li className="secondary-footer__link-list-element"><img width="54px" src="https://i.imgur.com/JLJVz3t.png" alt="" /></li>

        </ul>
      </footer> */}
    </main>
  );
};

export default Portfolio;
