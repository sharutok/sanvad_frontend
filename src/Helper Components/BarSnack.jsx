import React, { useState, useContext, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AppContext } from '../App';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={0} ref={ref} variant="filled" {...props} />;
});

export default function BarSnack() {
    const { snackBarPopUp, setSnackBarPopUp, snackfn, setSnackfn } = useContext(AppContext)

    const handleClick = () => {
        setSnackBarPopUp({ ...snackBarPopUp, state: true });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarPopUp({ ...snackBarPopUp, state: false });
    };

    return (
        <Stack sx={{ width: '10rem' }} >
            <Snackbar open={snackBarPopUp.state}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                autoHideDuration={2000} onClose={handleClose}>
                <div className='mt-10'>

                    {snackBarPopUp.severity === "s" ? <Alert icon={<BsCheckCircleFill />} onClose={handleClose} severity="error" sx={{ background: "#DCF4E6", color: "#00A959", borderRadius: "7px" }}>
                        {snackBarPopUp.message}
                    </Alert> : <Alert icon={<BsXCircleFill />} onClose={handleClose} severity="error" sx={{ background: "#f4dcdc", color: "#a90000", borderRadius: "7px" }}>
                        {snackBarPopUp.message}
                    </Alert>}
                </div>
            </Snackbar>
        </Stack>
    );
}
