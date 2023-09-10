import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import {GiGuitar} from 'react-icons/gi'
function Tracks() {
  const [trackDetails, setTrackDetails] = useState("");
  const [trackname, setTrackname] = useState("");
  const [addingstatus, setaddingstatus] = useState("");
  const changetrackname = (e) => {
    setTrackname(e.target.value);
  }
  let track_details = {};
  const gettrack = (e) => {
    setaddingstatus("");
    axios.get(`http://localhost:3001/track/${trackname}`).then((response) => {
      track_details = response.data;
      const fetchedTrackDetails = response.data;
      setTrackDetails(fetchedTrackDetails);
      console.log("Track details: ", track_details);
    });
  }
  const addTrackToDB = (e) => {
    axios.post(`http://localhost:3001/track/${trackname}/insert`).then((response) => {
      console.log("Track inserted to db: ", response.data);
      setaddingstatus(response.data.message);
    });
  }
  return (
    <>
    <div className="container d-flex text-center box justify-content-around align-items-center">

      <div className='albumfetch d-flex flex-column align-items-center'>
        <GiGuitar className='albumicon' />
        <h1 className='color-green'>Tracks</h1>
        <input type="text" name="title" id="title" placeholder="Track Name" onChange={changetrackname} className='albumbox' />
        {/* <input type="button" value="Get album" onClick={getalbum} /> */} <br />
        <button className="btn" onClick={gettrack}>
          <span>Get Track</span>
        </button>
      </div>
      {trackDetails && <div className='albumdet d-flex flex-column justify-content-center text-center'>
        <h1 className='color-green'>Track Details</h1>
        <img src={trackDetails.trackImage} alt={trackDetails.trackName} style={{ height: '200px', width: '200px', alignSelf:"center" }} />
        <p><span className='color-green'>ID:</span> {trackDetails.trackId}</p>
        <p><span className='color-green'>Name: </span>{trackDetails.trackName}</p>
        <p><span className='color-green'>Duration</span> {trackDetails.duration}</p>
        <p><span className='color-green'>Release date</span> {trackDetails.releasedate}</p>
        <p><span className='color-green'>Genres</span> {trackDetails.genre.join()}</p>
        <button className="btn" onClick={addTrackToDB}>
          <span>Add Track</span>
        </button>
        {addingstatus && <p>{addingstatus}</p>}
      </div>}
    </div>
  </>
  )
}

export default Tracks
