import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <section className="home-hero">
        <h1>Welcome to GEVS</h1>
        <p>Election System Made easy and transparent fro you</p>
        </section>
      
      <section className="home-categories">
        <h2>Explore</h2>
        <ul className="category-list">
          <li>News</li>
          <li>Party Slogans</li>
          <li>Polling</li>
          {}
        </ul>
      </section>

      

    </div>
  );
};

export default Home;
