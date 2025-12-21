import React from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";

export const ImageGallery = ({ images, loadGallery }) => {
  return (
    <div className="ImageGallery">
      <ul className="gallery">
        {images.map((image) => {
          const modalRef = React.createRef(); // реф для модалки
          return (
            <div className="picture-wrapper" key={image.id}>
              <ImageGalleryItem
                image={image}
                openModal={() => modalRef.current.openModal()} // виклик openModal
              />
              <Modal ref={modalRef} image={image} />
            </div>
          );
        })}
      </ul>
      {images.length > 0 && <Button onClick={loadGallery} />}
    </div>
  );
};

