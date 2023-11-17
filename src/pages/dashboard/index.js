import React from 'react';
import { useState,useEffect } from 'react';
import { auth } from '../../apis';
import Routes from '../../shared/routes';
import AdminNavbar from '../../components/adminNavbar';
import UserNavbar from '../../components/userNavbar';

const Dashboard = () => {
    const [images,setImages]=useState([]);
    useEffect(()=>{
        const url= Routes.dashboard
        auth({ method: "get", url: url })
            .then(data => {
                const url1 = Routes.getimageurl;
                const data_input={
                    image_id: data.data.result[0].imageId,
                }
                auth({ method: "post", url: url1, data: data_input })
                .then(data1 => {
                    data.data.result[0]["imageurl"]=data1.data;
                    console.log(data.data.result[0]);
                    setImages(data.data.result);
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
            });
    },[])

    return (
        <div>
            {localStorage.getItem("type") === "user" ? <UserNavbar /> : <AdminNavbar />}
            <div className="flex flex-wrap">
                {images.map((image, index) => (
                    <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                    <div className="bg-white shadow-md p-6 mb-4">
                        <a
                        href={image.imageurl?.data}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                        >
                        {image.imageurl?.data}
                        </a>
                        <h2 className="text-lg font-bold mt-2">Label: {image.topUserLabel}</h2>
                        <>----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</>
                    </div>
                    </div>
                ))}
            </div>
        </div>

    );
};


export default Dashboard;