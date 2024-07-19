import React from "react";

const Footer = () => {
  return (
    <footer className="secondary-footer">
    <h5 className="secondary-footer__brand"><span style={{color:"red"}}>HIVE</span> LEARN</h5>
    <img src="https://i.imgur.com/IQqpoU2.jpg" alt="Footer Logo" />
    <ul className="secondary-footer__link-list">
      <li className="secondary-footer__link-list-element"><a href=""><img width="54px" src="https://i.imgur.com/Td8nOw7.png" alt="mail" /></a></li>
      <li className="secondary-footer__link-list-element"><a href=""><img width="54px" src="https://i.imgur.com/JLJVz3t.png" alt="discord" /></a></li>
    </ul>
  </footer>
  );
};

export default Footer;
