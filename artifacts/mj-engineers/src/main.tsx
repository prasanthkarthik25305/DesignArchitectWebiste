import { setBaseUrl } from "@workspace/api-client-react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set API base URL based on environment
setBaseUrl(import.meta.env.DEV ? "http://localhost:8080" : "https://your-backend-url.vercel.app");

createRoot(document.getElementById("root")!).render(<App />);
