export const ImageGalleryItem = ({ image, openModal }) => {
  const { webformatURL, tags } = image;

  return (
    <li className="gallery-item">
      <img src={webformatURL} alt={tags} onClick={openModal} />
    </li>
  );
};
