import React from 'react'
import './Navbar.css'
function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg custom-nav">
  <div className="container-fluid">
    <a className="navbar-brand ms-5" href="#">Chordistry</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#">Album</a></li>
        <li className="nav-item"><a className="nav-link active" href="#">Artist</a></li>
        <li className="nav-item"><a className="nav-link active" href="#">Tracks</a></li>
        <li className="nav-item"><a className="nav-link active" href="#">Users</a></li>
        <li className="nav-item"><a className="nav-link active" href="#">Playlists</a></li>
        <li className="nav-item"><a className="nav-link active" href="#">Recommendations</a></li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar