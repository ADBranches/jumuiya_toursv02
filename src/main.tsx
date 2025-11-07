import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import BookingModal from "./components/booking/BookingModal";
import { ErrorBoundary } from "./components/ErrorBoundary";

// ✅ 1️⃣ Fix for mobile address bar resizing (run before React mounts)
function updateVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Run once on load
updateVh();

// Debounced resize handler WITHOUT `any`
let vhResizeTimeout: number | undefined;

window.addEventListener("resize", () => {
  if (vhResizeTimeout !== undefined) {
    window.clearTimeout(vhResizeTimeout);
  }
  vhResizeTimeout = window.setTimeout(updateVh, 150);
});

// ✅ 2️⃣ Mount React app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <>
        <App />
        <BookingModal />
      </>
    </ErrorBoundary>
  </StrictMode>
);
