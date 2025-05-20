import React, { FC } from 'react';
import s from './ImageCard.module.css';
import ImageModal from '../ImageModal/ImageModal';
import { UnsplashImage } from '../../services/api.types';

interface ImageCardProps {
  image: UnsplashImage;
  openModal: (image: UnsplashImage) => void;
}

const ImageCard: FC<ImageCardProps> = ({ image, openModal }: ImageCardProps) => {
  return (
    <div>
      <img className={s.galleryImage} src={image.urls.small} alt={image.alt_description} onClick={() => openModal(image)} />
    </div>
  );
};

export default ImageCard;
