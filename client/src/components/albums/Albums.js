import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './Albums.css'
import { MdOutlineArtTrack } from 'react-icons/md'
import { IoMdAlbums } from 'react-icons/io'
function Albums() {
  const [albumname, setalbumname] = useState("");
  const [albumDetails, setAlbumDetails] = useState(null);
  const [addingstatus, setaddingstatus] = useState("");
  const changealbumname = (e) => {
    setalbumname(e.target.value);
    console.log("Album name: ", albumname);
  }

  let album_details = {};
  const getalbum = (e) => {
    setaddingstatus("");
    axios.get(`http://localhost:3001/album/${albumname}`).then((response) => {
      album_details = response.data;
      const fetchedAlbumDetails = response.data;
      setAlbumDetails(fetchedAlbumDetails);
      console.log("Album details: ", album_details);
    });
    // console.log("Album details: ", album_details);
  }
  const addalbumtodb = (e) => {
    axios.post(`http://localhost:3001/album/${albumname}/insert`).then((response) => {
      console.log("Album inserted to db: ", response.data);
      console.log("Message is",response.data.message);
      setaddingstatus(response.data.message);
    });
  }
  return (
    <>
      <div className="container d-flex text-center box justify-content-around align-items-center">

        <div className='albumfetch d-flex flex-column align-items-center'>
          <MdOutlineArtTrack className='albumicon' />
          {/* <IoMdAlbums className='albumicon' /> */}
          <h1 className='color-green'>Albums</h1>
          <input type="text" name="title" id="title" placeholder="Album Name" onChange={changealbumname} className='albumbox' />

          {/* <input type="button" value="Get album" onClick={getalbum} /> */} <br />
          <button className="btn" onClick={getalbum}>
            <span>Get Album</span>
          </button>
        </div>
        {albumDetails && <div className='albumdet d-flex flex-column justify-content-center'>
          <h1 className='color-green'>Album Details</h1>
          <img src={albumDetails.albumImage} alt={albumDetails.albumName} style={{ height: '200px', width: '200px', alignSelf:"center" }} />
          <p><span className='color-green'>ID:</span> {albumDetails.albumId}</p>
          <p><span className='color-green'>Name: </span>{albumDetails.albumName}</p>
          <p><span className='color-green'>Artists:</span> {albumDetails.artists}</p>
          <p><span className='color-green'>Release Date:</span> {albumDetails.releaseDate}</p>
          <p><span className='color-green'>Total Tracks:</span> {albumDetails.total_tracks}</p>
          <button className="btn" onClick={addalbumtodb}>
            <span>Add Album</span>
          </button>
          {addingstatus && <p>{addingstatus}</p>}
        </div>}
      </div>
    </>
  )
}

export default Albums
