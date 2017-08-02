const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UtSchema = Schema({
    name: String,
    youtube_link: String,
    tag: String
})

const Youtube = mongoose.model("Youtube", UtSchema);
module.exports = Youtube;