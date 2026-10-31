import React, { useRef } from 'react';
import { categoryInfos } from './Catagoryfullinfos';
import classes from './Catagory.module.css';

function Catagory() {
  const scrollRef = useRef(null);
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={classes.category__wrapper}>
      {/* Left Scroll Button */}
      <button 
        className={`${classes.scroll__btn} ${classes.left}`} 
        onClick={() => handleScroll('left')}
        aria-label="Scroll Left"
      >
        &#10094;
      </button>

      {/* Categories Container */}
      <section className={classes.category__container} ref={scrollRef}>
        {categoryInfos.map((infos, index) => (
          <a 
            key={index} 
            href={`/category/${infos.name}`}
            className={classes.category__card}
            style={{ backgroundColor: infos.bgColor }}
          >
            <div className={classes.card__header}>
              <h2>{infos.title}</h2>
            </div>
            
            <div className={classes.img__container}>
              <img 
                src={infos.imgLink} 
                alt={infos.title} 
              />
            </div>
          </a>
        ))}
      </section>

      {/* Right Scroll Button */}
      <button 
        className={`${classes.scroll__btn} ${classes.right}`} 
        onClick={() => handleScroll('right')}
        aria-label="Scroll Right"
      >
        &#10095;
      </button>
    </div>
  );
}

export default Catagory;