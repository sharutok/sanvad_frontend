import { useContext } from 'react'
import Cookies from "universal-cookie";
import { AppContext } from '../App';
import { atomWithStorage, RESET } from 'jotai/utils'

const cookies = new Cookies()
export const searchAtom = atomWithStorage('searchVariable', null)
export const paginationAtom = atomWithStorage('_pagination', '')
export const TicketTab = atomWithStorage('ticket_tab', 0)
export const CapexTab = atomWithStorage('capex_tab', 1)


let cookieName = ["emp_code", "user_role", "initials", 'remember_me']

export const setCookies = (cookieValues) => {
    cookieName.map((x, i) => {
        x !== 'remember_me' ? cookies.set(x, cookieValues[i], { path: "/", expires: new Date(Date.now() + 28800000) }) : cookies.set(x, cookieValues[i], { path: "/", expires: new Date(Date.now() + 28800000 * 7) })
    })
}

export const setIndividualCookie = (cookieName, cookieValue) => {
    cookies.remove(cookieName, { path: "/" })
    cookies.set(cookieName, cookieValue)

}
export const removeIndividualCookie = (cookieName) => {
    cookies.remove(cookieName, { path: "/" })
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