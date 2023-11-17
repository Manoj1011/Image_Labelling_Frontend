import { Grid } from "@mui/material";
import React from "react";
import Signup from "../../components/signup";
import Title from "../../shared/Title";
import Navbar from "../../components/Navbar";
// import Signin from "../../components/signin";

export default function SignUp() {
    return (
        <div className="bg-white flex flex-col align-center items-center justify-center min-h-screen text-black">
            <Title title={"Sign Up"} />
            <Navbar />
                <Signup />
        </div>
    );
}
