import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "./routes";

export default function App() {
  return (
    <HelmetProvider>
      <AppRoutes />
    </HelmetProvider>
  );
}
