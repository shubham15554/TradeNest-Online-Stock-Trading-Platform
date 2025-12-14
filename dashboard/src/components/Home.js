import React, { useEffect, useContext } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { UserProvider, UserContext } from "./userContext";
import axios from "axios";
import { PriceProvider } from "./PriceProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HomeContent = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const verifyCookie = async () => {
      try{

        // First, try to read token from URL
      const params = new URLSearchParams(window.location.search);
      let token = params.get("token");

      if (token) {
        // Store it in localStorage for future use
        localStorage.setItem("token", token);

        // Clean the URL
        window.history.replaceState({}, '', '/');
      } else {
        // If no token in URL, try localStorage
        token = localStorage.getItem("token");
      }

      if (!token) {
        toast.error("No token found. Please login.");
        window.location.href = "http://localhost:3000/Login";
        return;
      }
      
      // Verify token with backend
   
      const res = await axios.get(
        "http://localhost:3002/getUser",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      

      if (!res.data.user) {
        toast.error("Verification failed. Please login.");
        window.location.href = "http://localhost:3000/Login";
      } else {
        setUser(res.data.user);
        toast.success(`Welcome, ${res.data.user.username}!`);
      }
      }
    catch (err) {
      console.error(err);
      toast.error("Verification failed. Please login.");
      window.location.href = "http://localhost:3000/Login";
    }

    };

    verifyCookie();
  }, [setUser]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <TopBar username={user.username} />
      <Dashboard user={user} />
    </>
  );
};

const Home = () => {
  return (
  
    <UserProvider>
      <PriceProvider>
      <HomeContent />
      </PriceProvider>
    </UserProvider>
    
  );
};

export default Home;
