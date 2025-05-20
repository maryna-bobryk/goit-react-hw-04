import React, { FC } from 'react';
import s from './ImageGallery.module.css';
import { UnsplashImage } from '../../services/api.types';
import ImageCard from '../ImageCard/ImageCard';

interface ImageGalleryProps {
  images: UnsplashImage[];
  openModal: (image: UnsplashImage) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <>
      <ul className={s.gallery}>
        {images.map(image => (
          <li key={image.id} className={s.galleryItem}>
            <ImageCard image={image} openModal={openModal} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default ImageGallery;
