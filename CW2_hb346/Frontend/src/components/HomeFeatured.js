import React from 'react';
import StarRating from './StarRating';
const featuredProducts = [
  {
    id: 1,
    imageSrc: './images/1.jpg',
    title: 'Vote For Blue',
    description: 'Your Vote is Important to Us',
  },
  {
    id: 2,
    imageSrc: './images/2.jpg',
    title: 'Chaos At Polling Station',
    description: 'There was a rush at the polling station resulting in a bad situation',
  },
  {
    id: 3,
    imageSrc: './images/3.jpg',
    title: 'Politicians and Corruption',
    description: 'Dive into the dark world of politics',
  },
  {
    id: 4,
    imageSrc: './images/4.jpg',
    title: 'Voting: Democracy',
    description: 'DEmocracy Explained in Detail',
  },
  {
    id: 5,
    imageSrc: './images/5.jpg',
    title: 'How to Vote',
    description: 'Complete guide to cast a vote',
  },
  {
    id: 6,
    imageSrc: './images/6.jpg',
    title: 'Constituency Rights',
    description: 'Explained the Government and division',
  },
  {
    id: 7,
    imageSrc: './images/7.webp',
    title: 'Vote Foe Team Blue',
    description: 'You Matter',
  },
  {
    id: 8,
    imageSrc: './images/8.webp',
    title: 'Results Shocked',
    description: 'Election Results Unexpected',
  },
  
];

function HomeFeatured() {
  
    return (
        <section className="home-featured">
            <div className='up-title'>
          <h1>Latest Election News</h1>
          </div>
          <div className="featured-products">
            {featuredProducts.map((product) => (
              <div className="featured-product" key={product.id}>
                <img src={product.imageSrc} alt={product.title} />
                <h3>{product.title}</h3>
                <p> {product.description}</p>
    
                {}
                <StarRating
                  initialRating={0} // Set an initial rating
                  onRatingChange={(newRating) => {
                
                    console.log(`User rated ${product.title} with ${newRating} stars`);
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      );
    }
    
    export default HomeFeatured;