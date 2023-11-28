import React from 'react'

export default function UnderDevelopment() {
    return (
        <div className="text-center grid ">
            <span className="text-[20rem] text-[#f8f8f8]">404</span>
            <div className='grid gap-3 mt-[-4rem]'>
                <span className="text-center text-[3rem] font-semibold font-sans text-[#585858]">You have found a secret place.</span>
                <span className="text-center font-sans">
                    Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
                    been moved to another URL.
                </span>
                <div >
                    <Button style={{
                        backgroundColor: "#acacac",
                    }} variant="contained" onClick={() => take_me_back_to_home_page()}>
                        Take me back to login page
                    </Button>
                </div>
            </div>
        </div>
    )
}
