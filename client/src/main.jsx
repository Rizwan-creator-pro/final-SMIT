import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router/Routes";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";

// Import DarkModeProvider
import { DarkModeProvider } from "./contexts/DarkModeContext";

// TanStack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <DarkModeProvider>
      {" "}
      {/* Wrapping the app with DarkModeProvider */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </DarkModeProvider>
  </AuthProvider>
);
