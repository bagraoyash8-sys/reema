import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  hotelName: string;
  initialIndex?: number;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  hotelName,
  initialIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  if (!isOpen) return null;

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md animate-fadeIn text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg">{hotelName}</h3>
          <span className="text-xs text-slate-400">
            Photo {activeIndex + 1} of {images.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        <button
          onClick={prevImage}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <img
          src={images[activeIndex]}
          alt={`${hotelName} photo ${activeIndex + 1}`}
          className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl animate-fadeIn"
        />

        <button
          onClick={nextImage}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="p-4 border-t border-white/10 bg-black/40 overflow-x-auto flex items-center justify-center gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative rounded-xl overflow-hidden flex-shrink-0 transition-all ${
              idx === activeIndex
                ? 'ring-2 ring-brand-500 scale-105 opacity-100'
                : 'opacity-50 hover:opacity-80'
            }`}
          >
            <img src={img} alt="thumbnail" className="w-16 h-12 sm:w-20 sm:h-14 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
