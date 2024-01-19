import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import Categories from './Categories';
import HomeFeatured from './HomeFeatured';
import HomeTestimonials from './Testimonials';

const Layout = () => {
  return ( 
    <>
  <Header />
  <Outlet />
  <Categories />
  <HomeFeatured />
  <HomeTestimonials />
  <Footer />
  </>
  );
};

export default Layout;
