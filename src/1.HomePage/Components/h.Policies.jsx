import React from 'react'
import { FaUsers, FaIdBadge } from 'react-icons/fa';
import { IoIosPaper } from "react-icons/io";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Policies() {
    const icons = [
        {
            icons: FaUsers, iconTitle: "HR Policies",
        }, {
            icons: FaIdBadge, iconTitle: "IT Policies",
        },
    ]

    return (
        <div>
            <h1>Policies</h1>
            <div className='flex justify-center'>
                {icons.map((_icon) => {
                    return (
                        <div key={_icon.iconTitle} className='m-2'>
                            <Stack direction="row" spacing={2}>
                                <Button style={{ color: "white", background: "grey" }} variant="outlined" startIcon={<_icon.icons size={40} />}>
                                    {_icon.iconTitle}
                                </Button>
                            </Stack>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
