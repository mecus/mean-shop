const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdSchema = Schema({
    title: String,
    photo_id: String,
    photo_url: String,
    department_id: String,
    tag: String
})

const Advert = mongoose.model("Advert", AdSchema);
module.exports = Advert;