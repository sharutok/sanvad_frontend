import React, { useState, useContext, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AppContext } from '../App';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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
                    <Alert onClose={handleClose} severity="success" sx={{ background: "#84cc16", width: '100%', borderLeft: "10px solid #4d7c0f" }}>
                        {snackBarPopUp.message}
                    </Alert>
                </div>
            </Snackbar>
        </Stack>
    );
}
