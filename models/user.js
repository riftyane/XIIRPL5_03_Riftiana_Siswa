const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, 'Silahkan isikan nama'],
        unique: true
    },
    email: {
        type: String,
        requires: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    nis: {
        type: String,
        required: [true, 'Silahkan isikan nis'],
        unique: true
    },
    kelas: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true, 
        unique: true
    }
}) 

module.exports = mongoose.model('User', UserSchema)