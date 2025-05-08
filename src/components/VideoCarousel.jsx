import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./VideoCarousel.css";
import { Link } from "react-router-dom";

export const VideoCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false,
  };

  const sliderRef = useRef();

  const handleAfterChange = (current) => {
    // const activeSlide = document.querySelector(
    //   `.slick-slide[data-index="${current}"]`
    // );
    // const focusTarget = activeSlide.querySelector(".your-focusable-element");
    // focusTarget?.focus();
  };

  const slides = [
    {
      video: "/videos/video_1.mp4",
      title: "Walk your path with purpose",
      subtitle: "Every step starts with the right pair.",
    },
    {
      video: "/videos/video_2.mp4",
      title: "Style begins at your feet",
      subtitle: "Make your shoes say what your words can't.",
    },
    {
      video: "/videos/video_3.mp4",
      title: "Life’s short. Buy the shoes.",
      subtitle: "Wear them everywhere.",
    },
  ];

  return (
    <div className="video-carousel">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="video-slide">
            <video
              src={slide.video}
              autoPlay
              loop
              muted
              playsInline
              className="carousel-video"
            />
            <div className="overlay-text">
              <h1>{slide.title}</h1>
              <h2>{slide.subtitle}</h2>
              <p>
                <Link to="/shop">Shop Now</Link>
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
