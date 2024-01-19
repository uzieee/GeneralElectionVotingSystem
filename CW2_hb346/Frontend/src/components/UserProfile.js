import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import Profile from '../pages/Profile';
import HomeFeatured from './HomeFeatured';

const UserProfile = () => {
  return ( 
    <>
  <Header />
  <Outlet />
  <Profile />
  <HomeFeatured />
  <Footer />
  </>
  );
};

export default UserProfile;
