import React from 'react'
import Hero from "../../components/Hero/Hero.jsx";
import BrandsLogo from "../../components/BrandsLogo/BrandsLogo.jsx";
import Services from "../../components/Services/Services";
import Testimonial from "../../components/Testimonial/Testimonial";
import BlogsComp from "../../components/Blogs/BlogsComp.jsx";

const Home = () => {
  return (
    <>
    <Hero />
    <BrandsLogo />
    <Services />
    <Testimonial />
    <BlogsComp />
    </>
  )
}

export default Home