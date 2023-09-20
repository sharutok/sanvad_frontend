import { Dialog, Button, DialogTitle, DialogActions } from "@mui/material";
import { AppContext } from "../App";
import React, { useContext } from 'react'
import { AiOutlineClose } from "react-icons/ai";

export default function DialogsBox({ btnShow, body, title }) {
    const { dialogStatus, setDialogStatus } = useContext(AppContext)

    const handleClickOpen = () => {
        setDialogStatus(true);
    };

    const handleClose = () => {
        setDialogStatus(false);
    };

    return (
        <div>
            {btnShow && <Button variant="outlined" onClick={handleClickOpen}>
                dialogStatus alert dialog
            </Button>}
            <Dialog
                maxWidth={"xl"}
                open={dialogStatus}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {title && <DialogTitle id="alert-dialog-title">
                    <div className="flex justify-between">
                        {title}
                        <ButtonComponent onClick={handleClose} icon={<AiOutlineClose color='white' size={"23"} />} />
                    </div>
                </DialogTitle>}
                <React.Fragment>
                    <React.Fragment >
                        {body}
                    </React.Fragment>
                </React.Fragment>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Disagree</Button> */}
                    {/* <Button onClick={handleClose} autoFocus>
                        Book conference
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}
const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className=' no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}