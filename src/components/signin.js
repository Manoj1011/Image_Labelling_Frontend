import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { noAuth } from "../apis";
import routes from "../shared/routes";

const Signin = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const PostData = () => {
        const url = routes.signin;
        const data = {
            password,
            username
        };
        noAuth({ method: "post", url: url, data: data })
            .then(data => {
                console.log("data :", data.data.token);
                if (data.error) {
                    console.log(data.error);
                } else {
                    const d = data.data.token;
                    localStorage.setItem('jwt',d);
                    localStorage.setItem('type',data.data.user.type);
                    if(data.data.user.type=="user"){
                        navigate('/user');
                    }else{
                        navigate('/admin');
                    }
                    toast.success("Login successful!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch(error => {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };
    return (
        <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:'center'}}>
            <Box sx ={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:'center'}} >
                <Typography variant="h5" fontWeight="bold" style={{margin:'15px'}}>
                    Log in to your Image Labelling App
                </Typography>
                <TextField
                    type="text"
                    label="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{'margin':'4px'}}
                />
                <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{margin:'4px'}}
                />
            </Box>
            <Button
                className="px-10 py-5 m-8 bg-rose-400 w-fit self-center"
                onClick={() => PostData()}
                variant="contained"
                style={{margin:'4px'}}
            >
                Login
            </Button>
            <Typography variant="h6" className="text-red-600 underline" gutterBottom>
                <Link to="/signup">Don&apos;t have an account?</Link>
            </Typography>
        </Box>
    );
};

export default Signin;
