import React, { useContext } from 'react'
import Cookies from "universal-cookie";
import { AppContext } from '../App';
const cookies = new Cookies()

let cookieName = ["role_status", "emp_code", "user_role"]
let flag = []

export const setCookies = (cookieValues) => {
    cookieName.map((x, i) => {
        cookies.set(x, cookieValues[i], { path: "/" })
    })

}
export const getCookies = () => {
    cookieName.map(x => {
        flag.push(cookies.get(x))
    })
    return (flag)
}

export const deleteCookies = () => {
    cookieName.map(x => {
        return cookies.remove(x, { path: "/" })
    })
}

function CustomCookies() {
    const { setCookie } = useContext(AppContext)
    setCookie({
        role_status: getCookies()[0],
        emp_code: getCookies()[1],
        user_role: getCookies()[2]
    })
}
export default CustomCookies