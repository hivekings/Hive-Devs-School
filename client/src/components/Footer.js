import React from "react";

const Footer = () => {
  return (
    <footer className="secondary-footer">
    <h5 className="secondary-footer__brand"><span style={{color:"red"}}>HIVE</span> LEARN</h5>
    <img src="https://i.ibb.co/QNcDFgt/IQqpoU2.webp" alt="Footer Logo" />
    <ul className="secondary-footer__link-list">
      <li className="secondary-footer__link-list-element"><a href=""><img width="54px" src="https://i.ibb.co/1Z9BW5Q/Td8nOw7.webp" alt="discord" /></a></li>
      <li className="secondary-footer__link-list-element"><a href=""><img width="54px" src="https://i.ibb.co/Rv50Sfn/JLJVz3t.webp" alt="mail" /></a></li>
    </ul>
  </footer>
  );
};

export default Footer;
