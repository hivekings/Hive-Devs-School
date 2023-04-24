import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import debounce from 'lodash/debounce'; // Import debounce from a utility library like lodash

const Resources = () => {
  const [skills, setSkills] = useState([]);
  const [resourceTitle, setResourceTitle] = useState("");

  
  useEffect(() => {
    const fetchData = setTimeout(async () => {
      const result = await fetch(`${process.env.REACT_APP_API_URL}resource?title=${resourceTitle}`);
      const body = await result.json();
      console.log(body);
      setSkills(body);
    }, 1000);
    return () => clearTimeout(fetchData);
  }, [resourceTitle]);

  return (
    <main className="maina">
   
        <h1 className="main__header">
          HIVE <span className="ms-2" style={{color:"white"}}> RESOURCES </span>
        </h1>

      <Row className="resources_row">
      <Col md={8} as="section" className="resources__section">
        <ul className="resources__list">
          {skills.map((skill) => (
            <li key={skill.courseId}>
              <Link to={"/Learn/" + skill.courseName}> 
              <h3 className="section__header">{skill.courseName}</h3></Link>
              <ul>
                {skill.resources.map((resource) => (
                  <li className="sublist__element"><a className="list__link" href={resource.link}>{resource.title}</a></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Col>
      <Col md={4} as="aside" className="resources__aside">
          <nav className="aside-navbar">
            <input value={resourceTitle} onChange={(e)=>setResourceTitle(e.target.value)} className="aside-navbar__searchbar" style={{backgroundImage:"https://i.imgur.com/gtWDv0b.png"}} type="search" placeholder="type here" />
          </nav>
      </Col>
      </Row>
    </main>
  );
};

export default Resources;
