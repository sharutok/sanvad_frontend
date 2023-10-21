const url = "http://127.0.0.1"
const port = "8000"
const link = `${url}:${port}`
export const api = {
    user_management: {
        get_data: `${link}/user-manage/all`,
        get_data_id: `${link}/user-manage`,
        post_data: `${link}/user-manage/create/`,
    },
    yammer: {
        get_data: `${link}/yammer-feeds/posts/`
    },
    capex: {
        get_budget_data: `${link}/capex/get-all-budget-data`,
        get_capex_data: `${link}/capex/get-all-capex-data`,
        capex_by_id: `${link}/capex/data-capex`,
        budget_by_id: `${link}/capex/data-budget`,
        create_capex: `${link}/capex/create/`
    },
    conference_booking: {
        get_data: `${link}/conf-book/all`,
        create: `${link}/conf-book/create/`,
        get_by_date_and_conf_room: `${link}/conf-book/by/date/conf-room/`,
        post_data: `${link}/conf-book/create/`
    },
    ticket_system: {
        get_data: `${link}/tkt-sys/all`,
        create: `${link}/tkt-sys/create/`,
        by_id: `${link}/tkt-sys/`,
        get_all_user_list: `${link}/tkt-sys/get-all-users/`
    },
    dynamic_values: {
        tkt_type: `${link}/tkt-sys/tkt_type/`,
        requirement_type: `${link}/tkt-sys/req_type/`,
        conference_rooms: `${link}/conf-book/conference-rooms/`
    },
    visitor_management: {
        create: `${link}/visitor-manage/create/`,
        get_data: `${link}/visitor-manage/all`
    },
    user: {
        log_check: `${link}/user-manage/login/check/`,
        birthday_list: `${link}/user-manage/birthday/list/`,
        user_permissions: `${link}/user-manage/user/permission/list/`
    },
    utils: {
        download_excel: `${link}/utils/download/excel/`
    },
    wf: {
        it_system_ticket_wf: `${link}/wf/ticket/systems/`,
        it_infra_ticket_wf: `${link}/wf/ticket/infra/`,
        capex_wf_corporate: `${link}/wf/capex/corporate/`,
        capex_wf_plant: `${link}/wf/capex/plant/`,

    }
}






















