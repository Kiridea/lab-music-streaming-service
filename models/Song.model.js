const mongoose = require("mongoose");
const Schema = mongoose.Schema

const songSchema = new Schema({
    title: String,
    duration: Number,
    album: {type: Schema.Types.ObjectId, ref: "Album"}
})

const Song = mongoose.model("Song", songSchema)

module.exports = Song