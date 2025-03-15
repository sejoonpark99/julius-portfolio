import { useRef, useEffect } from 'react';
import { PreviewItemProps, PreviewItemDOMElements } from '../types/types';

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
    this.DOM.images = [...this.DOM.el.querySelectorAll('.cell__img')];
  }
}

export const PreviewItem: React.FC<PreviewItemProps> = ({ title, images }) => {
  return (
    <div className="preview__item">
      <h2 className="preview__item-title oh">
        <span className="oh__inner">{title}</span>
      </h2>
      <div className="grid">
        {images.map((image, i) => (
          <div key={i} className="cell__img">
            <div className="cell__img-inner" style={{ backgroundImage: `url(${image.src})` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewItem;