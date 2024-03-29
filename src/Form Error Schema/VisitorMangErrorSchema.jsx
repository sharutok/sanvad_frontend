import * as yup from 'yup'

export const VisitorMangErrorSchema = yup.object().shape({
    start_date_time: yup.string().required('Required Field'),
    end_date_time: yup.string().required('Required Field'),
    v_company: yup.string().required('Required Field').max(50),
    reason_for_visit: yup.string().required('Required Field').matches(/^[A-Za-z\s]+$/, 'Only alphabets').max(100),
    // more_info: yup.string().matches(/^[0-9]+$/, 'Mobile No must be numbers only').max(10).notRequired(),
})
export const ApproverVisitorMangErrorSchema = yup.object().shape({
    // ppe: yup.string().required('Required Field') ,
})

