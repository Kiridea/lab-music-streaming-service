const mongoose = require("mongoose");
const Schema = mongoose.Schema

const playlistSchema = new Schema({
    name: String,
    songs : [{type: Schema.Types.ObjectId, ref: "Song"}]
})

const Playlist = mongoose.model("Playlist", playlistSchema)

module.exports = Playlist