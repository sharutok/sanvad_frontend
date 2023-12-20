import * as yup from 'yup'

export const VisitorMangErrorSchema = yup.object().shape({
    start_date_time: yup.string().required('Required Field'),
    end_date_time: yup.string().required('Required Field'),
    v_company: yup.string().required('Required Field').max(25),
    reason_for_visit: yup.string().required('Required Field').matches(/^[A-Za-z\s]+$/, 'Only alphabets').max(25),
    more_info: yup.string().max(10),
    // veh_no: yup.string().max(10),

})
export const ApproverVisitorMangErrorSchema = yup.object().shape({
    ppe: yup.string().required('Required Field'),

})

