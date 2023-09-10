const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const Artist = require('./models/artists'); // Adjust the path to your Artist model

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://mohit:chocolate01@cluster0.dsrdyr0.mongodb.net/MusicRecSys', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.put('/api/updateArtist', async (req, res) => {
    const { currentName, newName } = req.body;

    try {
        const updatedArtist = await Artist.findOneAndUpdate(
            { artistName: currentName },
            { $set: { artistName: newName } },
            { new: true }
        );

        if (!updatedArtist) {
            return res.status(404).json({ message: 'Artist not found' });
        } else {
            return res.status(200).json({ message: 'Artist updated successfully' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/getArtists', async (req, res) => {
    try {
        const artists = await Artist.find({});
        return res.json(artists);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});