import React from "react";

const Footer = () => {
  return (
    <footer className="secondary-footer">
    <h5 className="secondary-footer__brand"><span style={{color:"red"}}>HIVE</span> LEARN</h5>
    <img src="https://i.imgur.com/IQqpoU2.jpg" alt="Footer Logo" />
    <ul className="secondary-footer__link-list">
      <li className="secondary-footer__link-list-element"><a href=""><img width="54px" src="https://i.imgur.com/Td8nOw7.png" alt="" /></a></li>
      <li className="secondary-footer__link-list-element"><a href=""><img width="54px" src="https://i.imgur.com/JLJVz3t.png" alt="" /></a></li>
    </ul>
  </footer>

    // <footer className="footer pb-3 pt-3">
    //     <div className="d-flex flex-column justify-content-end  me-5 ms-5 text-center">
    //   <h3 className="m-auto" >Hive Devs</h3>
    //   <p>
    //     Hive Devs is a community of developers and learners who are passionate
    //     about blockchain technology the HIVE ecosystem. We are a decentralized
    //     community that is open to anyone who wants to learn about the HIVE
    //     ecosystem.
    //   </p>
    //   <Row >
    //     <Col xs="6">
    //       <div className="d-flex flex-column align-items-center" style={{ width: "100%" }}>

    //         <span>Any questions? <a>Join our Discord Community</a></span>
    //         <img width="100px" src={logohk}></img>
    
       
    //       </div>
    //     </Col>
    //     <Col xs="6">
          
    //     <div className="d-flex flex-column align-items-center" style={{ width: "100%" }}>
    //         <a href="https://peakd.com/c/hive-104341/created">Join our Community on Hive</a>
    //         <img width="100px" src={logohkv2}></img>
    
    //       </div>
    //     </Col>
    //   </Row>
    //   </div>
    // </footer>
  );
};

export default Footer;
