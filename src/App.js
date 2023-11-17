import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routers from "./common/Routers";
import UserStore from "./contexts/UserStore";
import "./index.css";

function getSession(){
  return localStorage.getItem("jwt") || null;
}

function getType(){
  return localStorage.getItem("type") || "user";
}

function deleteSession(){
  localStorage.clear();
}

function App() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [session, setSession] = useState(localStorage.getItem("session") || null);
    const [user, setUser] = useState(null);
    const [images,setImages] = useState([]);
    const customTheme = createTheme({
        palette: {
            background: {
                default: "#5BFH67",
            },
            primary: {
              main: "#04659D",
            },
            secondary:{
              main:"#EDG7H1"
            },
        },
    });

    return (
        <UserStore.Provider value={{ theme, setTheme, session, setSession, user, setUser, getSession, images, setImages, getType, deleteSession }}>
            <BrowserRouter>
                <ThemeProvider theme={customTheme}>
                        <CssBaseline />
                        <Routers />
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme={theme}
                        />
                </ThemeProvider>
            </BrowserRouter>
        </UserStore.Provider>
    );
}

export default App;
