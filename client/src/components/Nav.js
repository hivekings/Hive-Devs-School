import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import fefeas from "../images/keychain.png";
import hamburguer from "../images/sandwich.svg";
import closebtn from "../images/close_btn.svg";

function Nava() {
  function login() {
    if (localStorage.getItem("username")) {
      return;
    } else {
      const username = prompt("Please enter your hive username.");
      if (username) {
        window.hive_keychain.requestSignBuffer(
          username,
          "Login",
          "Posting",
          (res) => {
            if (res.success) {
              localStorage.setItem("username", res.data.username);
              setUser(localStorage.getItem("username"));
              window.location.reload();
            }
          }
        );
      }
    }
  }

  function logOut() {
    localStorage.removeItem("username");
    window.location.reload();
  }

  function toggleMenu() {
    var menu = document.querySelector(".navbar__list");
    var items = document.querySelectorAll(".navbar__list__listelement");

    if (menu.style.display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
    }

    items.forEach(function (item) {
      if (item.style.display === "block") {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    });
  }

  const [user, setUser] = useState(localStorage.getItem("username"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu2 = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Nav className="navbar">
      <h5 className="navbar__brand">
        {" "}
        <Link to="/">
          <span className="me-1" style={{ color: "red" }}>
            HIVE
          </span>{" "}
          LEARN
        </Link>{" "}
      </h5>
      <img
        onClick={toggleMenu2}
        src={hamburguer}
        className="navbar__menu"
        alt="Menu"
      ></img>
      <ul className="navbar__list">
        <li className="navbar__list__listelement">
          <Link to="/Learn">Learn</Link>
        </li>
        <li className="navbar__list__listelement">
          <Link to="/resources">Resources</Link>{" "}
        </li>
        <li className="navbar__list__listelement">
          <Link to="/biblioteca">Library</Link>
        </li>
        <li className="navbar__list__listelement">
          <a href="https://discord.com/channels/1004483228561834074/1004483229476200621">
            {" "}
            Get Involved{" "}
          </a>{" "}
        </li>
        {!user ? (
          <li
            onClick={login}
            className="navbar__list__listelement keychain navbar__list__listelement--image"
          >
            <img src={fefeas}></img>Connect Wallet
          </li>
        ) : (
          <NavDropdown
            className="navbar__list__listelement"
            title={
              <>
                <Image
                  height="40px"
                  roundedCircle
                  src={"https://images.hive.blog/u/" + user + "/avatar"}
                />{" "}
                <Link to={"/profile/" + user}>{user}</Link>
              </>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item className="" onClick={logOut}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </ul>

      {/* Modal */}
      {isMenuOpen && (
        <div className="modal-overlay">
          {/* Modal content */}

          <ul className="modal__list">
            <li className="modal__list__listelement--brand d-flex justify-content-between align-items-center">
              <h5 className="modal__list-brand">
                {" "}
                <Link to="/">
                  <span className="me-1" style={{ color: "white" }}>
                    H
                  </span>{" "}
                  LEARN
                </Link>{" "}
              </h5>
              <li style={{marginTop:"-10px"}} onClick={() => setIsMenuOpen(false)}>
                <img width="40px" src={closebtn} />
              </li>
            </li>
            <li className="modal__list__listelement ">
              <a href="/Learn">Learn</a>
            </li>
            <li className="modal__list__listelement">
              <a href="/resources">Resources</a>
            </li>
            <li className="modal__list__listelement">
              <a href="/biblioteca">Library</a>
            </li>
            <li className="modal__list__listelement">
              <a href="https://discord.com/channels/1004483228561834074/1004483229476200621">
                Get Involved
              </a>
            </li>
            {!user ? (
              <li className="modal__list__listelement keychain" onClick={login}>
                <a><img src={fefeas} alt="Connect Wallet" /> Connect</a>
              </li>
            ) : (
              <li className="modal__list__listelement--image">
                <img
                  className="ms-2"
                  height="40px"
                  src={`https://images.hive.blog/u/${user}/avatar`}
                  alt="Profile Avatar"
                />
                <a href={`/portfolio/${user}`}>{user}</a>
              </li>
            )}
          </ul>
        </div>
      )}
    </Nav>
  );
}

export default Nava;
