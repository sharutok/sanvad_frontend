import * as yup from 'yup'

export const BudgetErrorSchema = yup.object().shape({
    budget_no: yup.string().required('Required Fiels'),
    purpose_code: yup.string().required('Required Fiels'),
    purpose_description: yup.string().required('Required Fiels'),
    line_no: yup.string().required('Required Fiels'),
    plant: yup.string().required('Required Fiels'),
    dept: yup.string().required('Required Fiels'),
    capex_group: yup.string().required('Required Fiels'),
    capex_class: yup.string().required('Required Fiels'),
    category: yup.string().required('Required Fiels'),
    asset_description: yup.string().required('Required Fiels'),
    details: yup.string().required('Required Fiels'),
    rate: yup.string().required('Required Fiels'),
    qty: yup.string().required('Required Fiels'),
    uom: yup.string().required('Required Fiels'),
    final_budget: yup.string().required('Required Fiels'),
    remarks: yup.string().required('Required Fiels'),
    is_active: yup.string().required('Required Fiels'),

})