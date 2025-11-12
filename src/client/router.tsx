import { createBrowserRouter, type RouteObject } from "react-router";
import App from "./app";
import EmailPreviewPage from "./email";
import Home from "./home";
import SignIn from "./signin";

// Define routes - all client-side only
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/agent",
    element: <App />
  },
  {
    path: "/e/:id",
    element: <EmailPreviewPage />
  },
  {
    path: "/signin",
    element: <SignIn />
  }
];

// Create browser router for client-side
export const router = createBrowserRouter(routes);
