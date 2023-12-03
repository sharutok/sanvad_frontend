import * as yup from 'yup'

export const BudgetErrorSchema = yup.object().shape({
    budget_no: yup.string().required('Required Fields'),
    purpose_code: yup.string().required('Required Fields'),
    purpose_description: yup.string().required('Required Fields'),
    line_no: yup.string().required('Required Fields'),
    plant: yup.string().required('Required Fields'),
    dept: yup.string().required('Required Fields'),
    capex_group: yup.string().required('Required Fields'),
    capex_class: yup.string().required('Required Fields'),
    category: yup.string().required('Required Fields'),
    asset_description: yup.string().required('Required Fields'),
    details: yup.string().required('Required Fields'),
    rate: yup.string().required('Required Fields'),
    qty: yup.string().required('Required Fields'),
    uom: yup.string().required('Required Fields'),
    final_budget: yup.string().required('Required Fields'),
    remarks: yup.string().required('Required Fields'),
    is_active: yup.string().required('Required Fields'),

})