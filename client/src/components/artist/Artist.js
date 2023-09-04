import React from 'react'
import { useState } from 'react'
import axios from 'axios';
function Artist() {
  const [artistDetails, setartistDetails] = useState("");
  const [artistname, setartistname] = useState("");
  const changeartistname = (e) => {
    setartistname(e.target.value);
  }
  let artist_details = {};
  const getartist = (e) => {
    axios.get(`http://localhost:3001/artist/${artistname}`).then((response) => {
      artist_details = response.data;
      const fetchedArtistDetails = response.data;
      setartistDetails(fetchedArtistDetails);
      console.log("Artist details: ", artist_details);
    });
  }
  const addArtistToDB = (e) => {
    axios.post(`http://localhost:3001/artist/${artistname}/insert`).then((response) => {
      console.log("Artist inserted to db: ", response.data);
    });
  }
  return (
    <>
      <div className="container d-flex text-center box justify-content-around align-items-center">

        <div className='albumfetch d-flex flex-column align-items-center'>
          {/* <MdOutlineArtTrack className='albumicon' /> */}
          {/* <IoMdAlbums className='albumicon' /> */}
          <h1 className='color-green'>Artist</h1>
          <input type="text" name="title" id="title" placeholder="Album Name" onChange={changeartistname} className='albumbox' />

          {/* <input type="button" value="Get album" onClick={getalbum} /> */} <br />
          <button className="btn" onClick={getartist}>
            <span>Get Artist</span>
          </button>
        </div>
        {artistDetails && <div className='albumdet d-flex flex-column justify-content-center text-center'>
          <h1 className='color-green'>Artist Details</h1>
          <img src={artistDetails.artistImage} alt={artistDetails.artistName} style={{ height: '200px', width: '200px', alignSelf:"center" }} />
          <p><span className='color-green'>ID:</span> {artistDetails.artistId}</p>
          <p><span className='color-green'>Name: </span>{artistDetails.artistName}</p>
          <p><span className='color-green'>Follower</span> {artistDetails.followers}</p>
          <p><span className='color-green'>Genres</span> {artistDetails.genres}</p>
          <button className="btn" onClick={addArtistToDB}>
            <span>Add Artist</span>
          </button>
        </div>}
      </div>
    </>
  )
}

export default Artist