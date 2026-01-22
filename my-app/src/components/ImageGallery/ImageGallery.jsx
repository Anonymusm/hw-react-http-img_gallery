import { useState } from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";

export const ImageGallery = ({ images, loadMore }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="ImageGallery">
      <ul className="gallery">
        {images.map((image) => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            openModal={() => setSelectedImage(image)}
          />
        ))}
      </ul>
      
      {images.length > 0 && <Button onClick={loadMore} />}

      {selectedImage && (
        <Modal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
};