import React from 'react'
import './updater.css'
import { useState } from 'react'
import axios from 'axios';
import {MdOutlineBrowserUpdated} from 'react-icons/md'
function Updater() {
  const [artistName, setArtistName] = useState("");
  const [newartistname, setnewartistname] = useState("");
  const [artistDetails, setartistDetails] = useState("");
  // const [addingstatus, setaddingstatus] = useState("");
const [foundArtist, setFoundArtist] = useState("");
const [updateStatus, setUpdateStatus] = useState("");
const changeartistname = (e) => {
  setArtistName(e.target.value);
}
const changenewartistname = (e) => {
  setnewartistname(e.target.value);
}
let artist_details = {};
const getartist = (e) => {
  axios.get(`http://localhost:3001/api/getArtists?artistName=${artistName}`).then((response) => {
    artist_details = response.data;
    const fetchedArtistDetails = response.data.artist;
    setartistDetails(fetchedArtistDetails);
    setFoundArtist(response.data.message);
    setUpdateStatus("");
  });
}
const updateartist = (e) => {
  axios.put(`http://localhost:3001/api/updateArtist`, {currentName: artistName, newName: newartistname}).then((response) => {
    console.log(artistName, newartistname );
    console.log("Artist updated to db: ", response.data);
    setUpdateStatus(response.data.message);
  });
}
  return (
    <>
      <div className="container d-flex text-center box justify-content-around align-items-center">
        <div className='albumfetch d-flex flex-column align-items-center'>
          <MdOutlineBrowserUpdated className='albumicon' />
          <h1 className='color-green'>Artists Updater</h1>
          <input type="text" name="title" id="title" placeholder="Artist Name" onChange={changeartistname} className='albumbox' />
          <button className="btn mt-4" onClick={getartist}>
            <span>Get Artist</span>
          </button>
          {foundArtist && <p className='mt-3'>{foundArtist}</p>}
        </div>




        {artistDetails && <div className='albumdet d-flex flex-column justify-content-center text-center'>
        <h1 className='color-green'>Artist Details</h1>
          <img src={artistDetails.artistImage} alt={artistDetails.artistName} style={{ height: '200px', width: '200px', alignSelf:"center" }} />
          <p><span className='color-green'>ID:</span> {artistDetails.artistId}</p>
          <p><span className='color-green'>Name: </span>{artistDetails.artistName}</p>
          <p><span className='color-green'>Follower</span> {artistDetails.followers}</p>
          <p><span className='color-green'>Genres</span> {artistDetails.genres}</p>
          </div>
          }




         {artistDetails && <div className='albumdet d-flex flex-column justify-content-center text-center'> 
         <img src="" alt="" />
         <h1 className='color-green'>New Artist name</h1>
 <input type="text" name="newName" id="title" placeholder="Artist Name" onChange={changenewartistname} className='albumbox'/>
          <button className="btn mt-4" onClick={updateartist}>
            <span>Update Artist</span>
          </button>
          {updateStatus && <p className='mt-3'>{updateStatus}</p>}
          </div>}
      </div>
    </>
  )
}

export default Updater