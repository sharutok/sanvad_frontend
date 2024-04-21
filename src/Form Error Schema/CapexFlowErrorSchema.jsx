import * as yup from 'yup'
export const CapexFlowErrorSchema = yup.object().shape({
    department: yup.string().required('Required Field'),
    plant: yup.string().required('Required Field'),
    which_flow: yup.string().required('Required Field'),
    one_approver: yup.string().required('Required Field'),
    two_approver: yup.string().required('Required Field'),
    three_approver: yup.string().required('Required Field'),

})



