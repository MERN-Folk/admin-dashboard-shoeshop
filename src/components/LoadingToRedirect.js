import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => { 
  const [count, setCount] = useState(3); // 3 sec
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000); // 1 sec
    count === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div
      style={{
        marginTop: "80px",
        padding: "15px",
        textAlign: "center",
      }}
    >
      <h2>No Permission, Redirect in {count} sec</h2>
    </div>
  );
};

export default LoadingToRedirect;
