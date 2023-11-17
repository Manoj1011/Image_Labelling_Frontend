import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Signin from "../../components/signin";
import Title from "../../shared/Title";
import Navbar from "../../components/Navbar";

export default function SignIn() {
    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:'center'}} >
            <Navbar />
            <Title title={"Sign In"} />
            <Grid item xs={12} sm={8} md={6} lg={7}>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:'center'}} >
                    <Signin />
                </div>
            </Grid>
        </div>
    );
}
