import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';
import Header from '../components/Header';

import './list.css'; // You can create this file for additional styling

const PartyList = () => {
  const [expanded, setExpanded] = useState(null);

  const PartyData = [
    {
      titleKey: 'Blue Party: Building a Bright Future',
      contentKey:
        'The Blue Party stands for progress and innovation. With a commitment to economic growth and social welfare, we aim to create a vibrant and inclusive society for all. Join us in shaping a future where opportunities abound and every voice is heard.',
      logo: './blue-party.png', // Replace with the actual path to the logo
    },
    {
      titleKey: 'Red Party: Passion for Change',
      contentKey:
        'The Red Party is driven by a passion for positive change. We believe in a government that works tirelessly to address the needs of its people. Our focus is on building a strong foundation for education, healthcare, and community development. Join us in making a difference!',
      logo: './red-party.png', // Replace with the actual path to the logo
    },
    {
      titleKey: 'Yellow Party: Embracing Diversity',
      contentKey:
        'The Yellow Party celebrates diversity and unity. We advocate for an inclusive society where every individual, regardless of background, has equal opportunities. Our vision is to foster harmony, understanding, and prosperity. Join us in embracing a bright and diverse future.',
      logo: './yellow-party.png', // Replace with the actual path to the logo
    },
    {
      titleKey: 'Independent Voices: Beyond Party Lines',
      contentKey:
        'Independence represents freedom of thought and action. Our independent candidates bring fresh perspectives and non-partisan solutions to the table. By choosing Independent, you support candidates committed to serving the people, unbound by traditional party constraints. Join us in promoting a government that prioritizes the needs of the people over political affiliations.',
      logo: './independant.png', // Replace with the actual path to the logo
    },
  ];

  const handleChange = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className='faq-page'>
      <Header />
      <div className='faq-heading'>
        <Typography variant='h4' align='center' gutterBottom>
          Party List
        </Typography>
        <Divider />
      </div>
      <div className='faq-accordion-container'>
        {PartyData.map((item, index) => (
          <Accordion
            key={index}
            className='faq-accordion'
            expanded={expanded === index}
            onChange={() => handleChange(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-tab-content-${index}`}
              id={`faq-tab-title-${index}`}
            >
                
              <img
                src={item.logo}
                alt={`${item.titleKey} Logo`}
                className='party-logo'
                width={100}
                height={100}
                
              />
              <Typography variant='h5'>{item.titleKey}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.contentKey}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default PartyList;
