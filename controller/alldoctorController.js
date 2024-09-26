import { doctorDetails } from '../models/adminDoctorSchema.js'

const alldoctor = (req, res) => {
    doctorDetails.find().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.status(500).json({ message: err.message })
    })
}

export { alldoctor }