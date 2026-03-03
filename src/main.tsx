import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProvider } from "./context/AppContext.tsx";
import "leaflet/dist/leaflet.css";
import { SocketProvider } from "./context/SocketContext.tsx";

export const authService = "https://auth-service-latest-gulk.onrender.com";
export const restaurantService = "https://restaurant-service-latest.onrender.com";
export const utilsService = "https://utils-service-latest.onrender.com";
export const realtimeService = "https://realtime-service-latest.onrender.com";
export const riderService = "https://rider-service-latest.onrender.com";
export const adminService = "https://admin-service-latest-41m2.onrender.com";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="438671917601-a0ep38c78ge04ld5ptqla40vd4mds3bi.apps.googleusercontent.com">
      <AppProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AppProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
