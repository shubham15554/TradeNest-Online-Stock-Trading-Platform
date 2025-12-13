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
      try {
        const res = await axios.post(
          "http://localhost:3002/verify",
          {},
          { withCredentials: true }
        );

        if (!res.data.status) {
          console.log("user not verified");
          toast.error("Verification failed. Please login.");
          window.location.href = "http://localhost:3000/Login";
        } else {
          setUser(res.data.user);
          toast.success(`Welcome, ${res.data.user.username}!`);
        }
      } catch (err) {
        console.log("something went wrong");
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
