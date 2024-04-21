import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { IoIosPaper } from 'react-icons/io';
import { AppContext } from '../../App';
import { api } from '../../Helper Components/Api';
import ExportXL from '../../Helper Components/ExportXL';
import BackArrow from '../../Helper Components/SideComponent';
import { isPermissionToView } from '../../Static/StaticValues';
import AllTicketsView from './AllTicketsView';
import TicketSystemListView from './ListView';
import ButtonComponent from '../../Helper Components/ButtonComponent';

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


export default function TabList() {
    const [value, setValue] = useState(0);
    const [_search, _setSearch] = useState("")

    const { setDialogStatus } = useContext(AppContext)

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
                        {isPermissionToView("ticketsystem:export") &&
                            <ExportXL api={api.utils.download_excel} request={{ "data_module": "ticket" }} />

                        }
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
