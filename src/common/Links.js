import React from "react";
import Error404 from "../pages/404";
import AdminPage from "../pages/admin";
import LandingPage from "../pages/landing";
import Signup from "../pages/signup";
import SignIn from "../pages/SignIn";
import UserPage from "../pages/user";
import Dashboard from "../pages/dashboard";

export const Links = [
    {
        name: "Landing",
        path: "/",
        element: <LandingPage />,
        showInNavigation: true,
    },
    {
        name: "Signup",
        path: "/signup",
        element: <Signup />,
        showInNavigation: true,
    },
    {
        name: "Admin",
        path: "/admin",
        element: <AdminPage />,
        showInNavigation: true,
    },
    {
        name: "User",
        path: "/user",
        element: <UserPage />,
        showInNavigation: true,
    },
    {
        name: "Dashboard",
        path: "/dashboard",
        element: <Dashboard />,
        showInNavigation: true,
    },
    {
        name: "SignIn",
        path: "/signin",
        element: <SignIn />,
        showInNavigation: true,
    },
    {
        name: "Error404",
        path: "*",
        element: <Error404 />,
        showInNavigation: true,
    }
];
