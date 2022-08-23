import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <StrictMode>
    <Auth0Provider 
      domain="dev--1geye83.us.auth0.com"
      clientId="Aim8LKjKkyLvEnbojnbfl7eJcmrVsKcj"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);