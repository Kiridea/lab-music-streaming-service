const mongoose = require("mongoose");
const Artist = require("./models/Artist.model")
const Album = require("./models/Album.model")
const Song = require("./models/Song.model")
const Playlist = require("./models/Playlist.model")

const data = require("./data-copy.json")

require("dotenv").config();

mongoose
    .connect(process.env.MONGODB_URL)
    .then((res) => {
        console.log("Connected to the database:", res.connections[0].name);
    })
    .then(() => {
        return Promise.all([
                Artist.insertMany(data.artists),
                Album.insertMany(data.albums),
                Song.insertMany(data.songs),
                Playlist.insertMany(data.playlists),
            ]);
    })
    .then(([artists, albums, songs, playlists]) => {
        const artistIds = artists.map((artist) => artist._id)
        const albumIds = albums.map((album) => album._id)
        const songIds = songs.map((song) => song._id)
        const playlistIds = playlists.map((playlist) => playlist._id)
    
        return Promise.all([
            Album.updateMany(
                {_id: { $in: albumIds }},
                {$set: { artist: artistIds[0]}}
            ),
            Song.updateMany(
                {_id: { $in: songIds }},
                {$set: { album: albumIds[0]}}
            ),
            Playlist.updateMany(
                {_id: { $in: playlistIds }},
                {$set: { songs: [songIds[0],songIds[1]]}}
            )
        ])
    })
    .catch((error) => {
        console.log("Error connecting to the database", error);
    });