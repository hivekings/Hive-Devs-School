import React from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


const Learn = () => {
  //fetch request to get the data from the server
   const [data, setData] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
        console.log("/")
        // const result = await fetch(process.env.REACT_APP_API_URL);
        const result = await fetch(``);

        console.log(process.env.REACT_APP_API_URL)
        const body = await result.json();
        setData(body);
        console.log(body)
      };
      fetchData();
    }, []);

  return (
    <main className="text-center maina-variaton">
      <h1 className="learn-title"><b><span style={{color:"white"}}>HIVE</span> <span style={{color:"red"}}>LEARN</span></b></h1>
      <img className="learn-image" src="https://i.imgur.com/A1pBUcS.jpg"></img>
      <Row as="section" className="learn-introduction">
        <Col className="introduction__paragraph--black" style={{paddingLeft:"4.7vw", paddingRight:"4.7vw"}} md={6}  as="p">Welcome to Hive Devs School, where you can master the Hive blockchain with expert-led education and a supportive community.</Col>
        <Col className="introduction__paragraph--white" style={{paddingLeft:"4.7vw", paddingRight:"4.7vw"}} md={6} as="p">Our curriculum is designed to help you acquire the skills you need to succeed in this rapidly growing field.</Col>
      </Row>
      <h2 className="learn__header2">
        DEVS SKILLS
      </h2>
      <section className="skills-section" as="section">
        {data.map((skill) => (
          
          <li className="d-flex skill" key={skill._id}>
            <Image className="skill__image" src={skill.image} />
            <div>
            <Link to={skill.title}><h3 className="skill__title">{skill.title}</h3></Link>
            <p className="skill__description">{skill.description}</p>
            <footer>
            </footer>
            </div>
          </li>
         
        ))}
      </section>
    </main>
  );
};

export default Learn;
