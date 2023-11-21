import React from 'react'
import Button from '@mui/material/Button';

export default function ErrorPage404NotFound() {
    return (
        <div><NotFoundTitle /></div>
    )
}


export function NotFoundTitle() {
    function take_me_back_to_home_page() {
        window.location.href = "/login"
    }
    return (
        <div className="text-center grid gap-3">
            <span className="w-[100%]  h-[100%] text-[40rem] top-0  absolute  text-[#f8f8f8]">404</span>
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
    );
}