import React from "react";
import style from "./movingCards.module.css";
import img1 from ".././Landing Page/cardImages/img1.png";
import img2 from ".././Landing Page/cardImages/img2.png";
import img3 from ".././Landing Page/cardImages/img3.png";
import img4 from ".././Landing Page/cardImages/img4.png";
import img5 from ".././Landing Page/cardImages/img5.png";
import img6 from ".././Landing Page/cardImages/img6.png";
import img7 from ".././Landing Page/cardImages/img7.png";
import img8 from ".././Landing Page/cardImages/img8.png";
import img9 from ".././Landing Page/cardImages/img9.png";

const MovingCards = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

  return (
    <div className={style.cinemaReel}>
      <div className={style.reel}>
        {images.map((image, index) => (
          <img
            src={image}
            alt={`Slide ${index}`}
            className={style.reelImage}
            key={index}
          />
        ))}
        {images.map((image, index) => (
          <img
            src={image}
            alt={`Slide ${index}`}
            className={style.reelImage}
            key={index + images.length}
          />
        ))}
      </div>
    </div>
  );
};

export default MovingCards;
