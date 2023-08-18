import React from 'react'
import '../../../Style/comman.css'
import Table from '../../Helper Components/Table'

export default function Tasks() {
    const thead = ["No", "Tickect No", "Role", "Name", "View"]
    return (
        <div>
            <span>Tasks/Remainder</span>
            <Table thead={thead} tbody={
                [...Array(10).keys()].map(g => {
                    return (
                        <tr key={g}>
                            <td>Anom</td>
                            <td>99999</td>
                            <td>Male</td>
                            <td>Male</td>
                            <td>Male</td>
                        </tr>
                    )
                })
            } />
        </div>
    )

}
