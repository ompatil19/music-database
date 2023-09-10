const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumId: {
        type: String,
        required: true,
        unique: true,
    },
    albumName: {
        type: String,
        required: true,
    },
    albumImage: {
        type: String, // Assuming albumImage is a URL
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artistsModel'
        // required: true,
    },
    releaseDate: {
        type: Date,

    },
    totalTracks:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'tracksModel'
    },
});

const albumsModel = mongoose.model('album', albumSchema);

module.exports = albumsModel;
