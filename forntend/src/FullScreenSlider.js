// src/FullScreenSlider.js
import React, { useState } from 'react';
import './App.css';

const FullScreenSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal on image click
  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="thumbnail"
            onClick={() => openModal(index)} // Open modal on click
          />
        ))}
      </div>

      {/* Modal for full-screen view */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="modal-image" />
            <button className="prev" onClick={prevImage}>❮</button>
            <button className="next" onClick={nextImage}>❯</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullScreenSlider;
