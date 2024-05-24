import React, { useContext, useEffect, useRef } from 'react'
import IMAGES from '../../assets/Image/Image'
import { useParams, useSearchParams } from 'react-router-dom';
import { AiFillFilePdf } from 'react-icons/ai'
import { AppContext } from '../../App'
import axios from 'axios';
import { api } from '../../Helper Components/Api';
import Table from '../../Helper Components/Table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ButtonComponent from '../../Helper Components/ButtonComponent';
import BackArrow from '../../Helper Components/SideComponent';

function CapexPDF() {
    const [searchParams, setSearchParams] = useSearchParams();
    const capex_raised_by = searchParams.get('raised_by');
    const budget_id = searchParams.get('budget_id');
    const capex_id = searchParams.get('capex_id');
    const formRef = useRef();

    const  { capexForPdf , setCapexForPdf } = useContext(AppContext)
    const fetchData = async () => {
        try {
            const response = await axios.get(`${api.capex.generate_capex_final_pdf}/?budget_id=${budget_id}&capex_id=${capex_id}&raised_by=${capex_raised_by}`);
 setCapexForPdf(response.data.replacements)
        } catch (error) {
            console.error('Error fetching or downloading PDF:', error);
        }
    }

    const _generatePDF = () => {
        const input = formRef.current;
        html2canvas(input, {
            scale: 1,
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('capex-form.pdf');
        }).catch(err => console.error('Error generating PDF: ', err));
    };
        useEffect(() => {
            fetchData()  
        },[])

    const headers = ["Key User", "Department", "Capex Group", "Nature of Requirement", "Purpose", "Location", "Functional Utility / Performance / Usefulness", "Description Of Asset", "Supplier's Name with Address", "Total Landed Cost(Rs.in Lacs)", "Expected Date of Delivery at Site", "Budget Type"]
  return (
      <div>
          <div className='mt-20'>
              <BackArrow location={"/home"} title={"Back"} />
              <div className='w-fit mt-10 ml-10'>
              <ButtonComponent onClick={_generatePDF } icon={<AiFillFilePdf color='white' size={"23"} />} btnName={"Print"} />
              </div>
          </div>
          <div className='px-10' ref={formRef}>
          <div >
          <img src={IMAGES.ador_logo_} alt="Ador" width={"85"} />
              <div >
                  <div className='flex items-center gap-2'>
                  <p className='text-[red] font-bold text-2xl'>Capex No :
                   </p>
                          <p className='font-bold text-2xl'>{String(capexForPdf.Capex_Id)?.split("-")[0]}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                  <p className='text-[red] font-bold text-2xl'>Date :
                   </p>
                          <p className='font-bold text-2xl'>{capexForPdf.Date}</p>
                  </div>
              </div>
              <p className='border-b-[red] border-b border-solid w-[100%] h-[100%] my-5'></p>
              <div className='grid grid-cols-1 gap-5'>
<div className="flex items-center gap-2">
<p className='text-[red] text-2xl '>Key User: </p>
<p className='text-2xl'>{capexForPdf['Key User']}</p>
</div>
<div className="flex items-center gap-2">
<p className='text-[red] text-2xl'>Department: </p>
<p className='text-2xl'>{capexForPdf['Department']}</p>
</div>
<div className="flex items-center gap-2">
<p className='text-[red] text-2xl'>Capex Group: </p>
<p className='text-2xl'>{capexForPdf['Capex Group']?.replace("_"," ")}</p>
</div>
<div className="flex items-center gap-2">
<p className='text-[red] text-2xl'>Nature of Requirement: </p>
<p className='text-2xl'>{capexForPdf["Nature of Requirement"]}</p>
</div>
<div className="flex items-center gap-2">
<p className='text-[red] text-2xl'>Purpose: </p>
<p className='text-2xl'>{capexForPdf["Purpose"]}</p>
</div>
<div className="flex items-center gap-2">
<p className='text-[red] text-2xl'>Location: </p>
<p className='text-2xl'>{capexForPdf["Location"]}</p>
</div>
<div className="flex items-center gap-2">
<p className='text-[red] text-2xl'>Functional Utility / Performance / Usefulness: </p>
<p className='text-2xl'>{capexForPdf["Functional Utility / Performance / Usefulness"]}</p>
</div>
<div className="flex items-center gap-2">
<p className='text-[red] text-2xl'>Description Of Asset: </p>
<p className='text-2xl'>{capexForPdf["Description Of Asset"]}</p>
</div>
<div className="flex items-center gap-2">
<p className='text-[red] text-2xl'>Supplier's Name with Address: </p>
<p className='text-2xl'>{capexForPdf["Supplier's Name with Address"]}</p>
</div>
<div className="flex items-center gap-2">
<p className='text-[red] text-2xl'>Total Landed Cost(Rs.in Lacs: )</p>
<p className='text-2xl'>{capexForPdf["Total Landed Cost(Rs.in Lacs"]}</p>
</div>
<div className="flex items-center gap-2">
<p className='text-[red] text-2xl'>Expected Date of Delivery at Site: </p>
<p className='text-2xl'>{capexForPdf["Expected Date of Delivery at Site"]}</p>
</div>
<div className="flex items-center gap-2">
              <p className='text-[red] text-2xl'>Budget Type: </p>
              <p className='text-2xl'>{capexForPdf["Budget Type"]}</p>
</div>
          </div>
              </div>
              <p className='border-b-[red] border-b border-solid w-[100%] h-[100%] my-5'></p>
              <div className='my-5'>
          <Table thead={["User","Comment","Status","Date & Time"]} tbody={
              capexForPdf["approval_flow"]?.map((g, i) => {
                  return (
                      <tr className='p-10 mt-1 text-2xl' >
                            <td className='text-xl'>{g.user_name}</td>
                            <td className='text-xl'>{g.comments}</td>
                            <td className='text-xl'>{capex_wf_status(Number(g.status)+1)}</td>
                            <td className='text-xl'>{g.time}</td>
                            </tr>
                  )
              })
          } />
              </div>
          </div>
                  <div className='relative flex justify-center mt-20'>
                      <div className='absolute bottom-0'>
                      <img src={ IMAGES.ador_logo_ring} width="50" alt=""/>
                      </div>
          </div>
      </div>
  )
}

export default CapexPDF

const capex_wf_status =(status)=> {
    switch (status){
        case 0:
            return "INPROGRESS"
        case 1:
            return "APPROVED"
        case 2:
            return "REJECTED"
        case 3:
            return "CLOSED"
        case 4:
            return "ASK FOR JUSTIFICATION"
        default:
            ""
    }
    
    
    
    
    
}   