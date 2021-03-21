import React from "react";

export default function Navbar() {
  const changeScreen = (e) => {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      switch (e.target.alt) {
        case "phone":
          iframe.style.width = "320px";
          break;
        case "tablet":
          iframe.style.width = "768px";
          break;
        default:
          iframe.style.width = "100%";
          break;
      }
      const btns = document.querySelectorAll(".screen-group .screen-btn");

      btns.forEach((item) => {
        if (item === e.target.parentNode) {
          item.classList.add("btn-selected");
        } else {
          item.classList.remove("btn-selected");
        }
      });
    }
  };

  const toggleFullScreen = (e) => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const toggleTargetPage = () => {
    const targetPage = document.querySelector(".target-page");
    const hidePageBtn = document.querySelector(".hide-page");
    const doc = document.querySelector("iframe").contentWindow.document;

    if (targetPage.classList.contains("show-target-page")) {
      targetPage.classList.remove("show-target-page");
      hidePageBtn.classList.add("hide");
      doc.body.classList.add("dash-elements");
    } else {
      targetPage.classList.add("show-target-page");
      hidePageBtn.classList.remove("hide");
      doc.body.classList.remove("dash-elements");
    }
  };

  const toggleDash = (e) => {
    const doc = document.querySelector("iframe").contentWindow.document;
    if (doc) {
      if (doc.body.classList.contains("dash-elements")) {
        doc.body.classList.remove("dash-elements");
        e.target.parentNode.classList.remove("btn-selected");
      } else {
        doc.body.classList.add("dash-elements");
        e.target.parentNode.classList.add("btn-selected");
      }
    }
  };

  return (
    <header>
      <div className="navbar shadow">
        <h3>Logo</h3>
        <button onClick={toggleTargetPage} className="hide hide-page">
          <img src="img/light/hide.svg" alt="full screen button" />
        </button>

        <div className="screen-group">
          <button onClick={changeScreen} className="screen-btn">
            <img src="img/light/phone.svg" alt="phone" />
          </button>
          <button onClick={changeScreen} className="screen-btn">
            <img src="img/light/tablet.svg" alt="tablet" />
          </button>
          <button onClick={changeScreen} className="screen-btn btn-selected">
            <img src="img/light/monitor.svg" alt="monitor" />
          </button>
        </div>

        <div className="tools-group">
          <button onClick={toggleDash} className="screen-btn">
            <img src="img/light/shape.svg" alt="outline" />
          </button>
          <button onClick={toggleTargetPage} className="screen-btn">
            <img src="img/light/visibility.svg" alt="show page button" />
          </button>
          <button onClick={toggleFullScreen} className="screen-btn">
            <img src="img/light/full-screen.svg" alt="full screen button" />
          </button>
        </div>
      </div>
    </header>
  );
}
