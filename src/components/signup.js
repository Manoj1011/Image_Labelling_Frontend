import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { noAuth } from "../apis";
import routes from "../shared/routes";
// import "./styles.css";

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPasword] = useState("");
    const isPasswordValid = true;
    const PostData = () => {
        const url = routes.signup;
        const data = {
            username: name,
            password
        };
        console.log(`${process.env.REACT_APP_API_URL}${url}`)
        noAuth({ method: "post", url: url, data: data })
            .then(data => {
                console.log(data.success);
                if (data.success) {
                    toast.success("Sign-up successful!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // const token = data.data.token;
                    // localStorage.setItem({ token });
                    navigate("/signin");
                } 
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Box className="flex flex-col justify-center items-center text-center ">
            <Box component="form" sx={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:'center'}}>
                <Typography variant="h5" >
                    Sign Up
                </Typography>
                <TextField
                    type="text"
                    label="username"
                    id="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ backgroundColor: "white", margin:'4px' }}
                />
                <TextField
                    type="password"
                    label="Password"
                    id="Password"
                    value={password}
                    onChange={e => setPasword(e.target.value)}
                    helperText={isPasswordValid ? "" : "choose a strong password"}
                    style={{ backgroundColor: "white", margin:'4px' }}
                />
                <Box className="my-3" color="primary">
                    <Button
                        variant="contained"
                        className="px-10 py-5 m-8"
                        onClick={() => PostData()}
                        color="primary"
                    >
                        signup
                    </Button>
                </Box>
                <Typography variant="h6" gutterBottom className="text-rose-600 underline">
                    <Link className="" to="/signin">
                        Already have an account ?
                    </Link>
                </Typography>


            </Box>
        </Box>
    );
};

export default Signup;
