import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../apis";
import routes from "../shared/routes";

const Logout = () => {
    const history = useNavigate();
    const Deletedata = () => {
        const url = routes.signout;
        auth({ method: "post", url: url })
            .then(data => {
                console.log(data);
                localStorage.clear();
                history("/");
                toast.success("Logout successful!", {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <div className="">
            <button onClick={() => Deletedata()}>Logout</button>
        </div>
    );
};

export default Logout;
