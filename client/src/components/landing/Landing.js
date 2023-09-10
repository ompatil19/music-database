import React from 'react'
import './Landing.css'
import landingimage from '../../images/landingpage3.jpg'
function Landing() {
  return (
    <>
      <div className="container landbox d-flex hero flex-wrap justify-content-between ">
        <div className='container d-flex flex-column align-items-start justify-content-center hero-content'>
          <h1>Your <span>Harmonious</span> <br /> <span>Gateway </span> to Music <br />Discovery <span>and </span>Exploration</h1>
          <p className='mt-3'>Elevate Your <span>Music</span> Experience with AI-Powered <span>Recommendations</span></p>
          <div className="conatiner mt-4 d-flex flex-wrap  align-items-center justify-content-between button-box">
            <a href='/albums' className='link-underline link-underline-opacity-0'><button className="btn1 mt-2"><span>Albums</span></button></a>
            <a href='/artists' className='link-underline link-underline-opacity-0'><button className="btn1 mt-2"><span>Artists</span></button></a>
            <a href='/tracks' className='link-underline link-underline-opacity-0'><button className="btn1 mt-2"><span>Tracks</span></button></a>
            <a href='/recommendations' className='link-underline link-underline-opacity-0'><button className="btn1 mt-2"><span>Recommendations</span></button></a>
          </div>
        </div>
        {window.innerWidth >= 1179 && 
          <div className="image d-flex align-items-end justify-content-center mt-5">
            <img src={landingimage} alt="hero" />
          </div>
        }

      </div>
    </>
  )
}

export default Landing