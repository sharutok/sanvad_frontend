import React from 'react'
import Table from '../Helper Components/Table'
import { Link } from 'react-router-dom'
import BackArrow from '../Helper Components/SideComponent'
import { useQuery, } from '@tanstack/react-query'
import { Button, TextField } from '@mui/material'
import { api } from '../Helper Components/Api'
import { GrFormView, GrView } from 'react-icons/gr'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineDelete, AiOutlineDownload } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { MdClear } from 'react-icons/md'
import axios from 'axios'
import LoadingSpinner from '../Helper Components/LoadingSpinner'
import { AiOutlineUserAdd } from 'react-icons/ai'
import Fab from '@mui/material/Fab';
import dayjs from 'dayjs';
import CPagination from '../Helper Components/Pagination'
import TipTool from '../Helper Components/TipTool'
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


export default function UserManagementListView() {
    const thead = ["First Name", "Last Name", "Department", "Plant", "Organization", "User Status", "Click  "]
    const { isLoading, error, data } = useQuery(['sales-data'], async () => { return await axios.get(api.user_management.get_data) })
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    return (
        <div >
            <BackArrow location={"/home"} title={"User Management - Listing"} />
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
            {!isLoading ?
                <div>
                    <Table thead={thead} tbody={
                        data?.data.map((g, i) => {
                            return (
                                <tr className='p-10 mt-5' key={i}>
                                    <td >{g.first_name}</td>
                                    <td>{g.last_name}</td>
                                    <td>{g.department}</td>
                                    <td>{g.plant_name}</td>
                                    <td>{g.organization || "-"}</td>
                                    <td>{g.user_status || "-"}</td>
                                    <td >
                                        <SSplitButton id={g.id} />
                                    </td>
                                </tr>
                            )
                        })

                    } />
                    < CPagination />
                </div>
                : <LoadingSpinner />}
        </div>

    )
}




const options = [
    { S: 'View', M: GrView }, { S: 'Delete', M: AiOutlineDelete, }];

function SSplitButton({ id }) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup variant="" ref={anchorRef} aria-label="split button">
                <Button size="small" aria-controls={open ? 'split-button-menu' : undefined} aria-expanded={open ? 'true' : undefined} aria-label="select merge strategy" aria-haspopup="menu" onClick={handleToggle}>
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper sx={{ zIndex: 1, }} open={open} anchorEl={anchorRef.current} transition={"right-end"} disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'top' ? 'center left' : 'center right',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    <MenuItem className='no-underline' onClick={(event) => { console.log(event, "view", id); }}>
                                        <Link to={`/user/management/indvi/${id}`}>
                                            <div className='flex justify-center'>
                                                <span className='mt-1'>{<GrView size={15} />}</span>
                                                <span className='ml-3'>View</span>
                                            </div>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={(event) => { console.log(event, "delete", id); }}
                                    >
                                        <span >{<AiOutlineDelete size={15} />}</span>
                                        <span className='mx-3 mt-1' >Delete</span>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}



