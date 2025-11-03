import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// 🟢 Import BookingProvider and BookingModal
import { BookingProvider } from "./context/BookingContext";
import BookingModal from "./components/booking/BookingModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Wrap your entire app in the BookingProvider */}
    <BookingProvider>
      <App />
      {/* Mount globally so it's accessible anywhere */}
      <BookingModal />
    </BookingProvider>
  </StrictMode>
);
