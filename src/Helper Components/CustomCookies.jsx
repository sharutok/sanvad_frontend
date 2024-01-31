import { useContext } from 'react'
import Cookies from "universal-cookie";
import { AppContext } from '../App';
import { atomWithStorage, RESET } from 'jotai/utils'



const cookies = new Cookies()
export const searchAtom = atomWithStorage('searchVariable', null)
export const paginationAtom = atomWithStorage('_pagination', '')


let cookieName = ["emp_code", "user_role", "initials", "_search", '_page']

export const setCookies = (cookieValues) => {
    cookieName.map((x, i) => {
        cookies.set(x, cookieValues[i], {
            path: "/", expires: new Date(Date.now() + 3600000)
        },)
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