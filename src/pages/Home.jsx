import React from "react";
import { VideoCarousel } from "../components/VideoCarousel";
import { HomeComponent } from "../components/HomeComponent";

export const Home = () => {
  return (
    <div>
      <VideoCarousel />
      <HomeComponent />
    </div>
  );
};
