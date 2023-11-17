import React from 'react';
import { Grid } from '@mui/material';
import Navbar from '../../components/Navbar';
import {useState, useEffect } from 'react';
import {auth} from '../../apis';
import routes from '../../shared/routes';
import Autocomplete from '@mui/material/Autocomplete';
import { toast } from "react-toastify";
import { Button, Container, TextField, Typography } from '@mui/material';
import AdminNavbar from '../../components/adminNavbar';
import Routes from '../../shared/routes';

const AdminPage = () => {
  const [image, setImage] = useState(null);
  const [label, setLabel] = useState('');
  const [labelToDelete, setLabelToDelete] = useState('');
  const [imagelink, setImagelink] = useState("");

  const handleImageChange = event => {
    const file = event.target.files[0];
    setImage(file);
    const url = `${process.env.REACT_APP_API_URL}${Routes.uploadS3}`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "image");
    fetch(url, {
        method: "post",
        body: formData,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        credentials: "include",
    })
        .then(res => res.json())
        .then(data => {
            setImagelink(data.data);
            console.log(data.data);
        })
        .catch(err => {
            console.log(err);
        });
};

  const addImage = async () => {
    if (imagelink) {
      const data= {
        s3url: imagelink,
      }
      const url = routes.createImage;
      auth({ method: "post", url: url, data: data })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setLabel('');
                    toast.success("Image added successfully!", {
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
    } else {
      console.error('No file selected');
    }
  };

  const addLabel = async () => {
    if (label.trim()) {
      const data= {
        label: label,
      }
      const url = routes.createlabel;
      auth({ method: "post", url: url, data: data })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setLabel('');
                    toast.success("Label added successfully!", {
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
    } else {
      console.error('Label cannot be empty');
    }
  };

  const deleteLabel = async () => {
    if (labelToDelete.trim()) {
      const data= {
        label: labelToDelete,
      }
      const url = routes.deletelabel;
      auth({ method: "post", url: url, data: data })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setLabelToDelete('');
                    toast.success("Label deleted successful!", {
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
    } else {
      console.error('Label to delete cannot be empty');
    }
  };
  return (
    <>
    <AdminNavbar />
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Image Labeling
      </Typography>

      <Typography variant="h5" gutterBottom>
        Add Image
      </Typography>
      <input
        type="file"
        onChange={handleImageChange}
        className="mb-2"
        accept="image/*" />
      <Button variant="contained" onClick={addImage}>
        Add Image
      </Button>

      <Typography variant="h5" className="mt-4" gutterBottom>
        Add Label
      </Typography>
      <TextField
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Enter Label"
        fullWidth
        className="mb-2" />
      <Button variant="contained" onClick={addLabel}>
        Add Label
      </Button>

      <Typography variant="h5" className="mt-4" gutterBottom>
        Delete Label
      </Typography>
      <TextField
        type="text"
        value={labelToDelete}
        onChange={(e) => setLabelToDelete(e.target.value)}
        placeholder="Enter Label to Delete"
        fullWidth
        className="mb-2" />
      <Button variant="contained" onClick={deleteLabel}>
        Delete Label
      </Button>
    </Container></>
  );
};



export default AdminPage;


