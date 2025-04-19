import { useEffect, useState } from 'react';
import { fetchImages } from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchImages(query, page); //results: response.data.results, total_pages: response.total_pages
        setImages(prev => [...prev, ...data.results]);
        setTotalPages(data.totalPages);

        if (data.results.length === 0) {
          toast.error('No results. Try a different search.', {
            className: 'toastError',
          });
        }
      } catch (error) {
        console.error(error);
        setError(true);

        toast.error('Well, that didn’t work. Wanna try again later?');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleChangeQuery = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreBtn = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    if (page > 1) {
      window.scrollBy({
        top: 760,
        behavior: 'smooth',
      });
    }
  }, [images]);

  const openModal = image => {
    setIsOpen(true);
    setActiveImage(image);
  };
  const closeModal = () => {
    setIsOpen(false);
    setActiveImage(null);
  };

  return (
    <>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {images.length > 0 && <ImageGallery images={images} openModal={openModal} />}
      <ImageModal isOpen={isOpen} closeModal={closeModal} image={activeImage} />
      {loading && <Loader loading={loading} />}
      {page < totalPages && !loading && <LoadMoreBtn handleLoadMoreBtn={handleLoadMoreBtn} />}
    </>
  );
}

export default App;
