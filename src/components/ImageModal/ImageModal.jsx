import Modal from 'react-modal';
import s from './ImageModal.module.css';
import { useEffect } from 'react';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, closeModal, image }) => {
  // const { url, alt, name, description, location, portfolio } = image || {};

  useEffect(() => {
    const handleKeyDown = e => {
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
          <p className={s.description}>
            Author: {image?.user.first_name} {image?.user.last_name}
          </p>
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
