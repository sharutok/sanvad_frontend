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
        get_data: `${link}/conf-book/all`,
        create: `${link}/conf-book/create/`,
        get_by_date_and_conf_room: `${link}/conf-book/by/date/conf-room/`,
        post_data: `${link}/conf-book/create/`
    },
    ticket_system: {
        get_data: `${link}/tkt-sys/all/`,
        create: `${link}/tkt-sys/create/`
    },
    dynamic_values: {
        tkt_type: `${link}/tkt-sys/tkt_type/`,
        requirement_type: `${link}/tkt-sys/req_type/`,
        conference_rooms: `${link}/conf-book/conference-rooms/`
    }
}






















