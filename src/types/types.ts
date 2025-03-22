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

export interface ImageData {
    src: string;
    details?: {
      title?: string;
      duration?: string;
      description?: string;
      overview?: string;
      technicalDetails?: string;
      challenges?: string;
      date?: string;
      role?: string;
      technologies?: string[];
      features?: string[];
      link?: string;
    };
}

export interface PreviewItemProps {
    title: string;
    images: ImageData[];
}

export interface RowProps {
    title: string;
    images: ImageData[];
    previewItem: PreviewItemProps;
    index: number;
}
export interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    details: {
      title?: string;
      description?: string;
      overview?: string;
      technicalDetails?: string;
      challenges?: string;
      date?: string;
      role?: string;
      technologies?: string[];
      features?: string[];
      link?: string;
    };
}

export interface RowComponentProps extends RowProps {
    onImageClick: (image: ImageData) => void;
}

