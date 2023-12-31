import * as yup from 'yup'
export const UserErrorSchema = yup.object().shape({
    first_name: yup.string().required("Required Field"),
    last_name: yup.string().required("Required Field"),
    ph_no: yup.string().required("Required Field"),
    dob: yup.string().required("Required Field"),
    gender: yup.string().required("Required Field"),
    emerg_contact: yup.string().required("Required Field"),
    address: yup.string().required("Required Field"),
    start_date: yup.string().required("Required Field"),
    // end_date: yup.string().required("Required Field"),
    emp_no: yup.string().required("Required Field"),
    department: yup.string().required("Required Field"),
    plant_name: yup.string().required("Required Field"),
    manager: yup.string().required("Required Field"),
    // employment_type: yup.string().required("Required Field"),
    // job_type: yup.string().required("Required Field"),
    emp_designation: yup.string().required("Required Field"),
    email_id: yup.string().required("Required Field"),
    password: yup.string().required("Required Field"),
    user_status: yup.string().required("Required Field"),
    user_role: yup.string().required("Required Field")


})
