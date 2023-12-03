import * as yup from 'yup'

export const VisitorMangErrorSchema = yup.object().shape({
    start_date_time: yup.string().required('Required Field'),
    end_date_time: yup.string().required('Required Field'),
    v_company: yup.string().required('Required Field').max(25),
    more_info: yup.string().required('Required Field').matches(/^[0-9]+$/, 'Only numbers are allowed').test('len', 'Must be exactly 10 characters', val => val && val.length === 10),
    veh_no: yup.string().test('len', 'Must be exactly 10 characters', val => val && val.length === 10),
    reason_for_visit: yup.string().required('Required Field').matches(/^[A-Za-z\s]+$/, 'Only alphabets').max(25),
    ppe: yup.string().required('Required Field'),

})
