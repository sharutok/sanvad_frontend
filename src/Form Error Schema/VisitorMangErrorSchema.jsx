import * as yup from 'yup'

export const VisitorMangErrorSchema = yup.object().shape({
    appt_start_datetime: yup.string().required('Required Field'),
    appt_end_datetime: yup.string("").required('Required Field'),
    v_name: yup.string().required('Required Field').nullable(),
    v_company: yup.string().required('Required Field'),
    v_desig: yup.string().required('Required Field'),
    v_mobile_no: yup.string().required('Required Field'),
    more_info: yup.string().required('Required Field'),
    veh_no: yup.string().required('Required Field'),
    v_asset: yup.string().required('Required Field'),
    reason_for_visit: yup.string().required('Required Field'),
    ppe: yup.string().required('Required Field'),

})
