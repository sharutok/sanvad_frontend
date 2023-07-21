import React from 'react'
import '../../Style/Table.css'
export default function Table({ thead, tbody }) {
    return (
        <div>
            <div >
                <table className='mt-5 ml-5'>
                    <thead >
                        <tr >
                            {thead.map((h, i) => {
                                return (
                                    <th key={i}>{h}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
