import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/Data"; // የምስሎች Array (የዚህን ምስል Link ያካተተ)
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div className={classes.hero__container}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        interval={3000}
      >
        {img.map((imageItemLink, index) => {
          return (
            <div key={index} className={classes.hero__slide}>
              <img
                className={classes.hero__img}
                src={imageItemLink}
                alt={`banner-slide-${index}`}
              />
            </div>
          );
        })}
      </Carousel>

      {/* Amazon-style Hero bottom fade effect */}
      <div className={classes.hero__fadeBottom}></div>
    </div>
  );
}

export default CarouselEffect;