import { useState } from "react";
import { Link } from "react-router-dom";
import '../../public/css/imageslider.css';

const slides = [
  {
    image: "./images/vegetables.jpg",
    text: "See our newset deal of the day, vary from dairy products to the freshest vegetable producede by our farm",
    link: "/product",
    buttonText: "SHOP NOW"
  },
  {
    image: "./images/specialoffer.jpg",
    text: "Want to save your poket, get yourself a deal up to 50% directly from our farm.",
    link: "/offers",
    buttonText: "SEE FOR YOURSELF"
  },
  {
    image: "./images/blog.jpg",
    text: "Want to learn a new recipe, or you are trying to figure out how to grow yourself a garden, then check out or newest blog from our professional nutritionists and agriculturists across the world",
    link: "/blog",
    buttonText: "READ NOW"
  },
];

export default function ImageSlider({ width = "100%", height = "450px" }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="slider" style={{ width, height }}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{
            backgroundImage: `url(${slide.image})`,
            width: "100%",
            height: "100%",
          }}
        >
          {index === current && (
            <div className="slide-content">
              
              <Link to={slide.link} className="slide-button">
                {slide.buttonText}
              </Link>
              <p>{slide.text}</p>
            </div>
          )}
        </div>
      ))}
      <button className="arrow left" onClick={prevSlide}>❮</button>
      <button className="arrow right" onClick={nextSlide}>❯</button>
    </div>
  );
}

