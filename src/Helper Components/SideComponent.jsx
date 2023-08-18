import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

export default function BackArrow({ title, location }) {
    return (
        <div className='flex gap-4'>
            <Link to={location || "/home"}>
                <div className='ml-2 mt-3'>
                    <IconButton aria-label="delete">
                        <ArrowBackIcon />
                    </IconButton>
                </div>
            </Link>
            <h1 className='text-[2rem]'>{title}</h1>
        </div>
    )
}

