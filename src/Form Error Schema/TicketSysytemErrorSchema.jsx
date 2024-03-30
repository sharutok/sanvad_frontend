import * as yup from 'yup'
export const RequestTicketErrorSchema = yup.object().shape({
    tkt_title: yup.string().required('Required Field').max(350),
    tkt_type: yup.string().required('Required Field'),
    req_type: yup.string().required('Required Field'),
    tkt_description: yup.string().required('Required Field').max(900),

})
export const ApproverTicketErrorSchema = yup.object().shape({
    approver_comment: yup.string().required('Required Field'),
    approver_status: yup.string().required('Required Field'),
    assign_ticket_to_user: yup.string().required('Required Field'),
    tkt_title: yup.string().required('Required Field'),
    tkt_type: yup.string().required('Required Field'),
    req_type: yup.string().required('Required Field'),
    tkt_description: yup.string().required('Required Field').max(900),

})
