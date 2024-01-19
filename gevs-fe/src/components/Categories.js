import React from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';
import  { useState, useEffect } from 'react';
import axios from 'axios';

// CSS
const categories = [
  { name: 'Elections', image: './images/elections.png', path: '/dashboard' },
  { name: 'Dashboard', image: './images/Dashboard.png', path: '/dashboard' },
  { name: 'Party List', image: './images/Results.png', path: '/list' },
  { name: 'News', image: './images/News.png', path: '/news' }, // Use anchor link for News
];
function Categories() {
  const  navigate = useNavigate();
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    // Fetch user profile data when the component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/users/profile', {
          method: 'GET',
          headers: {
            // Include any necessary headers or authentication tokens
            'Content-Type': 'application/json',
            // Add your authentication token header if needed
            // 'Authorization': `Bearer ${yourAuthToken}`
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error, e.g., redirect to login page
      }
    };

    fetchUserProfile();
  }, []);
  
  const handleCategoryClick = (category) => {
    if (category.path==='/news' && userData.dashboardType==='adminDashboard')
    {
      navigate('/adminDashboard');
    }
    if (category.path === '/news') {
      // Scroll to the element with id 'homeFeatured'
        // Scroll down 300px using the react-scroll library
        scroll.scrollMore(400);
      
    } else {
      navigate(category.path);
    }
  };
  return (
    <React.StrictMode>
      <section className="Categories">
        <div className="category-list">
          {categories.map((category, index) => (
            <div
              className="category-item"
              key={index}
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={category.image} height={"70"} width={"70"}
                alt={category.name}
                className="category-image"
              />
              <h2 className="category-name">{category.name}</h2>
            </div>
          ))}
        </div>
      </section>
    </React.StrictMode>
  );
}

export default Categories;
