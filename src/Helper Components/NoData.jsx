import { Stack } from '@mui/material'
import React from 'react'
import IMAGES from '../assets/Image/Image'

export default function NoData() {
    return (
        <div> <Stack spacing={1} alignItems={"center"} >
            <img loading='lazy' src={IMAGES.no_data} alt="" width={150} />
            {/* <span className='font-bold'>NO </span> */}
        </Stack></div>
    )
}
