import { useEffect, useState } from 'react';
import { fetchImages } from '../../services/api';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';
import { UnsplashImage, UnsplashResponse } from '../../services/api.types';
import './App.css';
import { ToastMessages } from '../../types/types';

function App() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<UnsplashImage | null>(null);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        if (!query) return;
        setLoading(true);
        setError(false);
        const data: UnsplashResponse = await fetchImages(query, page);
        setImages(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages);

        if (data.results.length === 0) {
          toast.error(ToastMessages.NoResults);
          return;
        }
      } catch (error) {
        setError(true);
        toast.error(ToastMessages.ApiError);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleChangeQuery = (newQuery: string): void => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(false);
  };
  const handleLoadMoreBtn = (): void => {
    setPage(page + 1);
  };

  const openModal = (image: UnsplashImage): void => {
    setIsOpen(true);
    setActiveImage(image);
  };
  const closeModal = (): void => {
    setIsOpen(false);
    setActiveImage(null);
  };

  useEffect(() => {
    if (page > 1) {
      window.scrollBy({
        top: 760,
        behavior: 'smooth',
      });
    }
  }, [images]);

  return (
    <>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {images.length > 0 && !error && <ImageGallery images={images} openModal={openModal} />}
      {error && <ErrorMessage />}
      <ImageModal isOpen={isOpen} closeModal={closeModal} image={activeImage} />
      {loading && <Loader loading={loading} />}
      {page < totalPages && !loading && <LoadMoreBtn handleLoadMoreBtn={handleLoadMoreBtn} />}
    </>
  );
}

export default App;
