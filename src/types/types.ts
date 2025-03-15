  export interface RowProps {
    title: string;
    images: ImageData[];
    previewItem: PreviewItemProps;
    index: number;
  }
  
  export interface ImageData {
    src: string;
  }
  
  export interface PreviewItemDOMElements {
    el: HTMLElement | null;
    title: HTMLElement | null;
    grid: HTMLElement | null;
    images: HTMLElement[];
  }
  
  export interface RowDOMElements {
    el: HTMLElement | null;
    titleWrap: HTMLElement | null;
    title: HTMLElement | null;
    imagesWrap: HTMLElement | null;
    images: HTMLElement[];
  }

// src/types/types.ts

// Assuming this is your current ImageData interface
export interface ImageData {
    src: string;
    details?: {
      title?: string;
      description?: string;
      date?: string;
      technologies?: string[];
      link?: string;
    };
  }
  
  // Assuming this is your current PreviewItemProps interface
  export interface PreviewItemProps {
    title: string;
    images: ImageData[];
  }
  
  // Your current RowProps interface
  export interface RowProps {
    title: string;
    images: ImageData[];
    previewItem: PreviewItemProps;
    index: number;
  }
  
  // New interface for the ImageModal component
  export interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    details: {
      title?: string;
      description?: string;
      date?: string;
      technologies?: string[];
      link?: string;
    };
  }
  
  // Extended Row component props with the click handler
  export interface RowComponentProps extends RowProps {
    onImageClick: (image: ImageData) => void;
  }
  