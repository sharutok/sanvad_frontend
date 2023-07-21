import * as yup from 'yup'

export const VisitorMangErrorSchema = yup.object().shape({
    appt_start_datetime: yup.string().required('Required Field'),
    appt_end_datetime: yup.string("").required('Required Field'),
    g_name: yup.string().required('Required Field').nullable(),
    g_company: yup.string().required('Required Field'),
    g_desig: yup.string().required('Required Field'),
    g_mobile_no: yup.string().required('Required Field'),
    g_meal: yup.string().required('Required Field').nullable(),
    more_info: yup.string().required('Required Field'),
    veh_no: yup.string().required('Required Field'),
    g_asset: yup.string().required('Required Field'),
    reason_for_visit: yup.string().required('Required Field'),
    ppe: yup.string().required('Required Field'),

})