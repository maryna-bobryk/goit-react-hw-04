import React, { FC } from 'react';
import s from './ImageModal.module.css';
import Modal from 'react-modal';
import { useEffect } from 'react';
import { UnsplashImage } from '../../services/api.types';

Modal.setAppElement('#root');

interface ImageModalProps {
  image: UnsplashImage | null;
  isOpen: boolean;
  closeModal: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, closeModal, image }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className={s.wrapper} overlayClassName={s.modalOverlay}>
      <div className={s.imageWrapper}>
        <img src={image?.urls?.full} alt={image?.alt_description} className={s.modalImage} />
      </div>
      <ul className={s.list}>
        <li className={s.item}>
          <p className={s.description}>Author: {image?.user.name}</p>
        </li>
        <li className={s.item}>
          <p className={s.description}>Description: {image?.alt_description}</p>
        </li>
        <li className={s.item}>
          <p className={s.description}>Likes: {image?.likes}</p>
        </li>
        <li className={s.item}>
          <div className={s.downloadWrapper}>
            <a href={image?.urls?.full} target='_blank' className={s.downloadLink}>
              Download
            </a>
            <button onClick={closeModal} className={s.closeButton}>
              Close
            </button>
          </div>
        </li>
      </ul>
    </Modal>
  );
};

export default ImageModal;
