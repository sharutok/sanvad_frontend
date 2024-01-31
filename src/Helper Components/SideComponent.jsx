import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';



export default function BackArrow({ title, location }) {

    return (
        <div className='flex gap-2'>
            <Link to={location || "/home"}>
                <div className='ml-10 mt-2 bg-[#555259] rounded-3xl px-2 cursor-pointer'>
                    <IconButton size='small' aria-label="delete">
                        <ArrowBackIcon sx={{ color: "white" }} />
                    </IconButton>
                </div>
            </Link>
            <span style={{ fontFamily: "Brandon Grotesque" }} className='text-[2rem]'>{title}</span>
        </div>
    )
}

