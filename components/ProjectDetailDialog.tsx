import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, MessageCircle, Eye, Calendar, Share2, BookmarkPlus } from 'lucide-react';
import { Project } from './ProjectCard';

interface ProjectDetailDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusColors = {
  idea: 'bg-blue-100 text-blue-800 border-blue-200',
  development: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  completed: 'bg-green-100 text-green-800 border-green-200'
};

const statusLabels = {
  idea: 'Идея',
  development: 'В разработке',
  completed: 'Завершено'
};

export function ProjectDetailDialog({ project, isOpen, onClose }: ProjectDetailDialogProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="mb-3">{project.title}</DialogTitle>
              <DialogDescription className="sr-only">
                Подробная информация о проекте: {project.title}
              </DialogDescription>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                <span>Автор: {project.author}</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{project.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`${statusColors[project.status]}`}>
                  {statusLabels[project.status]}
                </Badge>
                <Badge variant="outline">
                  {project.category}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Изображения */}
          {project.images && project.images.length > 0 && (
            <div>
              <h3 className="mb-3">Изображения проекта</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="aspect-video overflow-hidden rounded-lg border">
                    <img 
                      src={image} 
                      alt={`${project.title} - изображение ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => window.open(image, '_blank')}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="mb-3">Описание проекта</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          <div>
            <h3 className="mb-3">Теги</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Heart className="w-5 h-5" />
                <span>{project.likes} лайков</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MessageCircle className="w-5 h-5" />
                <span>{project.comments} комментариев</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Eye className="w-5 h-5" />
                <span>{project.views} просмотров</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Сохранить
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Поделиться
              </Button>
              <Button size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Лайк
              </Button>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="mb-4">Обсуждение</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span>Анна Иванова</span>
                  <span className="text-sm text-muted-foreground">2 дня назад</span>
                </div>
                <p className="text-muted-foreground">
                  Отличная идея! Я работаю в похожей сфере и готова помочь с реализацией.
                </p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span>Михаил Петров</span>
                  <span className="text-sm text-muted-foreground">1 день назад</span>
                </div>
                <p className="text-muted-foreground">
                  Интересный подход! Есть ли у вас план монетизации?
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-4 border rounded-lg">
              <textarea 
                className="w-full p-3 border-0 resize-none focus:outline-none bg-transparent" 
                rows={3}
                placeholder="Оставьте свой комментарий..."
              />
              <div className="flex justify-end mt-2">
                <Button size="sm">
                  Отправить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}