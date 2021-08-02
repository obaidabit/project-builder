import React from "react";
import Image from "../elements/Image";

export default function ShoesLayout() {
  return (
    <div id="ShoesLayout">
      <header className="hero">
        <div className="container spacing">
          <h1 className="primary-title">Amazing shoes at an amazing price</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quam
            perspiciatis facilis beatae laudantium quidem enim sit sequi!
          </p>
          <a href="javascript::void()" className="btn">
            See what we have
          </a>
        </div>
      </header>
      <main>
        <section className="featured">
          <div className="container">
            <h2 className="section-title">Featured products</h2>
            <div className="split">
              <a href="javascript::void()" className="featured__item">
                <Image
                  src="https://i.ibb.co/xzqhsjv/shoe-4.png"
                  alt=""
                  className="featured__img"
                />
                <p className="featured__details">
                  <span className="price">$99</span>shoe name
                </p>
              </a>
              <a href="javascript::void()" className="featured__item">
                <Image
                  src="https://i.ibb.co/9GdhjS9/shoe-5.png"
                  alt=""
                  className="featured__img"
                />
                <p className="featured__details">
                  <span className="price">$99</span>shoe name
                </p>
              </a>
              <a href="javascript::void()" className="featured__item">
                <Image
                  src="https://i.ibb.co/FX24Psw/shoe-6.png"
                  alt=""
                  className="featured__img"
                />
                <p className="featured__details">
                  <span className="price">$99</span>shoe name
                </p>
              </a>
            </div>
          </div>
        </section>

        <section className="our-products">
          <div className="container">
            <h2 className="section-title">Our products</h2>

            <article className="product shoe-red spacing">
              <Image
                src="https://i.ibb.co/r6x2Zx2/shoe-1.png"
                alt=""
                className="product__image"
              />
              <h3 className="product__title">A really nice shoe</h3>
              <p className="product__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                quam perspiciatis facilis beatae laudantium quidem enim sit
                sequi!
              </p>
              <a href="javascript::void()" className="btn">
                Buy now
              </a>
            </article>

            <article className="product shoe-white shoe-left spacing">
              <Image
                src="https://i.ibb.co/smsQS6r/shoe-2.png"
                alt=""
                className="product__image"
              />
              <h3 className="product__title">A really nice shoe</h3>
              <p className="product__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                quam perspiciatis facilis beatae laudantium quidem enim sit
                sequi!
              </p>
              <a href="javascript::void()" className="btn">
                Buy now
              </a>
            </article>

            <article className="product shoe-blue spacing">
              <Image
                src="https://i.ibb.co/k3fzdKp/shoe-3.png"
                alt=""
                className="product__image"
              />
              <h3 className="product__title">A really nice shoe</h3>
              <p className="product__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                quam perspiciatis facilis beatae laudantium quidem enim sit
                sequi!
              </p>
              <a href="javascript::void()" className="btn">
                Buy now
              </a>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
