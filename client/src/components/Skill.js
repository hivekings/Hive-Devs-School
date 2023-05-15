import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import tick from "../images/tick.svg";

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

  };

  const fetchUser = async () => {
    if (!localStorage.getItem("username")) {
      return;
    }
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}user/${localStorage.getItem("username")}`
    );
    const body = await result.json();
    if (body.lessonsCompleted) {
      setLessonsCompleted(body.lessonsCompleted);
    }
    if (body.trackCompleted) {
      setTracksCompleted(body.trackCompleted);
    }
    // filter tracks
    for (let track of tracks) {
      const lessonsInTrack = track.lessons.length;
      let i = 0;
      if (tracksCompleted.includes(track._id)) {
        continue;
      }
      return track.lessons.some((lesson) => {
        if (lessonsCompleted.includes(lesson._id)) {
          i++;
        }
        if (i === lessonsInTrack) {
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
      <div>
      <Link to="/learn/">
      <img style={{marginLeft:"-4%"}} width="36" src="https://i.imgur.com/Zry8heK.png" alt="back to skill" />
      </Link>
      </div>
      <h1 style={{marginLeft:"1%"}} className="learn__header2">
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
      </section>
    </main>
  );
};

export default Skill;
