import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Upload, X, Link, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState('');

  const handleAddImage = () => {
    if (imageUrl.trim() && !images.includes(imageUrl.trim()) && images.length < maxImages) {
      onImagesChange([...images, imageUrl.trim()]);
      setImageUrl('');
    }
  };

  const handleRemoveImage = (imageToRemove: string) => {
    onImagesChange(images.filter(img => img !== imageToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddImage();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex space-x-2">
        <Input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Добавить URL изображения (jpg, png, gif)"
          disabled={images.length >= maxImages}
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddImage}
          disabled={!imageUrl.trim() || images.length >= maxImages}
        >
          <Upload className="w-4 h-4 mr-1" />
          Добавить
        </Button>
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground space-x-4">
        <div className="flex items-center space-x-1">
          <ImageIcon className="w-4 h-4" />
          <span>{images.length}/{maxImages} изображений</span>
        </div>
        <div className="flex items-center space-x-1">
          <Link className="w-4 h-4" />
          <span>Поддерживаются ссылки на изображения</span>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-video overflow-hidden rounded-md border bg-muted">
                <img 
                  src={image} 
                  alt={`Изображение ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full flex items-center justify-center bg-muted">
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-xs">Ошибка загрузки</p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(image)}
                className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              >
                <X className="w-3 h-3" />
              </button>
              <Badge 
                variant="secondary" 
                className="absolute bottom-1 left-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {index + 1}
              </Badge>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground mb-2">Пока нет изображений</p>
          <p className="text-sm text-muted-foreground">
            Добавьте ссылки на изображения, чтобы проиллюстрировать вашу идею
          </p>
        </div>
      )}
    </div>
  );
}