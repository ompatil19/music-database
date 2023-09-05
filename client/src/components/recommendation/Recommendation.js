import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './recom.css'
function Recommendation() {
  const [details, setDetails] = useState("");
  const [trackname, setTrackname] = useState("");
  const changetrackname = (e) => {
    setTrackname(e.target.value);
  }
    const getrecom = (e) => {
    axios.get(`http://localhost:3001/recommend/${trackname}`).then((response) => {
      const fetchedTrackDetails = response.data;
      setDetails(fetchedTrackDetails);
    })};
    return (
      <>
      <div className="container recom-section d-flex justify-content-around align-items-center">
      <div>
        <h1 className='text-center mb-5'>Recommendations</h1>
        <div className="d-flex flex-column align-items-center justify-content-center flex-wrap">
          <input type="text" name="title" id="title" placeholder="Track Name" onChange={changetrackname} className='albumbox me-5' />
          <button className="btn mt-5" onClick={getrecom}>
            <span>Get Recommendation</span>
          </button>
        </div>
      </div>
        {details && <div>

          <ul>
            {details.map((track, index) => (
              <li key={index} className='mt-3'>
                <strong>Track Name:</strong> {track.trackName}<br />
                <strong>Artists:</strong> {track.artists.join(', ')}<br />
              </li>
            ))}
          </ul>
        </div>}
        </div>
      </>
    )
  
}

export default Recommendation