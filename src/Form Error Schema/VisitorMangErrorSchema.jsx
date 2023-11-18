import * as yup from 'yup'

export const VisitorMangErrorSchema = yup.object().shape({
    start_date_time: yup.string().required('Required Field'),
    end_date_time: yup.string().required('Required Field'),
    v_company: yup.string().required('Required Field'),
    more_info: yup.string().required('Required Field').matches(/^[0-9]+$/, 'Only numbers are allowed').max(10),
    veh_no: yup.string().required('Required Field').max(10),
    reason_for_visit: yup.string().required('Required Field').matches(/^[A-Za-z]+$/, 'Only alphabets'),
    ppe: yup.string().required('Required Field'),

})
