import { RowProps, RowDOMElements } from '../types/types';
import { PreviewItemInstance } from './PreviewItem';

export class RowInstance {
  // DOM elements
  DOM: RowDOMElements = {
    el: null,
    title: null,
    titleWrap: null,
    imagesWrap: null,
    images: []
  };
  
  previewItem: PreviewItemInstance;

  /**
   * Constructor.
   * @param {Element} DOM_el - main element (.row)
   * @param {PreviewItemInstance} previewItemInstance - the preview item instance
   */
  constructor(DOM_el: HTMLElement, DOM_previewItem: HTMLElement) {
    this.DOM.el = DOM_el;
    this.previewItem = new PreviewItemInstance(DOM_previewItem);
    this.DOM.titleWrap = this.DOM.el.querySelector('.cell__title');
    this.DOM.title = this.DOM.titleWrap?.querySelector('.oh__inner') || null;
    this.DOM.imagesWrap = this.DOM.el.querySelector('.cell--images');
    this.DOM.images = [...this.DOM.el.querySelectorAll('.cell__img')];
  }
}

const Row: React.FC<RowProps> = ({ title, images, index }) => {
  return (
    <div className="row">
      <div className="cell cell--text">
        <h2 className="cell__title oh">
          <span className="oh__inner">{title}</span>
        </h2>
      </div>
      <div className="cell cell--images">
        {images.map((image, i) => (
          <div key={i} className="cell__img">
            <div 
              className="cell__img-inner" 
              style={{ backgroundImage: `url(${image.src})` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;