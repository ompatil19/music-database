import React from 'react'
import './updater.css'
import { useState } from 'react'
import axios from 'axios';
function Updater() {
    const [parametertype, setparametertype] = useState("");
    const parameterchange = (e) => {
        setparametertype(e.target.value);
    };
  return (
    <>

    <div>
    <label>Select an option:</label>
    <select value={parametertype} onChange={parameterchange}>
      <option value="">Select an option</option>
      <option value="Tracks">Tracks</option>
      <option value="Album">Album</option>
      <option value="Artist">Artist</option>
    </select>
    <p>Selected Option: {parametertype}</p>
  </div>
  {parametertype==="Tracks" && <div className="container d-flex text-center box justify-content-around align-items-center">
    
    </div>}
    </>
  )
}

export default Updater