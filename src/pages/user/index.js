import React, {useContext} from 'react';
import UserNavbar from '../../components/userNavbar';
import { DataGrid } from "@mui/x-data-grid";
import { useState,useEffect } from 'react';
import { auth } from '../../apis';
import Routes from '../../shared/routes';
import UserStore from '../../contexts/UserStore';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
  } from '@mui/material';


const UserPage = () => {
    const { images,setImages } = useContext(UserStore);
    const [labels,setLabels] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const [id, setId] = useState("");
    const [label,setLabel] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLabelChange = (event) => {
        setSelectedLabel(event.target.value);
    };

    const handleSubmit = () => {
        console.log(`Label selected: ${selectedLabel}`);
        const url = (label === "Assign") ? Routes.userassignlabel : Routes.usereditlabel;
        const data = {
            image_id: id,
            text: selectedLabel
        }
        auth({ method: "post", url: url ,data : data})
            .then(data => {
                console.log(data);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
        handleClose();
    };

      
    useEffect(()=>{
        const url= Routes.home;
        const url1= Routes.getlabels;
        auth({ method: "get", url: url })
            .then(data => {
                let ID = data.data.results;
                ID.map((id)=>{
                    id["id"]=id._id;
                })
                console.log(ID);
                setImages(data.data.results);
            })
            .catch(err => {
                console.log(err);
            });

        auth({ method: "get", url: url1 })
            .then(data => {
                console.log(data.data.result);
                const labelsArray = data.data.result.map((item) => item.label);
                console.log(labelsArray);
                setLabels(labelsArray);
            })
            .catch(err => {
                console.log(err);
            });
    },[])
    const handleAssignLabel = (id) => {
        setId(id);
        setLabel("Assign");
        handleOpen(); 
    };
    const handleReassignLabel = id => {
        setId(id);
        setLabel("Reassign");
        handleOpen(); 
    };
    const handleDeleteLabel = id => {
        console.log(id);
        const data= {
            image_id : id,
        }
        const url= Routes.userdeletelabel
        auth({ method: "post", url: url , data:data })
            .then(data => {
                setImages(data);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    };
    

    const columns = [
        { field: "imageurl", headerName: "Image", width: 400, renderCell: (params) => (
            <a href={params.value} target="_blank" rel="noopener noreferrer">{params.value}</a>
          ) },
        { field: "userData", headerName: "Label", width: 100, valueGetter: (params) => params.row.userData?.user_label },
        {
            field: "actions",
            headerName: "Actions",
            width: 400,
            align: "left",
            headerAlign: "left",
            sortable: false,
            renderCell: params => {
                const id = params.row.id;
    
                return (
                    <>
                        <button onClick={() => handleAssignLabel(id)}> Assign Label</button>
                        <button onClick={() => handleReassignLabel(id)}>Reassign Label</button>
                        <button onClick={() => handleDeleteLabel(id)}>Delete Label</button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Select Label</DialogTitle>
                            <DialogContent>
                            <FormControl fullWidth>
                                <InputLabel id="label-select-label">Label</InputLabel>
                                <Select
                                labelId="label-select-label"
                                id="label-select"
                                value={selectedLabel}
                                onChange={handleLabelChange}
                                label="Label"
                                >
                                    {labels.map((label, index) => (
                                        <MenuItem key={index} value={label}>
                                        {label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} color="primary">
                                Submit
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <UserNavbar />
            <Box sx={{ width: "80%", margin: "auto", height: 700 }}>
                {images ? (
                    <DataGrid
                        rows={images}
                        columns={columns}
                    />
                ) : ( 
                    "No Images"
                )}
            </Box>
        </div>

    );
};


export default UserPage;