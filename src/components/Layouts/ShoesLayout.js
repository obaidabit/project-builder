import React from "react";
import Image from "../elements/Image";

export default function ShoesLayout() {
    return (
        <div id="ShoesLayout">
            <header class="hero">
                <div class="container spacing">
                    <h1 class="primary-title">Amazing shoes at an amazing price</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quam perspiciatis facilis beatae laudantium
                        quidem enim sit sequi!</p>
                    <a href="javascript::void()" class="btn">See what we have</a>
                </div>
            </header>
            <main>
                <section class="featured">
                    <div class="container">
                        <h2 class="section-title">Featured products</h2>
                        <div class="split">
                            <a href="javascript::void()" class="featured__item">
                                <Image src="https://i.ibb.co/xzqhsjv/shoe-4.png" alt="" class="featured__img" />
                                <p class="featured__details"><span class="price">$99</span>shoe name</p>
                            </a>
                            <a href="javascript::void()" class="featured__item">
                                <Image src="https://i.ibb.co/9GdhjS9/shoe-5.png" alt="" class="featured__img" />
                                <p class="featured__details"><span class="price">$99</span>shoe name</p>
                            </a>
                            <a href="javascript::void()" class="featured__item">
                                <Image src="https://i.ibb.co/FX24Psw/shoe-6.png" alt="" class="featured__img" />
                                <p class="featured__details"><span class="price">$99</span>shoe name</p>
                            </a>
                        </div>
                    </div>
                </section>


                <section class="our-products">
                    <div class="container">
                        <h2 class="section-title">Our products</h2>

                        <article class="product shoe-red spacing">
                            <Image src="https://i.ibb.co/r6x2Zx2/shoe-1.png" alt="" class="product__image" />
                            <h3 class="product__title">A really nice shoe</h3>
                            <p class="product__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quam
                                perspiciatis facilis beatae laudantium quidem enim sit sequi!</p>
                            <a href="javascript::void()" class="btn">Buy now</a>
                        </article>

                        <article class="product shoe-white shoe-left spacing">
                            <Image src="https://i.ibb.co/smsQS6r/shoe-2.png" alt="" class="product__image" />
                            <h3 class="product__title">A really nice shoe</h3>
                            <p class="product__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quam
                                perspiciatis facilis beatae laudantium quidem enim sit sequi!</p>
                            <a href="javascript::void()" class="btn">Buy now</a>
                        </article>

                        <article class="product shoe-blue spacing">
                            <Image src="https://i.ibb.co/k3fzdKp/shoe-3.png" alt="" class="product__image" />
                            <h3 class="product__title">A really nice shoe</h3>
                            <p class="product__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quam
                                perspiciatis facilis beatae laudantium quidem enim sit sequi!</p>
                            <a href="javascript::void()" class="btn">Buy now</a>
                        </article>

                    </div>
                </section>

            </main>


        </div>
    )
}
