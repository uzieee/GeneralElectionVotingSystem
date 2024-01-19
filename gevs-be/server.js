// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const crypto = require('crypto');
const cors = require('cors');
const authenticateToken = require('./middleware/authenticateToken');
const SECRET_KEY = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', SECRET_KEY);
const Candidate = require('./models/Candidate'); // Import the Candidate model
const Election = require('./models/Election');
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config();

const { MONGODB_URI } = process.env;

const app = express();
 const PORT = process.env.PORT || 5001;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use(cors());
let electionStatus = 'pending';
let electionResults = {
  status: 'Pending',
  winner: 'Hung Parliament',
  seats: [],
};
const validUvcCodes = [
  'HH64FWPE',
  'BBMNS9ZJ',
  'KYMK9PUH',
  'WL3K3YPT',
  'JA9WCMAS',
  'Z93G7PN9',
  'WPC5GEHA',
  'RXLNLTA6',
  '7XUFD78Y',
  'DBP4GQBQ',
  'ZSRBTK9S',
  'B7DMPWCQ',
  'YADA47RL',
  '9GTZQNKB',
  'admin123',
  'KSM9NB5L',
  'BQCRWTSG',
  'ML5NSKKG',
  'D5BG6FDH',
  '2LJFM6PM',
  '38NWLPY3',
  '2TEHRTHJ',
  'G994LD9T',
  'Q452KVQE',
  '75NKUXAH',
  'DHKVCU8T',
  'TH9A6HUB',
  '2E5BHT5R',
  '556JTA32',
  'LUFKZAHW',
  'DBAD57ZR',
  'K96JNSXY',
  'PFXB8QXM',
  '8TEXF2HD',
  'N6HBFD2X',
  'K3EVS3NM',
  '5492AC6V',
  'U5LGC65X',
  'BKMKJN5S',
  'JF2QD3UF',
  'NW9ETHS7',
  'VFBH8W6W',
  '7983XU4M',
  '2GYDT5D3',
  'LVTFN8G5',
  'UNP4A5T7',
  'UMT3RLVS',
  'TZZZCJV8',
  'UVE5M7FR',
  'W44QP7XJ',
  '9FCV9RMT',
  ];


  app.post('/api/candidates/submit', async (req, res) => {
    try {
      const { candidateName, party, constituency } = req.body;
  
      // Create a new candidate
      const newCandidate = new Candidate({
        name: candidateName,
        party,
        constituency,
      });
  
      // Save the candidate to the database
      await newCandidate.save();
  
      res.status(201).json({ message: 'Candidate submitted successfully' });
    } catch (error) {
      console.error('Error submitting candidate:', error);
      res.status(500).json({ error: 'Candidate submission failed' });
    }
  });

  app.get('/get_heatmap_image', async (req, res) => {
    const heatmapHtml = `
      <html>
        <head>
          <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
          <script src="https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js"></script>
        </head>
        <body>
          <div id="map" style="width: 600px; height: 400px;"></div>
          <script>
            var map = L.map('map').setView([54.7024, -3.2766], 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);
  
            var heatData = [
              [51.509865, -0.118092],
              [53.480759, -2.242631],
              [52.630886, 1.297355],
              [51.454513, -2.587910],
              [52.040622, -0.759417]
            ];
  
            L.heatLayer(heatData, { radius: 25 }).addTo(map);
          </script>
        </body>
      </html>
    `;
  
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.setContent(heatmapHtml, { waitUntil: 'networkidle2' });
    const imageBuffer = await page.screenshot({ encoding: 'base64' });
  
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': imageBuffer.length,
    });
    res.end(imageBuffer, 'base64');
  
    await browser.close();
  });
  
  
  // Route to update election state
  app.post('/api/election/update', async (req, res) => {
    try {
      const { electionStatus, constituency, parties } = req.body;
  
      // Create a new election document
      const newElection = new Election({
        status: electionStatus,
        constituency,
        parties,
      });
  
      // Save the new election to the database
      await newElection.save();
  
      res.status(200).json({ message: 'Election state updated successfully' });
    } catch (error) {
      console.error('Error updating election state:', error);
      res.status(500).json({ error: 'Failed to update election state' });
    }
  });

  
  app.get('/api/election/results', async (req, res) => {
    try {
      // Fetch election results or calculate as needed
      const results = calculateResults(); // Replace this with your actual calculation logic
  
      // Respond with the election results
      res.status(200).json(results);
    } catch (error) {
      console.error('Error fetching election results:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
  app.post('/api/election/test', (req, res) => {
    res.send('Welcome to the Election API!');
  });
  app.post('/api/elections', async (req, res) => {
    try {
      const { status, constituency, parties } = req.body;
  
      // Create a new Election instance
      const newElection = new Election({
        status,
        constituency,
        parties,
      });
  
      // Save the new election to the database
      await newElection.save();
  
      res.status(201).json({ message: 'Election inserted successfully' });
    } catch (error) {
      console.error('Error inserting election:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/api/election/start', async (req, res) => {
    try {
      // Find the first election document with 'pending' status and update it to 'ongoing'
      const updatedElection = await Election.findOneAndUpdate(
        { status: 'pending' }, // Query to find the election document with 'pending' status
        { $set: { status: 'ongoing' } }, // Update the status to 'ongoing'
        { new: true }
      );
  
      if (!updatedElection) {
        // If no election with 'pending' status is found, return an error
        return res.status(404).json({ error: 'No pending election found' });
        
      }
  
      console.log("Updated Election:", updatedElection);
      res.status(200).json({ message: 'Election started successfully', updatedElection });
    } catch (error) {
      console.error('Error starting election:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });

  // Election End
  app.post('/api/election/end', async (req, res) => {
  try {
    // Find the ongoing election document and update the status to 'ended'
    const updatedElection = await Election.findOneAndUpdate(
      { status: 'ongoing' }, // Your query to find the ongoing election document
      { status: 'ended' },
      { new: true }
    );

    // Check if the election is successfully updated
    if (!updatedElection) {
      return res.status(400).json({ error: 'No ongoing election found' });
    }

    // Calculate election results
    const candidateResults = await Candidate.find({}, 'name votes');

    // Respond with the updated election status and results
    res.status(200).json({
      message: 'Election ended successfully',
      electionStatus: updatedElection.status,
      candidateResults,
    });
  } catch (error) {
    console.error('Error ending election:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


  app.post('/api/votes/cast', async (req, res) => {
    try {
      const { candidateId } = req.body;
  
      // Update the vote count for the selected candidate
      const updatedCandidate = await Candidate.findByIdAndUpdate(
        candidateId,
        { $inc: { votes: 1 } }, // Increment the 'votes' field by 1
        { new: true }
      );
  
      res.status(200).json({ message: 'Vote cast successfully', updatedCandidate });
    } catch (error) {
      console.error('Error casting vote:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
  app.get('/api/candidates/lastTwo', async (req, res) => {
    try {
      // Find the last two candidates based on their IDs
      const lastTwoCandidates = await Candidate.find()
        .sort({ _id: -1 }) // Sort by _id in descending order
        .limit(2);
  
      res.status(200).json(lastTwoCandidates);
    } catch (error) {
      console.error('Error fetching last two candidates:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/api/users/profile', async (req, res) => {
    try {
      // Log the received email for debugging
      console.log('Received email:', req.query.email);
  
      // For simplicity, assuming you still have the user email in the request
      // const userEmail = req.query.email; // Make sure to send the email as a query parameter
      const userEmail = 'usmanshafique4342@gmail.com'; // Make sure to send the email as a query parameter
  
      // Fetch the user data from the database based on the email
      const user = await User.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Determine whether to show adminDashboard or dashboard
      const dashboardType = user.email === 'election@shangrila.gov.sr' ? 'adminDashboard' : 'dashboard';
  
      // Exclude sensitive information before sending the response
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        constituency: user.constituency,
        uvc: user.uvc,
        dashboardType,
        // Add other fields as needed
      };
  
      res.status(200).json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  });
  

  // app.get('/api/users/profile', authenticateToken, async (req, res) => {
  //   try {
  //     // The user ID can be obtained from the token payload
  //     const userId = req.user.userId;
  
  //     // Fetch the user data from the database
  //     const user = await User.findById(userId);
  
  //     if (!user) {
  //       return res.status(404).json({ error: 'User not found' });
  //     }
  
  //     // Exclude sensitive information before sending the response
  //     const userData = {
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       email: user.email,
  //       dateOfBirth: user.dateOfBirth,
  //       constituency: user.constituency,
  //       uvc: user.uvc,
  //       // Add other fields as needed
  //     };
  
  //     res.status(200).json(userData);
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //     res.status(500).json({ error: 'Failed to fetch user data' });
  //   }
  // });
// Express route to get user profile
app.get('/api/users/profile', authenticateToken, (req, res) => {
  // Assuming the user information is available in req.user
  const user = req.user;
  res.json({ firstName: user.firstName, lastName: user.lastName });
});



app.get('/api/users/constituency', async (req, res) => {
  try {
    // Fetch the constituency data for users
    const userConstituencies = await User.find({}, 'constituency');
    
    // Extract constituencies from the result
    const constituencies = userConstituencies.map(user => user.constituency);

    res.status(200).json({ constituencies });
  } catch (error) {
    console.error('Error fetching user constituencies:', error);
    res.status(500).json({ error: 'Failed to obtain user constituencies' });
  }
});

  // Obtain Electoral District's Vote Count Route
app.get('/api/gevs/constituency/:constituency', (req, res) => {
  try {
    const { constituency } = req.params;
    // TODO: Fetch vote count for the specified constituency from your database
    // For simplicity, let's assume you have a function getVoteCountByconstituency() to get vote count
    const voteCount = getVoteCountByconstituency(constituency);
    res.status(200).json({ constituency, result: voteCount });
  } catch (error) {
    console.error('Error obtaining vote count for constituency:', error);
    res.status(500).json({ error: 'Failed to obtain vote count' });
  }
});

// Return Election Results Route
app.get('/api/gevs/results', (req, res) => {
  try {
    res.status(200).json({ status: electionResults.status, winner: electionResults.winner, seats: electionResults.seats });
  } catch (error) {
    console.error('Error obtaining election results:', error);
    res.status(500).json({ error: 'Failed to obtain election results' });
  }
});


// Function to calculate election results (replace it with your actual calculation logic)
function calculateResults() {
  // For simplicity, let's assume a random calculation logic
  const parties = ['Red Party', 'Blue Party', 'Yellow Party', 'Independent'];
  const results = {
    status: 'Completed',
    winner: 'Red Party',
    seats: [],
  };
  parties.forEach((party) => {
    results.seats.push({ party, seat: Math.floor(Math.random() * 10) }); // Random seats for each party
  });
  return results;
}

// Function to get vote count by constituency (replace it with your actual logic)
function getVoteCountByconstituency(constituency) {
  // For simplicity, let's assume a random vote count
  const candidates = ['Candidate 1', 'Candidate 2', 'Candidate 3'];
  const result = candidates.map((candidate) => ({
    name: candidate,
    party: 'Random Party',
    vote: Math.floor(Math.random() * 10), // Random votes for each candidate
  }));
  return result;
}

// Signup Route
app.post('/api/users/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, dateOfBirth, constituency, uvc } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }
    if (!validUvcCodes.includes(uvc)) {
      return res.status(400).json({ error: 'Invalid UVC code' });
    }
    const uvcIsTaken = await User.findOne({ uvc });
    if (uvcIsTaken) {
      return res.status(400).json({ error: 'UVC code is already taken' });
    }

    // Hash the password before saving to the database
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      constituency,
      uvc,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Signin Route
app.post('/api/users/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }
    console.log("Original", password);
    console.log("User Password", user.password);
    
    const hashedPassword = await bcrypt.hash(password, 10);
console.log("hashed" ,hashedPassword ); 
    // Check if the password is correct
    if (password===user.password) {
      const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({ token });
  
     }
     else
     {
        return res.status(401).json({ error: 'Password Does not match' });
   
     }

    // Generate a JWT token

   } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ error: 'Signin failed' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
