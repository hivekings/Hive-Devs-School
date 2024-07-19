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


  const fetchUser = async () => {
    const result = await fetch(`/api/user/${params.name}`);
    const user = await result.json();

    setUser(user);
    if (user.lessonsCompleted !== null) {
      setLessons(user.lessonsCompleted);
    }

    setTracksCompleted(user.trackCompleted);

  };

  const fetchData = async () => {
    const result = await fetch('/api/');
    // read body as html and not json
    const body = await result.json();

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

    const filteredPosts = posts.result.filter(
      (post) => post.category === "hive-104341"

    );

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
              <Col as="li" alt="link to github" className="studentlinks__list-element"><img width="55px" src="https://i.imgur.com/mXEt6ma.png" alt="" /></Col>
              <Col as="li" alt="link to hive" className="studentlinks__list-element"><img width="55px" src="https://i.imgur.com/6hi1upx.png" alt="" /></Col>
              <Col as="li" alt="link to twitter" className="studentlinks__list-element"><img width="55px" src="https://i.imgur.com/FocPbPL.png" alt="" /></Col>
              <Col as="li" alt="link to instagram" className="studentlinks__list-element"><img width="55px" src="https://i.imgur.com/YBrOrPy.png" alt="" /></Col>
              <Col as="li" alt="link to mail" className="studentlinks__list-element"><img width="55px" src="https://i.imgur.com/ZV2MIA6.png" alt="" /></Col>
            </Row>
        </Col>
      </Row>
      <section className="projects-section">
        <h2 className="projects-section__header"> PROJECTS PORTFOLIO </h2>
        {posts.map((post) => (
          <SimmilarPost key={post._id} post={post} />
        ))}
      </section>
    </main>
  );
};

export default Portfolio;
