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
  // const [showPosts, setShowPosts] = useState(false);
  const [projects, setProjects] = useState([]);



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


  const fetchUser = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}user/${localStorage.getItem("username")}`
    );
    const body = await result.json();

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
      setProjects(body);
    } catch (err) {
      console.log(err);
    }
  };

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
    </main>
  );
};

export default Lesson;
