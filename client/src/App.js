import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Albums from './components/albums/Albums';
import Navbar from './components/navbar/Navbar';
import Landing from './components/landing/Landing';
import Tracks from './components/tracks/Tracks';
import Artist from './components/artist/Artist';
import Playlist from './components/playlist/Playlist';
import Recommendation from './components/recommendation/Recommendation';
import Updater from './components/updater/Updater';
import Delete from './components/delete/Delete';
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes> 
        <Route path="/" element={<Landing/>} />
        <Route path="/albums" element={<Albums/>} />
        <Route path="/artists" element={<Artist/>} />
        <Route path="/tracks" element={<Tracks/>}/>
        <Route path="/playlists" element={<Playlist/>}/>
        <Route path='/recommendations' element={<Recommendation/>}></Route>
        <Route path='/updater' element={<Updater/>}></Route>
        <Route path='/delete' element={<Delete/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
