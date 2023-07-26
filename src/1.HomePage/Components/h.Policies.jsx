import React from 'react'
import { FaUsers, FaIdBadge } from 'react-icons/fa';
import { IoIosPaper } from "react-icons/io";
import Stack from '@mui/material/Stack';
import '../../../Style/Policies.css'
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
                                <button class="button-48" role="button">
                                    <span class="text flex">
                                        < _icon.icons color='#808285' size={30} />
                                        <span className='mt-2 ml-2'>{_icon.iconTitle}</span>
                                    </span>
                                </button>
                            </Stack>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
