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
        "@adorians.com",
        "@adorfon.com",
        "@flashorthodontics.in",
    ]
}

export const severity = ['Low🔥', "Medium🔥🔥", "High🔥🔥🔥"]

export const org = ["ADOR WELDING", "ADOR FONTECH", "FLASH"]

export const flash_link = "https://flashaligners.in/"

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
    "capex:approver",
    "capex:uploadexcel",

]

export const payback_period_return_of_investment = [
    "less than 3 months",
    "less than 6 months",
    "less than 1 year",
    "less than 2 years",
    "less than 3 years",
    "less than 4 years",
    "less than 5 years",

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
        mainlink: "/ticket/sys/list", index: "module:ticketsystem",
    },
    {
        label: 'Conference Booking',
        icon: FaUsersLine,
        mainlink: "/conference/booking/list", index: "module:conferencebooking",

    },
    {
        label: 'Visitor Management',
        icon: FaRegIdBadge,
        mainlink: "/vistors/management/list", index: "module:visitormanagement",
    },
    {
        label: 'Capex',
        icon: FaFileInvoiceDollar,
        mainlink: "/capex/list"
        , index: "module:capex",

    },
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
    try {

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url;
        link.setAttribute('download', file)
        document.body.appendChild(link)
        link.click()
    } catch (e) {
        console.log(e);
    }
}


export const isPermissionToView = (component) => {
    return getCookies()[1].includes(component)
}




export function abbriviation(data, limit) {
    return (
        <>
            {data.length >= limit ?
                <abbr title={data}>{data.substring(0, limit)} .....</abbr> :
                <>
                    {data}
                </>
            }
        </>
    )
}