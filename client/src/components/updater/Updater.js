import React from 'react'
import './updater.css'
import { useState } from 'react'
import axios from 'axios';
import {MdOutlineBrowserUpdated} from 'react-icons/md'
function Updater() {
  const [artistname, setartistname] = useState("");
  const [newartistname, setnewartistname] = useState("");
  const [artistDetails, setartistDetails] = useState("a");
  // const [addingstatus, setaddingstatus] = useState("");
const [artistName, setArtistName] = useState("");
const [foundArtist, setFoundArtist] = useState("a");
const [continueUpdate, setContinueUpdate] = useState("1");  
const [updateStatus, setUpdateStatus] = useState("a");
const changeartistname = (e) => {
  setArtistName(e.target.value);
}
const changenewartistname = (e) => {
  setnewartistname(e.target.value);
}
let artist_details = {};
const getartist = (e) => {
  axios.get(`http://localhost:3001/api/getArtists`).then((response) => {
    artist_details = response.data;
    const fetchedArtistDetails = response.data;
    setartistDetails(fetchedArtistDetails);
    setFoundArtist(response.data.message);
    console.log("Artist details found sucessful: ", artist_details);
  });
}
const updateartist = (e) => {
  axios.post(`http://localhost:3001/api/updateArtist`, {artistName, newartistname}).then((response) => {
    console.log("Artist updated to db: ", response.data);
    setUpdateStatus(response.data.message);
  });
}
  return (
    <>
      <div className="container d-flex text-center box justify-content-between align-items-center">
        <div className='albumfetch d-flex flex-column align-items-center'>
          <MdOutlineBrowserUpdated className='albumicon' />
          <h1 className='color-green'>Tracks</h1>
          <input type="text" name="title" id="title" placeholder="Track Name" onChange={changeartistname} className='albumbox' />
          <button className="btn mt-4" onClick={getartist}>
            <span>Get Track</span>
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




         {artistDetails && <div className='albumdet d-flex flex-column justify-content-center text-center'> <p>Enter Artist name </p> <input type="text" name="newName" id="title" placeholder="Track Name" onChange={changenewartistname} className='albumbox'/>
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