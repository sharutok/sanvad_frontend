import * as yup from 'yup'
export const ConferenceErrorSchema = yup.object().shape({
    meeting_about: yup.string().required('Required Field').max(40, "must not exceed 40 characters"),
    end_date: yup.string().required('Required Field'),
    end_date_time: yup.string().required('Required Field'),
})

export const ConferenceSelectionErrorSchema = yup.object().shape({
    conf_room_start_date: yup.string().required('Required Field'), 
    conference_rooms: yup.string().required('Required Field'),
})

