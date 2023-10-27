import React, { useEffect, useState } from "react";
import Routing from "./routes/Routing";
import LoaderComponent from "./components/LoaderComponent";
import { authentication } from "./api/auth";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const verifyAuth = async(apiKey: string) => {
     const isAuth = await authentication(apiKey);
     if (!isAuth) {
       navigate('/');
     } else {
      navigate('/movie');
     }
  }

  useEffect(() => {
    const apiKey: string | null = localStorage.getItem("api_key");
    if (apiKey) {
      verifyAuth(apiKey);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div>
        <LoaderComponent />
      </div>
    );
  }

  return (
    <>
      <Routing/>
    </>
  );
};

export default App;
