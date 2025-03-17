import React, { useState } from 'react';
import { PreviewItemProps, ImageData, PreviewItemDOMElements } from '../types/types';
import ImageDialog from './ImageDialog';

// Keep the PreviewItemInstance class for backward compatibility
export class PreviewItemInstance {
  // DOM elements
  DOM: PreviewItemDOMElements = {
    el: null,
    title: null,
    grid: null,
    images: []
  };

  /**
   * Constructor.
   * @param {Element} DOM_el - main element (.preview__item)
   */
  constructor(DOM_el: HTMLElement) {
    this.DOM.el = DOM_el;
    this.DOM.title = this.DOM.el.querySelector('.preview__item-title > .oh__inner');
    this.DOM.grid = this.DOM.el.querySelector('.grid');
    this.DOM.images = [...this.DOM.el.querySelectorAll('.cell__img')] as HTMLElement[];
  }
}

export const PreviewItem: React.FC<PreviewItemProps> = ({ title, images }) => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageClick = (e: React.MouseEvent, image: ImageData) => {
    // Stop event propagation
    e.stopPropagation();
    
    // Set the selected image and open the dialog
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    // The actual DOM removal will be handled by the ImageDialog component after animation
    setIsDialogOpen(false);
  };

  return (
    <div className="preview__item">
      <h2 className="preview__item-title oh">
        <span className="oh__inner">{title}</span>
      </h2>
      <div className="grid">
        {images.map((image, i) => (
          <div 
            key={i} 
            className="cell__img" 
            onClick={(e) => handleImageClick(e, image)}
            style={{ cursor: 'pointer' }}
          >
            <div 
              className="cell__img-inner" 
              style={{ backgroundImage: `url(${image.src})` }}
            ></div>
          </div>
        ))}
      </div>
      
      <ImageDialog 
        isOpen={isDialogOpen} 
        onClose={closeDialog} 
        image={selectedImage} 
      />
    </div>
  );
};

export default PreviewItem;