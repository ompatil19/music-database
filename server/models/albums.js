const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumId: {
        type: String,
        required: true,
        unique: true,
        index: true
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

    tracks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tracksModel'
    },
    releaseDate: {
        type: Date,

    },
    totalTracks:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'tracksModel',
        required: true,
    },

});

const albumsModel = mongoose.model('album', albumSchema);

module.exports = albumsModel;