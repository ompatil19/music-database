import React from 'react'

function Albums() {
  return (
    <>
        <h1>Albums</h1>
        <form action="">
            <input type="text" name="title" id="title" placeholder="Album name"/>
            <input type="button" value="Get album" />
        </form>
    </>
  )
}

export default Albums