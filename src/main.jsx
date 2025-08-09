import { StrictMode } from 'react'
import './index.css'
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Todo from "./pages/Todo/Todo";




const router = createBrowserRouter([
  {
    path : "signup",
    element : <Signup/>
  },
  {
    path : "login",
    element : <Login/>
  },
  {
    path : "todo",
    element : <Todo/>
  },
  {
    path : "/",
    element : <Login/>
  }
])

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

