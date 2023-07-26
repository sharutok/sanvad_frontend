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
import { api } from '../Helper Components/Api';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function ListView() {
    // const thead = ["Budget No", "Purpose code", "Purpose", "Line No", "Plant/Location", "Dept", "Capex Group", "Class", "Category (Nature of Asset)", "Asset description", "Details", "Rate", "Qty", "Uom", "Final Budget", "Remarks", "View", "Delete"]
    const thead = ["Budget No", "Purpose code", "Purpose", "Line No", "Dept", "Capex Group", "Class", "Category (Nature of Asset)", "Final Budget", "View", "Delete"]
    const { isLoading, error, data } = useQuery(['sales-data'], async () => { return await axios.get(api.capex.get_data) })
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
                data?.data.map((c, i) => {
                    return (
                        <tr key={i}>
                            <td>{c.budget_no}</td>
                            <td>{c.purpose_code}</td>
                            <td>{c.purpose_description}</td>
                            <td>{c.line_no}</td>
                            {/* <td>{c.plant}</td> */}
                            <td>{c.dept}</td>
                            <td>{c.capex_group}</td>
                            <td>{c.capex_class}</td>
                            <td>{c.category}</td>
                            {/* <td>{c.asset_description}</td> */}
                            {/* <td>{c.details}</td> */}
                            {/* <td>{c.rate}</td> */}
                            {/* <td>{c.qty}</td> */}
                            {/* <td>{c.uom}</td> */}
                            <td>{c.final_budget}</td>
                            {/* <td>{c.remarks}</td> */}
                            <td>
                                <Link to={`/capex/indvi/${c.id}`}><GrFormView /></Link>
                            </td>
                            <td>
                                <RiDeleteBin6Line />
                            </td>
                        </tr>
                    )
                })
            }
            />
        </div>
    )
}


