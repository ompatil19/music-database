import React from 'react'
import { useState } from 'react'
import {AiOutlineUsergroupDelete} from 'react-icons/ai'
import axios from 'axios';
function Delete() {
    const [artistname, setartistname] = useState("");
    const [finalmessage, setfinalmessage] = useState("");
    const changeartistname = (e) => {
        setartistname(e.target.value);
    }
    const deleteartist = (e) => {
        axios.delete(`http://localhost:3001/api/deleteArtist?artistName=${artistname}`).then((response) => {
            console.log("Artist deleted from db: ", response.data);
            setfinalmessage(response.data.message);
        });
    }
    return (
        <>
              <div className="container d-flex text-center box justify-content-around align-items-center">
            <div className='albumfetch d-flex flex-column align-items-center'>
                <AiOutlineUsergroupDelete className='albumicon' />
                <h1 className='color-green'>Delete Artist</h1>
                <input type="text" name="title" id="title" placeholder="Artist Name" onChange={changeartistname} className='albumbox' />
                <p className='fst-italic mt-3'>This action cannot be undone</p>
                <button className="btn" onClick={deleteartist}>
                    <span>Delete Artist</span>
                </button>
                {finalmessage && <p className='mt-5'>{finalmessage}</p>}
            </div>
        </div>
        </>
    )
}

export default Delete