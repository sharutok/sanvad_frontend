import React, { useContext } from 'react'
import Cookies from "universal-cookie";
import { AppContext } from '../App';
const cookies = new Cookies()

let cookieName = ["emp_code", "user_role", "initials"]

export const setCookies = (cookieValues) => {
    cookieName.map((x, i) => {
        cookies.set(x, cookieValues[i], { path: "/" })
    })

}
export const getCookies = () => {
    return cookieName.map(x => {
        return cookies.get(x)
    })
}

export const deleteCookies = () => {
    cookieName.map(x => {
        return cookies.remove(x, { path: "/" })
    })
}

function CustomCookies() {
    const { setCookie } = useContext(AppContext)
    setCookie({
        emp_code: getCookies()[0],
        user_role: getCookies()[1],
        initials: getCookies()[2]
    })
}
export default CustomCookies