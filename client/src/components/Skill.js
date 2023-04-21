import React, { useState, useEffect } from "react";
//get params from url
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import tick from "../images/tick.svg";
import star from "../images/star_rate.svg";

const Skill = () => {
  const paramms = useParams();

  const [lessonsCompleted, setLessonsCompleted] = useState([]);
  const [tracksCompleted, setTracksCompleted] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}course/${paramms.name}`
      );
      // read body as html and not json
      const body = await result.json();
      console.log(body);
      setData(body);
      setTitle(body.course.title);
      setDescription(body.course.description);
      setTracks(body.tracks);
    };
    fetchData();
    fetchUser();
  }, []);

  const completeTrack = async (id) => {
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}user/${id}/trackCompleted`,
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
    //add id to tracksCompleted
    setTracksCompleted([...tracksCompleted, id]);
    console.log(body);
  };

  const removeTrack = async (id) => {
    const result = await fetch(`${process.env.REACT_APP_API_URL}user/${id}/removeTrack`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${localStorage.getItem("username")}`,
      }),
    });
    //remove id from tracksCompleted
    setTracksCompleted(tracksCompleted.filter((track) => track !== id));
    const body = await result.json();
    console.log(body);
  };

  const completeLesson = async (id) => {
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}user/${id}/lessonCompleted`,
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
    //add id to lessonsCompleted
    setLessonsCompleted([...lessonsCompleted, id]);
    console.log(body);
  };

  const removeLesson = async (id) => {
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}user/${id}/removeLesson`,
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
    //remove id from lessonsCompleted
    setLessonsCompleted(lessonsCompleted.filter((lesson) => lesson !== id));
    console.log(body);
  };

  const fetchUser = async () => {
    if (!localStorage.getItem("username")) {
      return;
    }
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}user/${localStorage.getItem("username")}`
    );
    const body = await result.json();
    console.log("hola");
    console.log(body.lessonsCompleted);
    if (body.lessonsCompleted) {
      setLessonsCompleted(body.lessonsCompleted);
    }
    if (body.trackCompleted) {
      setTracksCompleted(body.trackCompleted);
    }
    // filter tracks
    for (let track of tracks) {
      const lessonsInTrack = track.lessons.length;
      console.log(lessonsInTrack);
      let i = 0;
      if (tracksCompleted.includes(track._id)) {
        continue;
      }
      return track.lessons.some((lesson) => {
        if (lessonsCompleted.includes(lesson._id)) {
          i++;
        }
        if (i === lessonsInTrack) {
          console.log("completado");
          completeTrack(track._id);
        }
      });
    }
  };

  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tracks, setTracks] = useState([]);

  return (
    <main className="maina">
      {/* <div className="d-flex mb-3"> */}
      <Link to="/learn/">
      <img width="36" src="https://i.imgur.com/Zry8heK.png" alt="back to skill" />
      </Link>
      <h1 style={{}} className="learn__header2">
        {title}
      </h1>
      <p className="maina-skill__description">{description}</p>

      <section as="section" className="lessons-list-section">
        {tracks.map((track, index) => (
          <li className="tracks-list__item">
            <h3 className="track-list__item--header3">
              {track.title}
              <div className="track-list__stars">
              {[...Array(index + 1)].map(() =>
                tracksCompleted.includes(track._id) ? (
                  <div
                    onClick={() => removeTrack(track._id)}
                    className="five-pointed-star-completed"
                  ></div>
                ) : (
                  <div
                    onClick={() => completeTrack(track._id)}
                    className="five-pointed-star"
                  ></div>
                )
              )}
              </div>
            </h3>
            <h4 className="track-list__item--header5">TIME</h4>
            <ul className="lessons-list">
              {track.lessons.map((lesson, index) => (
                <li className="lesson-list__item ">
                  <h5 className="lesson-list__item--header5 d-flex">
            
                  
                    
                      {lessonsCompleted.includes(lesson._id) ? (
                        <div
                          onClick={() => removeLesson(lesson._id)}
                          className="box"
                        >
                          <img className="white" src={tick} />
                          <div className="tick"></div>
                        </div>
                      ) : (
                        <div
                          onClick={() => completeLesson(lesson._id)}
                          className="box"
                        ></div>
                      )}
                    <Link className="ms-1" to={lesson.title}>
                      {lesson.title}
                    </Link>
                  </h5>
                  <h5 className="lesson-list__item--time">3 min</h5>
                </li>
              ))}
            </ul>
          </li>
        ))}

        {/* <Col className="mb-4" md={6} key={track._id}>
          <div
              style={{ width: "80%" }}
              className="d-flex lightTitle align-items-center justify-content-between"
            >
              <h3 className="mt-2">{track.title} </h3>
              <div className="d-flex">
                {[...Array(index + 1)].map(() =>
                  tracksCompleted.includes(track._id) ? (
                    <div
                      onClick={() => removeTrack(track._id)}
                      className="five-pointed-star-completed"
                    ></div>
                  ) : (
                    <div
                      onClick={() => completeTrack(track._id)}
                      className="five-pointed-star"
                    ></div>
                  )
                )}
             
              </div>
            </div>
            <Row className="ms-1 mt-1">
              {track.lessons.map((lesson) => (
                <div className="d-flex" key={lesson._id}>
                  {lessonsCompleted.includes(lesson._id) ? (
                    <div
                      onClick={() => removeLesson(lesson._id)}
                      className="box"
                    >
                      <img className="white" src={tick} />
                      <div className="tick"></div>
                    </div>
                  ) : (
                    <div
                      onClick={() => completeLesson(lesson._id)}
                      className="box"
                    ></div>
                  )}

                  <Link className="ms-1" to={lesson.title}>
                    <h5>{lesson.title}</h5>
                  </Link>
                </div>
              ))}
            </Row>
            <div style={{ width: "80%" }}>
              {track.lessons.every((lesson) =>
                lessonsCompleted.includes(lesson._id)
              ) &&
                track.lessons.length > 1 &&
                !tracksCompleted.includes(track._id) && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      completeTrack(track._id);
                    }}
                    style={{ float: "right" }}
                  >
                    Complete Track
                  </Button>
                )}
            </div>
          </Col> */}
      </section>
    </main>
  );
};

export default Skill;
