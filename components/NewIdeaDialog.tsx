import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';
import { Project } from './ProjectCard';
import { ImageUpload } from './ImageUpload';

interface NewIdeaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (idea: Omit<Project, 'id' | 'likes' | 'comments' | 'views' | 'createdAt'>) => void;
}

const categories = [
  'Технологии',
  'Бизнес',
  'Образование',
  'Здравоохранение',
  'Экология',
  'Искусство',
  'Социальные проекты',
  'Наука'
];

type IdeaStatus = 'idea' | 'development' | 'completed';

export function NewIdeaDialog({ isOpen, onClose, onSubmit }: NewIdeaDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    status: 'idea' as IdeaStatus,
    tags: [] as string[],
    images: [] as string[]
  });
  const [currentTag, setCurrentTag] = useState('');

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.author && formData.category) {
      onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        author: '',
        category: '',
        status: 'idea' as IdeaStatus,
        tags: [],
        images: []
      });
      setCurrentTag('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Поделиться новой идеей</DialogTitle>
          <DialogDescription>
            Заполните форму ниже, чтобы поделиться своей идеей с сообществом Движения Первых
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Название идеи</label>
              <Input
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Краткое и понятное название вашей идеи"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Автор</label>
              <Input
                value={formData.author}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Ваше имя или псевдоним"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Категория</label>
              <Select value={formData.category} onValueChange={(value: string) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2">Статус</label>
              <Select value={formData.status} onValueChange={(value: IdeaStatus) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Идея</SelectItem>
                  <SelectItem value="development">В разработке</SelectItem>
                  <SelectItem value="completed">Завершено</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2">Описание</label>
              <Textarea
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Подробно опишите вашу идею, проблему которую она решает, и как вы планируете её реализовать..."
                rows={6}
                required
              />
            </div>

            <div>
              <label className="block mb-2">Изображения</label>
              <ImageUpload
                images={formData.images}
                onImagesChange={(images: string[]) => setFormData(prev => ({ ...prev, images }))}
                maxImages={3}
              />
            </div>

            <div>
              <label className="block mb-2">Теги</label>
              <div className="flex space-x-2 mb-3">
                <Input
                  value={currentTag}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Добавить тег"
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  Добавить
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit">
              Опубликовать идею
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
