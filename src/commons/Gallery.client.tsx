import React, {useState} from 'react';
import clsx from "clsx";
import classes from "./Gallery.module.css";
// import {Dialog} from "./Dialog";
import {Dialog} from "~/commons/Dialog";

interface ImageDataProps {
  src: string;
  alt: string;
}

interface GalleryProps {
  data: ImageDataProps[];
  className?: string;
}

const GalleryClient = ({ data, className }: GalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (Array.isArray(data) === false || data.length === 0) {
    return null;
  }

  const openDialog = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setSelectedImageIndex(null);
    setIsOpen(false);
  };

  return (
    <>
      <figure className={clsx(classes.galleryItemMain, className)} onClick={() => openDialog(0)}>
        <img src={data[0].src} alt={data[0].alt}/>
      </figure>
      {data.length > 1 && (
        <ul className={classes.galleryItems}>
          {data.slice(1).map((image, index) => {
            const actualIndex = index + 1; // Fix index offset
            if (index < 4) {
              return (
                <li key={image.src} className={classes.galleryItem} onClick={() => openDialog(actualIndex)}>
                  <img src={image.src} alt={image.alt} />
                </li>
              )
            } else {
              return null;
            }
          })}
          {data.length > 5 && (
            <li className={classes.galleryMore} onClick={() => openDialog(5)}>
              <span>+{data.length - 5}</span>
            </li>
          )}
        </ul>
      )}

      <DialogGallery
        data={data}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
        isOpen={isOpen}
        onClose={closeDialog}
      />
    </>
  );
};

interface DialogGalleryProps {
  data: ImageDataProps[];
  selectedImageIndex: number | null;
  setSelectedImageIndex: (index: number | null) => void;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const DialogGallery = ({
  data,
  selectedImageIndex,
  setSelectedImageIndex,
  isOpen,
  onClose,
  className
}: DialogGalleryProps) => {

  if (!data?.length || selectedImageIndex === null || selectedImageIndex < 0 || selectedImageIndex >= data.length) {
    return null;
  }

  const navigateTo = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    if (direction === 'prev' && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else if (direction === 'next' && selectedImageIndex < data.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        navigateTo('prev');
        break;
      case 'ArrowRight':
        navigateTo('next');
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  return (
    <Dialog 
      id="gallery-dialog"
      className={className}
      isOpen={isOpen}
      onClose={onClose}
      onKeyDown={handleKeyDown}
    >
      <div className={classes.dialogContent}>
        <button 
          type="button"
          className={clsx(classes.dialogButton, classes.dialogButtonClose)}
          onClick={onClose}
          aria-label="Close gallery"
        >
          ×
        </button>
        
        <div className={classes.dialogContentImage}>
          <button 
            type="button"
            className={clsx(classes.dialogButton, classes.dialogButtonNav)}
            onClick={() => navigateTo('prev')}
            aria-label="Previous image"
            disabled={selectedImageIndex === 0}
          >
            ‹
          </button>

          <img 
            src={data[selectedImageIndex].src} 
            alt={data[selectedImageIndex].alt}
            className={classes.dialogImage}
          />

          <button 
            type="button"
            className={clsx(classes.dialogButton, classes.dialogButtonNav)}
            onClick={() => navigateTo('next')}
            aria-label="Next image"
            disabled={selectedImageIndex === data.length - 1}
          >
            ›
          </button>
        </div>
        
        <div className={classes.dialogInfo}>
          <span>{selectedImageIndex + 1} / {data.length}</span>
          <p>{data[selectedImageIndex].alt}</p>
        </div>
      </div>
    </Dialog>
  );
};

export default GalleryClient;
