import React, { useContext, useRef, useState } from 'react'
import { FiSave, FiSearch } from 'react-icons/fi'
import { Card, CardContent, Input, Stack, TextField } from '@mui/material';
import BackArrow from '../Helper Components/SideComponent';
import { CgExport, CgImport } from 'react-icons/cg';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BudgetListVIew from './BudgetListVIew';
import CapexListView from './CapexListView';
import DialogsBox from '../Helper Components/DialogsBox';
import { AppContext } from '../App';
import { CloudUpload, Search } from 'tabler-icons-react';



export default function ListView() {
    const { dialogStatus, setDialogStatus } = useContext(AppContext)
    const [_search, _setSearch] = useState("")

    return (
        <div>
            <div className='flex justify-between mt-5'>
                <BackArrow location={"/home"} title={"Capex - Listing"} />
                <div className='flex gap-4 mt-3 mr-20'>
                    <TextField onChange={(e) => _setSearch(e.target.value)} sx={{ width: "20rem" }} id="outlined-basic" label="Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                    <ButtonComponent onClick={() => { setDialogStatus(true) }} icon={<CgImport color='white' size={"23"} />} btnName={"Import .xlsx"} />
                    <ButtonComponent icon={<CgExport color='white' size={"23"} />} btnName={"Export"} />
                </div>
            </div>
            <div className='mt-10 px-5'>
                <BasicTabs _search={_search} _setSearch={_setSearch} />
            </div>
            <DialogsBox title={"Upload Excel"} body={<UploadFiles />} />
        </div>
    )
}


function BasicTabs({ _search, _setSearch }) {
    const [value, setValue] = React.useState(0);
    const { count, setCount, page, setPage } = useContext(AppContext)

    const handleChange = (event, newValue) => {
        setCount(1)
        // _setSearch("")
        setPage(1)
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Budget List" {...a11yProps(0)} />
                    <Tab label="Capex List" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <BudgetListVIew _search={_search} _setSearch={_setSearch} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CapexListView _search={_search} _setSearch={_setSearch} />
            </CustomTabPanel>
        </Box>
    );
}
const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className='w-fit no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}
const UploadFiles = () => {
    const inputFile = useRef(null)

    const onButtonClick = () => {
        inputFile.current.click();
    };
    return (
        <div className='flex justify-center'>
            <div className='w-fit'>
                <div className='flex gap-7 p-10' >
                    <Card
                        onClick={onButtonClick}
                        className="ts-card" style={{ cursor: "pointer " }} >
                        <CardContent  >
                            <Typography className="ts-card-typo" sx={{ fontSize: 14 }} >
                                <CloudUpload
                                    size={38}
                                    strokeWidth={2}
                                    color={'grey'}
                                />
                            </Typography>
                            <Typography className="ts-card-typo" sx={{ fontWeight: "bold" }} >
                                Click Here to Upload Files
                            </Typography>
                            <Typography className="ts-card-typo" variant="h5" component="div">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <label htmlFor="contained-button-file">
                                        <Input type='file'
                                            multiple
                                            accept="image/jpeg,image/png,application/pdf"
                                            id='file' ref={inputFile} style={{ display: 'none' }} onChange={(e) => {
                                                // handleFileChange(e)
                                            }} />

                                    </label>
                                </Stack>
                            </Typography>
                            <Typography sx={{ mt: 1, fontStyle: "italic" }} className="ts-card-typo abs" variant="body2">
                                Upload files that are less than 30mb in size.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className='flex justify-center'>
                    <ButtonComponent icon={<FiSave color='white' size={"23"} />} btnName={"Save"} />
                </div>
            </div>
        </div>
    )
}
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