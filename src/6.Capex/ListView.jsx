import React, { useContext, useRef, useState } from 'react'
import { FiSave, FiSearch } from 'react-icons/fi'
import { Card, CardContent, Divider, Input, Stack, TextField } from '@mui/material';
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
import { api } from '../Helper Components/Api';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import LoadingButtonWithSnack from '../Helper Components/LoadingButtonWithSnack';
import { exportToCSV, isPermissionToView } from '../Static/StaticValues';
import { AiOutlineDownload } from 'react-icons/ai';
import moment from 'moment';
import EditBudget from './EditBudget';
import { getCookies } from '../Helper Components/CustomCookies';



export default function ListView() {
    const { dialogStatus, setDialogStatus } = useContext(AppContext)
    const [_search, _setSearch] = useState("")
    const inputFile = useRef(null)

    async function exportData() {
        try {
            const data = await axios.post(api.utils.download_excel, { "data_module": "capex" })
            exportToCSV(data?.data?.data, `Capex ${moment().format("DD_MM_YYYY")}`)
        } catch (error) {
            console.log("error in exporting", error);
        }
    }

    return (
        <div>
            <div className='flex justify-between mt-20'>
                <BackArrow location={"/home"} title={"Capex - Listing"} />
                <div className='flex gap-4 mt-3 mr-20'>
                    <TextField onChange={(e) => _setSearch(e.target.value)} sx={{ width: "20rem" }} id="outlined-basic" label="Search" variant="outlined" size='small' placeholder='Press Enter to search' />
                    {isPermissionToView("capex:uploadexcel") && <ButtonComponent onClick={() => { setDialogStatus(true) }} icon={<CgExport color='white' size={"23"} />} btnName={"Upload Budget .xlsx"} />}
                    {isPermissionToView("capex:export") && <ButtonComponent onClick={() => exportData()} icon={<AiOutlineDownload color='white' size={"23"} />} btnName={"Export"} />}
                </div>
            </div>
            <div className='mt-5 px-5 '>
                <BasicTabs _search={_search} _setSearch={_setSearch} />
            </div>
            <DialogsBox inputFile={inputFile} title={"Upload Excel"} body={<UploadFiles />} />
        </div>
    )
}


function BasicTabs({ _search, _setSearch }) {
    const [value, setValue] = React.useState(0);
    const { count, setCount, page, setPage, setSnackBarPopUp, setBtnSaving } = useContext(AppContext)

    const handleChange = (event, newValue) => {
        setCount(1)
        setPage(1)
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}> */}
            <Box sx={{ px: 3 }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                    {isPermissionToView("capex:list:budget") && <Tab label="Budget List" {...a11yProps(0)} />}
                    {isPermissionToView("capex:list:capex") && <Tab label="Capex List" {...a11yProps(1)} />}
                </Tabs>
            </Box>
            {
                isPermissionToView("capex:list:budget") && <CustomTabPanel value={value} index={0}>
                    <BudgetListVIew _search={_search} _setSearch={_setSearch} />
                </CustomTabPanel>
            }
            {
                isPermissionToView("capex:list:capex") && <CustomTabPanel value={value} index={1}>
                    <CapexListView _search={_search} _setSearch={_setSearch} />
                </CustomTabPanel>
            }
        </Box >
    );
}
const ButtonComponent = ({ icon, btnName, onClick, ...props }) => {
    return (
        <div
            onClick={onClick}
            {...props}
            className='whitespace-nowrap w-fit no-underline rounded-full p-2 h-fit border-[#c7c7c7] bg-[#555259] flex justify-between px-4 cursor-pointer hover:bg-[#2c2c2c] active:bg-[#000000] transition-[1s]'>
            <div className='no-underline'>
                {icon}
            </div>
            {btnName && <span className='text-[#ebebeb] text-[15px] no-underline ml-2'>{btnName}</span>}
        </div>
    )
}
const UploadFiles = ({ inputFile }) => {
    const { setSnackBarPopUp, setBtnSaving, setDialogStatus } = useContext(AppContext)
    const [tktFiles, setTKTFiles] = useState([])
    const formData = new FormData()

    const onSubmit = async (e) => {
        try {
            e.preventDefault()
            formData.append("budget_file", tktFiles[0])
            if (tktFiles[0]) {
                const response = await axios.post(api.capex.upload_budget_excel, formData)
                if (response.data.status == 200) {
                    setSnackBarPopUp({ state: true, message: "Budgeted Created", severity: 's' })
                    setBtnSaving(true)
                    setTimeout(() => {
                        setDialogStatus(false)
                        setSnackBarPopUp({ state: false, message: "", })
                        setBtnSaving(false)
                        setTKTFiles([])
                    }, 1500)
                }
            }
        }
        catch (error) {
            console.log(error);
            setSnackBarPopUp({ state: true, message: "Please Upload Correct File", severity: 'e' })
        }
    }
    const deleteFiles = (g) => {
        let arr = tktFiles.filter(function (item) {
            return item.name !== g
        })
        setTKTFiles((tktFiles) => {
            return [...arr]
        })
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setTKTFiles(files);
    };


    return (
        <div className='flex justify-center'>
            <div className='w-fit'>
                <div className='gap-7 p-10' >
                    <div className='grid justify-center'>
                        <label for="file-input">
                            <Card className="ts-card" style={{ cursor: "pointer" }} >
                                <CardContent  >
                                    <Typography className="ts-card-typo" sx={{ fontSize: 12 }} >
                                        <CloudUpload
                                            size={35}
                                            strokeWidth={2}
                                            color={'grey'}
                                        />
                                    </Typography>
                                    <Typography className="ts-card-typo" variant="h5" component="div">
                                        <Stack direction="row" alignItems="center">
                                            <label htmlFor="contained-button-file">
                                                <Typography sx={{ fontWeight: "bold" }} className="ts-card-typo abs" variant="body2">
                                                    Upload files
                                                </Typography>
                                            </label>
                                        </Stack>
                                    </Typography>
                                    <Typography sx={{ fontStyle: "italic" }} className="ts-card-typo abs" variant="body2">
                                        Upload files that are less than 30mb in size.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </label>
                        <input onChange={handleFileChange} id="file-input" type="file" accept=".xlsx" style={{ display: "none" }} />
                        <div className='mt-2'>
                            {tktFiles?.map((g, i) => {
                                return (
                                    <div key={i} className='flex gap-2 '>
                                        <p className='break-all'><strong>{i + 1}.</strong> {g.name}</p>
                                        <RxCross2 onClick={() => { deleteFiles(g.name) }} className='text-[#ff2a2a] hover:text-[#ff6060] cursor-pointer active:text-[#ffa4a4] mt-1' />
                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <form onSubmit={(e) => { e.preventDefault(); onSubmit(e) }}>
                        <div className='w-fit'>
                            <LoadingButtonWithSnack beforeName={"Upload"} afterName={"uploading..."} />
                        </div>
                    </form>
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