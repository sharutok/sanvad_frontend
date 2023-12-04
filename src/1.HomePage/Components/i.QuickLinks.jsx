import React from 'react'
import '../../../Style/QuickLinks.css'
import IMAGES from '../../assets/Image/Image'
import { Divider } from '@mui/material'

const quick_link = [
    { img_name: "falcon_logo", img: IMAGES.falcon_logo, label: 'FALCON', link: 'https://admin.ador.co/' },
    { img_name: "ascent_logo", img: IMAGES.ascent_logo, label: 'ASSENT ESS', link: 'http://182.73.197.154/AscentESS/Default.htm' },
    { img_name: "erp_logo", img: IMAGES.erp_logo, label: 'ERP', link: 'http://adrprodapp.adrprdappsn.adorprodvcn.oraclevcn.com:8052' },
    { img_name: "qlik_logo", img: IMAGES.qlik_logo, label: 'CLICKVIEW BI', link: 'http://10.202.65.70/qlikview/index.htm' },
    { img_name: "plm_logo", img: IMAGES.plm_logo, label: 'PLM', link: 'http://plmprodtc.ador.co.in:3000/' },
    { img_name: "ador_star_logo", img: IMAGES.ador_star_logo, label: 'ASE PORTAL', link: 'http://27.107.7.11:8021/LoginUser.aspx' },
    { img_name: "zendesk_log", img: IMAGES.zendesk_log, label: 'ZENDESK', link: 'https://adorcare.zendesk.com/' },
    { img_name: "salesforce_logo", img: IMAGES.salesforce_logo, label: 'SALESFORCE', link: 'https://login.salesforce.com/' },
    { img_name: "ador_star_logo", img: IMAGES.ador_star_logo, label: 'TEST CERTIFICATE', link: 'https://adorwelding.org/TC/' },
    { img_name: "krystal_logo", img: IMAGES.krystal_logo, label: 'CRYSTAL DMS', link: 'https://10.202.65.242/' },
    { img_name: "ador_logo", img: IMAGES.ador_logo, label: 'ADOR WEBSITE', link: 'https://www.adorwelding.com/' },
    { img_name: "ador_star_logo", img: IMAGES.ador_star_logo, label: 'PRODUCT CERTIFCATE MATRIX', link: 'http://27.107.7.11:3040/home' },
]


function QuickLinks() {

    function handleNav(nav) {
        window.open(nav, '_blank')
    }

    return (
        <div className='bg-[#fff] rounded-xl '>
            <div className='p-3'>
                <span className='text-[1.2rem] font-extrabold text-[#555259]'>Quick Links</span>
                <div >
                    <Divider />
                </div>
            </div>
            <div className='grid grid-cols-[repeat(3,1fr)] grid-rows-[repeat(4,14.5vh)] mt-4 p-3'>
                {quick_link.map((x, i) => {
                    return (
                        <div onClick={() => handleNav(x.link)} key={i} className='hover-element active:bg-[#e6e6e6] cursor-pointer border border-solid border-[#e3e5ec] flex justify-center pop py-3 ' >
                            <div className=' grid grid-cols-1 w-fit h-fit gap-3 py-2'>
                                <div className='flex justify-center'>
                                    {x.img_name === "ador_star_logo" ? <img loading='lazy' src={x.img} width="55" /> : (x.img_name === "ador_logo" ? <img src={x.img} width="100" className='mt-4' /> : <img src={x.img} width="70" />)}
                                </div>
                                <div className='flex justify-center'>
                                    <span className='text-center text-xs font-[600] px-2' style={{ wordBreak: "break-word" }}>{x.label}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div >
        </div>
    )
}

export default QuickLinks