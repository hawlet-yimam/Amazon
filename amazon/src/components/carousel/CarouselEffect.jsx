
import React, { useRef } from "react";
import { categoryInfos } from "../Catagory/Catagoryfullinfos";
import styles from "./Carousel.module.css";
import {
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

function CarouselEffect() {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;

    if (carousel) {
      carousel.scrollBy({
        left: direction * carousel.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  const firstCategory = categoryInfos[0];
  const remainingCategories = categoryInfos.slice(1);

  return (
    <section className={styles.carouselSection}>
      <div className={styles.carouselLayout}>
        {/* First image stays fixed on the left */}
        {firstCategory && (
          <a
            href={`/category/${firstCategory.name}`}
            className={`${styles.card} ${styles.staticCard}`}
            style={{
              backgroundColor: firstCategory.bgColor,
            }}
          >
            <h2>{firstCategory.title}</h2>

            <img
              src={firstCategory.imgLink}
              alt={firstCategory.title}
            />

            <span className={styles.shopNow}>
              Shop Now
            </span>
          </a>
        )}

        {/* Only the remaining images scroll */}
        <div className={styles.scrollArea}>
          <button
            type="button"
            className={`${styles.arrow} ${styles.leftArrow}`}
            onClick={() => scrollCarousel(-1)}
            aria-label="Previous categories"
          >
            <FaChevronLeft />
          </button>

          <div
            className={styles.carousel}
            ref={carouselRef}
          >
            {remainingCategories.map((info) => (
              <a
                key={info.name}
                href={`/category/${info.name}`}
                className={`${styles.card} ${
                  info.isLarge ? styles.featured : ""
                }`}
                style={{
                  backgroundColor: info.bgColor,
                }}
              >
                <h2>{info.title}</h2>

                <img
                  src={info.imgLink}
                  alt={info.title}
                />

                <span className={styles.shopNow}>
                  Shop Now
                </span>
              </a>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.rightArrow}`}
            onClick={() => scrollCarousel(1)}
            aria-label="Next categories"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
export default CarouselEffect;