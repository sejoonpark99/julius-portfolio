import React, { useRef } from 'react';
import PreviewItem from './PreviewItem';
import { RowProps } from '../types/types';

interface PreviewProps {
  items: RowProps[];
}

const Preview: React.FC<PreviewProps> = ({ items }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  
  return (
    <section className="preview">
      <button className="preview__close unbutton" ref={closeRef}>&#9587;</button>
      
      {items.map((item, index) => (
        <PreviewItem 
          key={index}
          title={item.previewItem.title}
          images={item.previewItem.images}
        />
      ))}
    </section>
  );
};

export default Preview;