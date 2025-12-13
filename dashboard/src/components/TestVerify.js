import React, { useEffect, useState } from "react";
import axios from "axios";

const TestVerify = () => {
  const [status, setStatus] = useState("Checking cookie...");

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3002/verify",
          {}, // POST body (empty object if your backend doesn't need data)
          {
            withCredentials: true, // important: sends the cookie automatically
          }
        );

        if (data.status) {
          setStatus("✅ Verified! User: " + data.user);
        } else {
          setStatus("❌ Not verified. No valid cookie found.");
        }
      } catch (err) {
        setStatus("⚠️ Error: " + err.message);
      }
    };

    verifyCookie();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #333",
        width: "400px",
        margin: "50px auto",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h2>Cookie Verification Test</h2>
      <p>{status}</p>
    </div>
  );
};

export default TestVerify;
