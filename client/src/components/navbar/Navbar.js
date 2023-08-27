import React from 'react'
import './Navbar.css'
function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary custom-nav" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Chordistry</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Album</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Artist</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Tracks</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar