import React from 'react'
import IMAGES from '../assets/Image/Image';
import '../../Style/SpinnerLoading.css'
export default function LoadingSpinner() {
    return (
        <div className='center-align'>
            <div className='animation'>
                <img src={IMAGES.ador_star_logo} alt="Ador" width={"50"} />
            </div>
            <h1 className='font-[bolder] text-[large] text-center'>Loading</h1>
        </div>
    )
}
