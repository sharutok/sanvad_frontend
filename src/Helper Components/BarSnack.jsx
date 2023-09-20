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
    const { snackBarPopUp, setSnackBarPopUp } = useContext(AppContext)

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
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={snackBarPopUp.state} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {snackBarPopUp.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
