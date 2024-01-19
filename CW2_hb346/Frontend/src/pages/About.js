import React from 'react';
import Footer from '../components/Footer';
import './AboutUs.css';

const AboutUs = () => { 
  return (
    <div className='about-us-page'>
      
      
      <section className='about-us-section'>
        <div className='about-us-container'>
          <div className='about-us-column'>
            <div className='about-us-content'>
              <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '15px' }}>
                Empowering Democracy: Electronic Voting System for Shangrila
              </h1>

              <p>
                Welcome to the future of democratic participation in Shangrila! Our Electronic Voting System is designed with the utmost commitment to transparency, security, and accessibility, revolutionizing the way we engage in the democratic process.
              </p>

              <p>
                In a world where technology has the power to connect us in unprecedented ways, our Electronic Voting System brings innovation to the heart of Shangrila's electoral process. We believe in a voting experience that is not only efficient but also fosters trust and inclusivity.
              </p>

              <p>
                <strong>For Voters:</strong> Your voice matters, and our system ensures that it is heard loud and clear. Say goodbye to traditional paper ballots and hello to a seamless, user-friendly interface that allows you to cast your vote securely from the comfort of your home or at designated polling stations.
              </p>
              <ul>
                <li>Experience hassle-free voting without the need for long queues.</li>
                <li>Verify your vote and ensure its accuracy with our robust verification mechanisms.</li>
              </ul>

              <p>
                <strong>For Candidates:</strong> We understand the importance of fair elections. Our Electronic Voting System levels the playing field, providing candidates with a transparent platform to showcase their vision for Shangrila. Embrace a democratic process that is as modern as your ideas.
              </p>
              <ul>
                <li>Access real-time updates on the voting progress.</li>
                <li>Enhance your campaign strategies with data-driven insights.</li>
              </ul>

              <p>
                Our commitment to transparency goes beyond the digital realm. We employ cutting-edge encryption and authentication measures to ensure the integrity of the electoral process. Your vote is not just a number; it is a powerful expression of your democratic right, and we take every step to safeguard it.
              </p>

              <p>
                Shangrila deserves a voting system that reflects the values of its people – transparent, secure, and progressive. Join us on this journey towards a future where every vote counts, and democracy thrives.
              </p>

              <p>
                <em>Empower democracy, embrace transparency – Shangrila's Electronic Voting System.</em>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
