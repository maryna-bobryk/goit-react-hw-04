import s from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <div className={s.galleryWrapper}>
      <ul className={s.gallery}>
        {images.map(image => (
          <li key={image.id} className={s.galleryItem}>
            <a href={image.urls.small} target='_blank'></a>
            <img className={s.galleryImage} src={image.urls.small} alt={image.alt_description} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ImageGallery;
