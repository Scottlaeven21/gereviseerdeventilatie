'use client';

import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div>
      {/* Main Image */}
      <div
        style={{
          width: '100%',
          height: '500px',
          background: 'white',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}
      >
        <img
          src={images[selectedImage]}
          alt={`${productName} - afbeelding ${selectedImage + 1}`}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            padding: '40px',
          }}
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
          }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              style={{
                width: '100px',
                height: '100px',
                background: 'white',
                border: selectedImage === index ? '3px solid #1266BD' : '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '8px',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseOver={(e) => {
                if (selectedImage !== index) {
                  e.currentTarget.style.borderColor = '#1266BD';
                }
              }}
              onMouseOut={(e) => {
                if (selectedImage !== index) {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }
              }}
            >
              <img
                src={image}
                alt={`${productName} - thumbnail ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
