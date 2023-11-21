import React, { useContext } from 'react'
import { AppContext } from '../App';
import { useParams, useSearchParams } from 'react-router-dom';



export default function BudgetBar() {
    const { capex } = useContext(AppContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const consumed = searchParams.get('consumed');
    const final_budget = searchParams.get('final-budget');
    const budget_remaining = searchParams.get('budget-remaining');


    const consumed_in_percentage = Math.ceil((100 * consumed) / final_budget)
    const remaining_in_percentage = 100 - consumed_in_percentage
    const data = [
        { A: consumed_in_percentage, B: remaining_in_percentage },
    ]

    return (
        <div className='grid grid-cols-[repeat(3,1fr)] gap-10 p-4'>
            <CProgressBar consumed={consumed} final_budget={final_budget} budget_remaining={budget_remaining} />
        </div>
    )
}

function CProgressBar({ consumed, final_budget, budget_remaining }) {
    const consumed_in_percentage = Math.ceil((100 * consumed) / final_budget)
    const remaining_in_percentage = 100 - consumed_in_percentage
    return (<div className=' bg-[#272727] rounded-md p-5 grid gap-5'>
        <div>
            <div className='flex justify-between'>
                <p className='text-[#cccccc] font-bold text-right text-xs '>{"USED BUDGET"}</p>
                <p className='text-[#cccccc] font-bold text-left text-xs '>{"REMAINING BUDGET"}</p>
            </div>
            <div className='flex justify-between'>
                <p className='text-[#fff]  text-right text-[1.3rem] '>{`₹${consumed} Lakhs`}</p>
                <p className='text-[#fff]  text-left text-[1.3rem]  mt-[-0.1rem]'>{`₹${budget_remaining} Lakhs`}</p>
            </div>
        </div>
        <div className='w-[100%] relative '>
            <div className='bg-[#797979] p-1 rounded-tl-[10px] rounded-bl-[10px] rounded-tr-[10px] rounded-br-[10px]'></div>
            <div style={{ width: `${consumed_in_percentage}%` }} className='bg-[#e9e8e8] p-1 rounded-tl-[10px] rounded-bl-[10px] absolute z-[1] left-0 top-0'></div>
        </div>
    </div>)
}