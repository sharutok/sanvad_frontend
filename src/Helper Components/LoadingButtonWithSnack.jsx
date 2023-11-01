import React, { useContext } from 'react'
import { AppContext } from '../App'
import BarSnack from './BarSnack'
import { LoadingButton } from '@mui/lab'

function LoadingButtonWithSnack({ afterName, beforeName }) {
    const { btnSaving } = useContext(AppContext)
    return (
        <>
            <BarSnack />
            <div
                className='mt-5' >
                <LoadingButton
                    ref={null}
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{ width: "10rem" }}
                    loading={btnSaving}
                    startIcon={<></>}
                    loadingPosition="start"
                >
                    {btnSaving ? <p>{afterName}</p> : <p>{beforeName}</p>}
                </LoadingButton>
            </div>
        </>
    )
}

export default LoadingButtonWithSnack