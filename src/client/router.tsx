import { createBrowserRouter, type RouteObject } from "react-router";
import App from "./app";
import Home from "./home";
import SignIn from "./signin";

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
    path: "/signin",
    element: <SignIn />
  }
];

export const router = createBrowserRouter(routes);
