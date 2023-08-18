const url = "http://127.0.0.1"
const port = "8000"
const link = `${url}:${port}`
export const api = {
    user_management: {
        get_data: `${link}/user-manage/all`,
        get_data_id: `${link}/user-manage`,
        post_data: `${link}/user-manage/create/`
    },
    yammer: {
        get_data: `${link}/yammer-feeds/posts/`
    },
    capex: {
        get_data: `${link}/capex/get-all-data/`,
        by_id: `${link}/capex`,
        create: `${link}/capex/create/`
    },
    conference_booking: {
        get_data: `${link}/conf-book/all`
    }
}






















