import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUp from "./pages/signup";
import SignInSide from "./pages/signin";
import UserProfile from "./components/UserProfile";
import AboutUs from "./pages/About";
import Dashboard from "./components/Dashboard";
import PartyList from "./pages/list";
import AdminDashboard from "./components/AdminDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
         </Route>
         <Route path="signup" element={<SignUp/>} />
         <Route path="signin" element={<SignInSide/>} />
         <Route path="profile" element={<UserProfile/>} />
         <Route path="about" element ={<AboutUs/>} />
         
         <Route path="dashboard" element ={<Dashboard/>} />
         <Route path="adminDashboard" element = {<AdminDashboard/>} />
         <Route path="list" element ={<PartyList/>} />
         
         

         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
