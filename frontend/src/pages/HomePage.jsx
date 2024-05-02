import React from "react";
import Navbar from "../component/Navbar";
import Slide from "../component/Slide";
import Categories from "../component/Categories";
import Listings from "../component/Listings";
import Footer from "../component/Footer";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
      <Footer/>
    </div>
  );
};

export default HomePage;
