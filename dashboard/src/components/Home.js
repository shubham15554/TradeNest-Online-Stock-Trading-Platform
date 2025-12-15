import React, { useEffect, useContext, useState } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { UserProvider, UserContext } from "./userContext";
import axios from "axios";
import { PriceProvider } from "./PriceProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeContent = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const tempKey = params.get("transfer_id");

        let token;

        if (tempKey) {
          // Fetch real JWT from backend using tempKey
          const res = await axios.get(`https://tradenest-online-stock-trading-platform.onrender.com/user/retrieve-token?id=${tempKey}`);
          
          if (res.data.token && res.data.user) {
            token = res.data.token;

            // Store JWT in localStorage for now
            localStorage.setItem("token", token);

            // Clean URL
            window.history.replaceState({}, '', '/');

            // Set user in context
            setUser(res.data.user);
            toast.success(`Welcome, ${res.data.user.username}!`);
          } else {
            toast.error("Token retrieval failed. Please login.");
            window.location.href = "tradenest-frontend.vercel.app/Login";
            return;
          }
        } else {
          // Try localStorage if no tempKey in URL
          token = localStorage.getItem("token");

          if (!token) {
            toast.error("No token found. Please login.");
            window.location.href = "tradenest-frontend.vercel.app/Login";
            return;
          }

          // Verify token with backend
          const res = await axios.get("https://tradenest-online-stock-trading-platform.onrender.com/getUser", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!res.data.user) {
            toast.error("Verification failed. Please login.");
            window.location.href = "tradenest-frontend.vercel.app/Login";
            return;
          }

          setUser(res.data.user);
        }
      } catch (err) {
        console.error(err);
        toast.error("Verification failed. Please login.");
        window.location.href = "tradenest-frontend.vercel.app/Login";
      } finally {
        setLoading(false);
      }
    };

    retrieveToken();
  }, [setUser]);

  if (loading || !user) return <p>Loading...</p>;

  return (
    <>
      <TopBar username={user.username} />
      <Dashboard user={user} />
      <ToastContainer />
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
