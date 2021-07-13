import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
export default function Home() {
  const changeDot = (item, direction) => {
    const dots = document.querySelectorAll(".dot");

    if (direction === "left") {
      if (item.scrollLeft > window.innerWidth) {
        dots.forEach((el) => el.classList.remove("active"));
        dots[1].classList.add("active");
      } else {
        dots.forEach((el) => el.classList.remove("active"));
        dots[0].classList.add("active");
      }
    } else {
      if (item.scrollLeft === 0) {
        dots.forEach((el) => el.classList.remove("active"));
        dots[1].classList.add("active");
      } else {
        dots.forEach((el) => el.classList.remove("active"));
        dots[2].classList.add("active");
      }
    }
  };
  useEffect(() => {
    let item = document.querySelector(".wrapper");

    document.querySelector(".wrapper").addEventListener("wheel", function (e) {
      if (e.deltaY > 0) {
        item.scrollLeft += window.innerWidth;
        changeDot(item, "right");
      } else {
        item.scrollLeft -= window.innerWidth;
        changeDot(item, "left");
      }
    });

    const squares = document.querySelectorAll(".square");

    squares.forEach((box, index) => {
      let d = index % 2 === 0 ? 1 : -1;
      if (d > 0) {
        box.style.right =
          ((Math.random() * window.innerWidth * d) % window.innerWidth) / 1.2 +
          "px";
      } else {
        box.style.right =
          ((Math.random() * window.innerHeight * d) % window.innerHeight) +
          "px";
      }
      box.style.animation = "go 10s infinite linear";
      box.style.animationDelay =
        Math.floor(((Math.random() * index) % 10) * 5) + "s";
    });
  }, []);
  return (
    <div className="wrapper">
      <div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <nav>
        <div className="container">
          <Link to="/">
            <img className="home-logo-v" src="./img/logo_v.svg" alt="" />
            <img className="home-logo-h" src="./img/logo_h.svg" alt="" />
          </Link>
        </div>
      </nav>
      <div className="page">
        <div className="container">
          <img className="land-img" src="img/topbar.jpg" alt="home" />
          <div className="box">
            <h3>Fast and easy web builder</h3>
            <p>
              Next generation tool, Powerful and easy to use drag and drop
              builder for blogs and websites
            </p>
          </div>
        </div>
      </div>
      <div className="page">
        <div className="container">
          <img className="land-img" src="img/drag.jpg" alt="home" />
          <div className="box">
            <h3>Drag and drop builder</h3>
            <p>
              Unlimited design powers with an easy to use interface, change
              anything on your website with a few clicks.
            </p>
          </div>
        </div>
      </div>
      <div className="page">
        <div className="container">
          <img className="land-img" src="img/responsive.jpg" alt="home" />
          <div className="box">
            <h3>Responsive design</h3>
            <p>
              Design your website to work on any screen phone, tablet and
              desktop
            </p>
          </div>
        </div>
      </div>
      <div className="dot-wrapper">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <div className="btn-wrapper">
        <Link className="button" to="/editor">
          Get started
        </Link>
      </div>
      <footer>
        <div className="container">
          <img
            className="logo-footer"
            src="./img/logo_h.svg"
            alt="Resdesign logo"
          />

          <span>2021 , Redesign Inc. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
