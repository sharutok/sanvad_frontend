import { IconCalendarStats } from '@tabler/icons-react';
import { FaUsers, FaIdBadge, } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { MdCurrencyExchange, MdSettingsApplications, MdPolicy } from "react-icons/md";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { PiFlowArrowBold } from "react-icons/pi";

import { FaUsersLine, FaClipboardCheck, FaRegIdBadge, FaFileInvoiceDollar } from 'react-icons/fa6'
import { FaUserCog } from 'react-icons/fa'
import { getCookies } from '../Helper Components/CustomCookies';

export const static_val = {
    prefix_email_id: [
        { value: '@adorians.com', label: '@adorians.com' },
        { value: '@adorfontech.com', label: '@adorfontech.com' },
        { value: '@flashorthodontics.in', label: '@flashorthodontics.in' },
    ]
}

export const severity = ['Low🔥', "Medium🔥🔥", "High🔥🔥🔥"]



export const user_permission = [

    "module:usermanagement",
    "module:capex",
    "module:workflowconfig",
    "module:moduleconfigurations",

    "usermanagement:admin",

    "ticketsystem:admin:oraclesystem",
    "ticketsystem:admin:itinfra",

    "conferencebooking:admin",

    "visitormanagement:admin",

    "capex:create",
    "capex:update",
    "capex:list:budget",
    "capex:list:capex",
    "capex:delete",
    "capex:admin",
    "capex:approver",
    "capex:uploadexcel",

]

export const payback_period_return_of_investment = [
    "COST OF ASSET",
    "PROFIT ACCRUAL FROM ADDITIONAL INVESTMENT"
]
export const budgeted_type = [
    "BUDGETED ",
    "NON BUDGETED"
]

export const nature_of_assets = [
    "LAND AND BUILDING",
    "PLANT AND MACHINARY",
    "QA / QC / EQPT / INSTRUMENT",
    "TOOLS / JIGS / FIXTURES",
    "UTILITIES–AIR COMPRESSOR / AC ETC",
    "ELECTRICAL INSTALLATIONS",
    "R AND D - EQPT",
    "R AND D INSTRUMENTS / TOOLS",
    "COMPUTERS",
    "OFFICE EQUIPMENT",
    "IT - NETWORKING + COMMUNICATION EQPTS",
    "OTHER ASSETS",
]

export const asset_type = ["IMPORTED", "INDEGENOUS"]

export const links = [
    {
        label: 'User Management',
        icon: FaUserCog, mainlink: "/user/management/list"
        , index: "module:usermanagement",

    },
    {
        label: 'Ticketing System',
        icon: FaClipboardCheck,
        mainlink: "/ticket/sys/list"
    },
    {
        label: 'Conference Booking',
        icon: FaUsersLine,
        mainlink: "/conference/booking/list"

    },
    {
        label: 'Visitor Management',
        icon: FaRegIdBadge,
        mainlink: "/vistors/management/list"
    },
    {
        label: 'Capex',
        icon: FaFileInvoiceDollar,
        mainlink: "/capex/list"
        , index: "module:capex",

    },
    // {
    //     label: 'Policies',
    //     icon: MdPolicy,
    //     mainlink: "",
    //     links: [
    //         { label: 'HR Policies', link: '/' },
    //         { label: 'IT Policies', link: '/' },
    //     ],
    // },
    // {
    //     label: 'Module Setup',
    //     icon: MdSettingsApplications,
    //     mainlink: "",
    //     links: [
    //         { label: 'User Management', link: '/' },
    //         { label: 'Conference Room', link: '/' },
    //         { label: `Visitor's Management`, link: '/' },
    //         { label: `Ticketing System`, link: '/module-config/ticket-system' },
    //     ],
    //     index: "module:moduleconfigurations",
    // },
    // {
    //     label: 'Static Links',
    //     icon: AiOutlineLink,
    //     mainlink: "",
    //     links: [
    //         { label: 'Distributor Portal Application', link: 'https://adorwelding.org/Distributorship_portal/distributor_application' },
    //         { label: 'Assent', link: 'http://182.73.197.154/AscentESS/Default.htm' },
    //         { label: 'Product Certifcate Matrix', link: 'http://27.107.7.11:3040/home' },
    //         // { label: 'Falcon (Distributor)', link: 'https://distributor.ador.co/' },
    //         { label: 'Falcon (Admin)', link: 'https://admin.ador.co/' },
    //         { label: 'Zendesk', link: 'https://adorcare.zendesk.com/' },
    //         { label: 'Crystal DMS', link: 'http://10.202.65.98/' },
    //         { label: 'Ador Welding Official Website', link: 'https://www.adorwelding.com/' },
    //         { label: 'ERP', link: 'http://adrprodapp.adrprdappsn.adorprodvcn.oraclevcn.com:8052' },
    //         { label: 'ClickView Bi', link: 'http://10.202.65.70/qlikview/index.htm' },
    //         { label: 'PLM', link: 'http://plmprodtc.ador.co.in:3000/' },
    //     ],
    // },
    {
        label: 'Workflow Configurations',
        icon: PiFlowArrowBold,
        mainlink: "",
        links: [
            { label: 'Ticketing System', link: '/workflow/ticket-system' },
            { label: 'Capex', link: '/workflow/capex-system' },
        ],
        index: "module:workflowconfig",

    },
];



const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData.slice(0, 100));
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
};


export const forceDownload = (response, file) => {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url;
    link.setAttribute('download', file)
    document.body.appendChild(link)
    link.click()
}


export const isPermissionToView = (component) => {
    return getCookies()[1].includes(component)
}