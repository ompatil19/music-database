import './App.css';
import Albums from './components/albums/Albums';
function App() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Handle search functionality here using the searchText state
    console.log('Searching for:', searchText);
  };

  return (
    <>
    <Albums/>
    </>
  );
}

export default App;
