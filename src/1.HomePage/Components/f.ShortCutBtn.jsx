import React from 'react'
import { FaUsers, FaIdBadge } from 'react-icons/fa';
import { IoIosPaper } from "react-icons/io";
import '../../../Style/ShortCutBtn.css'
export default function ShortCutBtn() {

    const icons = [
        {
            icons: FaUsers, iconTitle: "User Management",
        }, {
            icons: FaIdBadge, iconTitle: "Visitor Management",

        }, {
            icons: IoIosPaper, iconTitle: "Ticketing Management",
        }
    ]

    return (
        <div>
            <h1>Shortcuts</h1>
            <div className='flex gap-4'>
                {icons.map((_icon) => {
                    return (
                        <div>
                            <button class="button-4" role="button">
                                <span >
                                    < _icon.icons size={30} color='#808285' />
                                    <span >{_icon.iconTitle}</span>
                                </span>
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
