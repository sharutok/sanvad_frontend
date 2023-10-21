import * as yup from 'yup'
export const CapexErrorSchema = yup.object().shape({
    nature_of_requirement: yup.string().required('Required Field'),
    purpose: yup.string().required('Required Field'),
    payback_period: yup.string().required('Required Field'),
    return_on_investment: yup.string().required('Required Field'),
    budget_type: yup.string().required('Required Field'),
    requisition_date: yup.string().required('Required Field'),
    total_cost: yup.number().typeError('Please enter a valid number').required('Required Field'),
    site_delivery_date: yup.string().required('Required Field'),
    installation_date: yup.string().required('Required Field'),
    comment1: yup.string().required('Required Field'),
    comment2: yup.string().required('Required Field'),
    comment3: yup.string().required('Required Field'),
    comment4: yup.string().required('Required Field'),
    comment5: yup.string().required('Required Field'),
    comment6: yup.string().required('Required Field'),
    comment7: yup.string().required('Required Field'),

})