import React from 'react'
import './Landing.css'
import landingimage from '../../images/landingpage3.jpg'
function Landing() {
  return (
    <>
      <div className="container d-flex hero ">
        <div className='container d-flex flex-column align-items-start justify-content-center hero-content'>
          <h1>Your <span>Harmonious</span> <br /> <span>Gateway </span> to Music <br />Discovery <span>and </span>Exploration</h1>
          <p className='mt-3'>Elevate Your <span>Music</span> Experience with AI-Powered <span>Recommendations</span></p>
          <div className="conatiner mt-4 d-flex flex-wrap">
            <button className="btn1 "><span>Albums</span></button>
            <button className="btn1 ms-5"><span>Artists</span></button>
            <button className="btn1 ms-5"><span>Tracks</span></button>
            <button className="btn1 ms-5"><span>Users</span></button>
          </div>
          <div className="conatiner mt-4 d-flex  flex-wrap">
            <button className="btn1 "><span>Playlists</span></button>

          </div>
        </div>
        <div className="image d-flex align-items-end justify-content-center">
          <img src={landingimage} alt="hero" />
        </div>
      </div>
    </>
  )
}

export default Landing