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
  <div className="container d-flex text-center box justify-content-around align-items-center">
    
    </div>
    </>
  )
}

export default Updater