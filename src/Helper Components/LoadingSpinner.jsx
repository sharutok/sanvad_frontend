import React from 'react'
import IMAGES from '../assets/Image/Image';
import '../../Style/SpinnerLoading.css'
export default function LoadingSpinner() {
    return (
        <div className='center-align'>
            <div className='animation'>
                <img src={IMAGES.ador_star_logo} alt="Ador" width={"50"} />
            </div>
            <span className='font-[bolder] text-[2xl] text-center'>Loading</span>
        </div>
    )
}
