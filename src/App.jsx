import { useEffect, useState } from 'react';
import { fetchImages } from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        const data = await fetchImages(query);
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [query]);

  const handleChangeQuery = newQuery => {
    setQuery(newQuery);
  };

  return (
    <>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      <ImageGallery images={images} />
    </>
  );
}

export default App;
