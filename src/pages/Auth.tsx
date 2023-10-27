import React, { useState } from "react";
import { Input, message } from "antd";
import { authentication } from "../api/auth";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import './../styles/auth.css';

const Auth: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const verifyAuth = async () => {
    console.log("verify auth");

    const isAuth = await authentication(apiKey);
    if (isAuth) {
      messageApi.open({
        type: "success",
        content: "Vous êtes connecté",
      });
      localStorage.setItem("api_key", apiKey);
      navigate("/movie");
    } else {
      messageApi.open({
        type: "error",
        content: "Verifiez votre clé d'api.",
      });
      return;
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!apiKey) {
      messageApi.open({
        type: "error",
        content: "Champ requis",
      });
      return;
    }
    try {
      console.log("login", apiKey);
      await verifyAuth();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Une erreur s'est produite",
      });
      console.error(error);
    }
  };

  const copyToClipBoard = () => {
    copy("7733263982f2fbede06debb35a9009ff");
  };
  return (
    <div>
      <h2 className="text-center m-3">TP-Mionja</h2>
      <div className="login-container container border">
        {contextHolder}
        <form className="px-4 pt-2 pb-4 mx-auto" style={{ maxWidth: 500 }}>
          <h5 className="bold">Film</h5>
          <div className="my-3">
            <label htmlFor="apiKey">Clé d'API</label>
            <Input
              name="apiKey"
              required
              onChange={(e) => setApiKey(e.target.value.trim())}
              size="large"
            />
          </div>
          <div className="text-center"></div>
          <div className="d-grid gap-2">
            <button
              className="btn bg-danger text-white w-100"
              onClick={copyToClipBoard}
            >
              Copier clé existante
            </button>
            <button
              className="btn bg-dark text-white w-100"
              onClick={handleSubmit}
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Auth;
