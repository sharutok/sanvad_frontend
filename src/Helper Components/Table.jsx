import React from 'react'
import '../../Style/Table.css'
export default function Table({ thead, tbody }) {
    return (

        <div className='table-container '>
            <table className='table w-[100%]'>
                <thead className='thead'>
                    <tr >
                        {thead.map((h, i) => {
                            return (
                                <th className='th' key={i}>{h}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        </div>
    )
}
