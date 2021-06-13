import React from "react";
import Image from "./Image";

export default function SlideShow() {
  return (
    <div className="slideshow-container init-slideshow">
      <div className="mySlides fade">
        <div className="numbertext">1 / 3</div>
        <Image classes="slideshow-img" src="img/img1.jpg" />
        <div className="slideshow-text">Caption Text</div>
      </div>

      <div className="mySlides fade">
        <div className="numbertext">2 / 3</div>
        <Image classes="slideshow-img" src="img/img2.jpg" />
        <div className="slideshow-text">Caption Two</div>
      </div>

      <div className="mySlides fade">
        <div className="numbertext">3 / 3</div>
        <Image classes="slideshow-img" src="img/img3.jpg" />
        <div className="slideshow-text">Caption Three</div>
      </div>

      <a className="prev">&#10094;</a>
      <a className="next">&#10095;</a>
      <div className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
}
