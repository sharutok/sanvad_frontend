import { useState } from 'react';
import { IoIosPaper } from 'react-icons/io'
import { FiSearch } from 'react-icons/fi'
import { MdClear, MdDeleteOutline } from 'react-icons/md'
import { AiOutlineDownload } from 'react-icons/ai'
import { Fab, IconButton, TextField, Tooltip } from '@mui/material'
import PropTypes from 'prop-types';
import axios from 'axios'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllTicketsView from './AllTicketsView';
import TicketSystemListView from './ListView';
import BackArrow from '../../Helper Components/SideComponent';
import { exportToCSV, isPermissionToView } from '../../Static/StaticValues';
import { api } from '../../Helper Components/Api';
import moment from 'moment';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

async function exportData() {
    try {
        const data = await axios.post(api.utils.download_excel, { "data_module": "ticket" })
        exportToCSV(data?.data?.data, `Ticket Export ${moment().format("DD_MM_YYYY")}`)
    } catch (error) {
        console.log("error in exporting", error);
    }
}

export default function TabList() {
    const [value, setValue] = useState(0);
    const [_search, _setSearch] = useState("")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='mt-20'>
            <Box sx={{ width: '100%' }}>
                <div className='flex justify-between '>
                    <BackArrow location={"/home"} title={"Ticketing System - Listing"} />
                    <div className='flex gap-4  mr-10'>
                        <TextField onChange={(e) => _setSearch(e.target.value)} sx={{ width: "20rem" }} id="outlined-basic" label="Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                        <ButtonComponent onClick={() => { window.location.href = "/ticket/sys/new" }} icon={<IoIosPaper color='white' size={"23"} />} btnName={"New Ticket"} />
                        {isPermissionToView("ticketsystem:export") && <ButtonComponent onClick={() => exportData()} icon={<AiOutlineDownload color='white' size={"23"} />} btnName={"Export"} />}
                    </div>
                </div>
                <div className='px-10 mt-5'>
                    <Box clas sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Pending Tickets" {...a11yProps(0)} />
                            {isPermissionToView("ticketsystem:allticket") && <Tab label="All Tickets" {...a11yProps(1)} />}
                        </Tabs>
                    </Box>
                </div>
                <CustomTabPanel value={value} index={0}>
                    <TicketSystemListView _search={_search} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <AllTicketsView _search={_search} />
                </CustomTabPanel>
            </Box>
        </div>
    );
}
const ButtonComponent = ({ onChange, icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            onChange={onChange}
            {...props}
            className=' no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}