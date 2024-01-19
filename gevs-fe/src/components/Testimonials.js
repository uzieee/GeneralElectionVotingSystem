import React from 'react';

const testimonials = [
  {
    id: 1,
    quote: 'Committed to building a brighter future for all.',
    author: 'Henry Kane',
  },
  {
    id: 2,
    quote: 'Empower change, choose excellence!',
    author: 'John Smoth',
  },
 ];

function HomeTestimonials() {
  return (
    <section className="home-testimonials">
     
     <div className='testimonial-title'>
      <h2>What Our Party Leaders Believe</h2>
      </div>
      <div className="testimonials">
        {testimonials.map((testimonial) => (
          <div className="testimonial" key={testimonial.id}>
            <p>"{testimonial.quote}"</p>
            <p>- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeTestimonials;
