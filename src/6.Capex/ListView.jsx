import React from 'react'
import Table from '../Helper Components/Table'
import TipTool from '../Helper Components/TipTool'
import Fab from '@mui/material/Fab';
import { GrFormView } from 'react-icons/gr'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ImUpload } from 'react-icons/im'
import { AiOutlineDownload, AiOutlineUserAdd } from 'react-icons/ai'
import { FaFileExcel } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { TextField } from '@mui/material';

import BackArrow from '../Helper Components/SideComponent';
import { Link } from 'react-router-dom';

export default function ListView() {
    const thead = ["Budget No", "Purpose code", "Purpose", "Line No", "Plant/Location", "Dept", "Capex Group", "Class", "Category (Nature of Asset)", "Asset description", "Details", "Rate", "Qty", "Uom", "Final Budget", "Remarks", "View", "Delete"]
    return (
        <div>
            <BackArrow title={"Capex Listings"} />
            <div className='mt-10 ml-5 flex gap-4'>
                <TextField id="outlined-basic" label="Smart Search" variant="outlined" size='small' />
                <TipTool body={
                    <Fab size='small' aria-label="add">
                        <FiSearch size={"20"} />
                    </Fab>} title={"Search"} position={"top"} />
                {/* <TipTool body={
                    <Fab onClick={() => window.location.href = "/user/management/new"} size='small' aria-label="add">
                        <AiOutlineUserAdd size={"20"} />
                    </Fab>
                } title={"Add User"} position={"top"} /> */}
                <TipTool body={
                    <Fab size='small' aria-label="add">
                        <AiOutlineDownload size={"20"} />
                    </Fab>
                } title={"Export"} position={"top"} />
                <TipTool body={
                    <Fab size='small' aria-label="add">
                        <ImUpload size={"20"} />
                    </Fab>
                } title={"Upload Templete"} position={"top"} />
                <TipTool body={
                    <Fab size='small' aria-label="add">
                        <FaFileExcel size={"20"} />
                    </Fab>
                } title={"Download Templete"} position={"top"} />
            </div>
            <Table thead={thead} tbody={
                <tr >
                    <td>"g.firs"</td>
                    <td>"g.firs"</td>
                    <td>"g.firs"</td>
                    <td>"g.las"</td>
                    <td>"g.las"</td>
                    <td>"g.las"</td>
                    <td>"g.depa"</td>
                    <td>"g.depa"</td>
                    <td>"g.depa"</td>
                    <td>"g.plan"</td>
                    <td>"g.plan"</td>
                    <td>"g.plan"</td>
                    <td>"g.organi"</td>
                    <td>"g.organi"</td>
                    <td>"g.organi"</td>
                    <td>"g.user_"</td>
                    <td>
                        <Link to={`/capex/indvi/${"123qwx"}`}><GrFormView /></Link>
                    </td>
                    <td>
                        <RiDeleteBin6Line />
                    </td>
                </tr>} />
        </div>
    )
}


