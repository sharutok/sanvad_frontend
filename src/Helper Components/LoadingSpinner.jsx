import React from 'react'
import IMAGES from '../assets/Image/Image';
import '../../Style/SpinnerLoading.css'
export default function LoadingSpinner() {
    return (
        <div className=' center-align '>
            <div className='animation'>
                <img src={IMAGES.ador_star_logo} alt="Ador" width={"50"} />
            </div>
            <span style={{ fontFamily: "Brandon Grotesque" }} className='text-center font-[bolder] text-[1.5rem]'>{"Loading..."}</span>
        </div>
    )
}
