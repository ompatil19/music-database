import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './Albums.css'
import { MdOutlineAlbum } from 'react-icons/md'
import { IoMdAlbums } from 'react-icons/io'
function Albums() {
  const [albumname, setalbumname] = useState("");
  const [albumDetails, setAlbumDetails] = useState(null);
  const changealbumname = (e) => {
    setalbumname(e.target.value);
    console.log("Album name: ", albumname);
  }
  let album_details = {};
  const getalbum = (e) => {
    axios.get(`http://localhost:3001/albums/${albumname}`).then((response) => {
      album_details = response.data;
      const fetchedAlbumDetails = response.data;
      setAlbumDetails(fetchedAlbumDetails);
      console.log("Album details: ", fetchedAlbumDetails);
    });
    // console.log("Album details: ", album_details);
  }

  return (
    <>
      <div className="container d-flex text-center box justify-content-around align-items-center">

        <div className='albumfetch d-flex flex-column align-items-center'>
          {/* <MdOutlineAlbum className='albumicon'/> */}
          <IoMdAlbums className='albumicon' />
          <h1 className='color-green'>Albums</h1>
          <input type="text" name="title" id="title" placeholder="Album Name" onChange={changealbumname} className='albumbox' />

          {/* <input type="button" value="Get album" onClick={getalbum} /> */} <br />
          <button class="cta" onClick={getalbum}>
            <span>Get Album</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </div>

        {albumDetails && <div className='albumdet'>
          <h1 className='color-green'>Album Details</h1>
          <p><span className='color-green'>ID:</span> {albumDetails.id}</p>
          <p><span className='color-green'>Name: </span>{albumDetails.name}</p>
          <p><span className='color-green'>Artists:</span> {albumDetails.artists}</p>
          <p><span className='color-green'>Release Date:</span> {albumDetails.release_date}</p>
          <p><span className='color-green'>Total Tracks:</span> {albumDetails.total_tracks}</p>
        </div>}
      </div>
    </>
  )
}

export default Albums