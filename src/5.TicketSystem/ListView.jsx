import React from 'react'
import Table from '../Helper Components/Table'
import { RiDeleteBin6Line } from 'react-icons/ri'
import CPagination from '../Helper Components/Pagination'
import BackArrow from '../Helper Components/SideComponent'
import { Fab, TextField } from '@mui/material'
import TipTool from '../Helper Components/TipTool'
import { MdClear } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { AiOutlineDownload, AiOutlineUserAdd } from 'react-icons/ai'

export default function TicketSystemListView() {
    const thead = ["TIcket No",]
    return (
        <div>
            <div>
                <BackArrow location={"/home"} title={"Ticketing System - Listing"} />
                <div className='mt-10 ml-5 flex gap-4'>
                    <TextField id="outlined-basic" label="Smart Search" variant="outlined" size='small' />
                    <TipTool body={
                        <Fab size='small' aria-label="add">
                            <MdClear size={"20"} />
                        </Fab>} title={"Clear"} position={"top"} />
                    <TipTool body={
                        <Fab size='small' aria-label="add">
                            <FiSearch size={"20"} />
                        </Fab>} title={"Search"} position={"top"} />
                    <TipTool body={
                        <Fab onClick={() => window.location.href = "/user/management/new"} size='small' aria-label="add">
                            <AiOutlineUserAdd size={"20"} />
                        </Fab>
                    } title={"Add User"} position={"top"} />
                    <TipTool body={
                        <Fab size='small' aria-label="add">
                            <AiOutlineDownload size={"20"} />
                        </Fab>
                    } title={"Export"} position={"top"} />
                </div>
                <Table thead={thead}
                // tbody={
                // data?.data.map((g, i) => {
                //     return (
                //         <tr key={i}>
                //             <td >{g.first_name}</td>
                //             <td>{g.last_name}</td>
                //             <td>{g.department}</td>
                //             <td>{g.plant_name}</td>
                //             <td>{g.organization || "-"}</td>
                //             <td>{g.user_status || "-"}</td>
                //             <td >
                //               <Link to={`/user/management/indvi/${g.id}`}><GrFormView size={"20"} /></Link>
                //           </td>
                //             <td >
                //                 <RiDeleteBin6Line size={"20"} />
                //             </td>
                //         </tr>
                //     )
                // })
                // }
                />
                < CPagination />
            </div>
        </div>
    )
}
