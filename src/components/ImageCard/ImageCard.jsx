import s from './ImageCard.module.css';
import ImageModal from '../ImageModal/ImageModal';

const ImageCard = ({ image, openModal }) => {
  return (
    <div>
      <img className={s.galleryImage} src={image.urls.small} alt={image.alt_description} onClick={() => openModal(image)} />
    </div>
  );
};

export default ImageCard;
