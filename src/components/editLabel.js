import { Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../apis";
import { deletereward, editreward } from "../../shared/routes";

export default function EditRewardModal({ reward, onClose, onRewardEdited, isDelete}) {
    const [editedReward, setEditedReward] = useState(reward);
    const [isEditingReward, setIsEditingReward] = useState(false);
    const [editError, setEditError] = useState(null);
    // const [roles, setRoles] = useState([]);

    // useEffect(() => {
    //     auth({ method: "GET", url: getroles, data: { page: 1, limit: 100 } })
    //         .then(res => {
    //             setRoles(res.data.result);
    //         })
    //         .catch(error => console.error("Error fetching roles:", error));
    // }, []);

    const handleEditReward = () => {
        setIsEditingReward(true);

        auth({
            method: "POST",
            url: editreward,
            data: { reward_id: reward._id, reward_details: {title: editedReward.title, description: editedReward.description} },
        })
            .then(() => {
                onRewardEdited();
                onClose();
                toast.success("Reward edited successfully");
            })
            .catch(error => {
                setEditError("Error editing Reward. Please try again.");
                console.error("Reward edit error:", error);
            })
            .finally(() => {
                setIsEditingReward(false);
            });
    };
    // const handleInputChange = e => {
    //     const {value} = e.target;
    // };
    const deleteReward = () => {
        auth({method:'Post', url: deletereward, data:{reward_id:reward.id}})
        .then(()=>{
            onClose();
            onRewardEdited();
            toast.success("Reward deleted successfully");
        })
        .catch(error => {
            console.error("Reward edit error:", error);
        })
    }
    return (
        <Modal open={true} onClose={onClose}>
             {!isDelete ? (<div
                style={{
                    margin: "20px",
                    padding: "20px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    alignItems: "center",
                }}
            >
                <TextField
                    label="Title"
                    value={editedReward.title}
                    onChange={(e) => setEditedReward({ ...reward, title: e.target.value })}

                />
                <TextField
                    label="Description"
                    value={editedReward.description}
                    onChange={(e) => setEditedReward({ ...reward, description: e.target.value })}

                />
                <Button onClick={handleEditReward} variant="contained" disabled={isEditingReward}>
                    {isEditingReward ? "Editing..." : "Edit"}
                </Button>
                {editError && <p style={{ color: "red", marginTop: "10px" }}>{editError}</p>}
            </div>):(
            <div style={{
                margin: "20px",
                padding: "20px",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                alignItems: "center",
            }}>
                <h4>R U sure to delete this Reward</h4>
                <Button onClick={deleteReward} variant="contained" >Delete Reward</Button></div>)}
        </Modal>
    );
}
