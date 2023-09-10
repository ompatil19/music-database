import React from 'react'
import './Navbar.css'
function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg custom-nav sticky-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Chordistry</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item"><a className="nav-link active" aria-current="page" href="/albums">Album</a></li>
        <li className="nav-item"><a className="nav-link active" href="/artists">Artist</a></li>
        <li className="nav-item"><a className="nav-link active" href="/tracks">Tracks</a></li>
        {/* <li className="nav-item"><a className="nav-link active" href="#">Users</a></li> */}
        {/* <li className="nav-item"><a className="nav-link active" href="/playlists">Playlists</a></li> */}
        <li className="nav-item"><a className="nav-link active" href="/recommendations">Recommendations</a></li>
        <li className="nav-item"><a className="nav-link active" href="/updater">Update Artist</a></li>
        <li className="nav-item"><a className="nav-link active" href="/delete">Delete Artist</a></li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar