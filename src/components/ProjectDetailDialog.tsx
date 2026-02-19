import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, Eye, Calendar, User, Tag, Folder } from 'lucide-react';
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
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <DialogTitle className="text-2xl leading-tight mb-3">
                {project.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{project.author}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{project.createdAt}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Badge className={`${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </Badge>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Folder className="w-4 h-4" />
                <span className="text-sm">{project.category}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Статистика */}
          <div className="flex items-center justify-center space-x-8 py-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 text-center">
              <Heart className="w-5 h-5 text-red-500" />
              <div>
                <div className="font-medium">{project.likes}</div>
                <div className="text-xs text-muted-foreground">нравится</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-center">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium">{project.comments}</div>
                <div className="text-xs text-muted-foreground">комментариев</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-center">
              <Eye className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium">{project.views}</div>
                <div className="text-xs text-muted-foreground">просмотров</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Описание */}
          <div>
            <h3 className="flex items-center space-x-2 mb-3">
              <span>Описание проекта</span>
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          </div>

          {/* Теги */}
          {project.tags.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="flex items-center space-x-2 mb-3">
                  <Tag className="w-4 h-4" />
                  <span>Теги</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Действия */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Нравится</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Комментировать</span>
              </Button>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                Поделиться
              </Button>
              <Button size="sm">
                Связаться с автором
              </Button>
            </div>
          </div>

          {/* Комментарии (заглушка) */}
          <div className="border-t pt-6">
            <h3 className="mb-4">Комментарии ({project.comments})</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Анна Волкова</div>
                    <div className="text-xs text-muted-foreground">2 дня назад</div>
                  </div>
                </div>
                <p className="text-sm">Отличная идея! Было бы здорово увидеть прототип интерфейса.</p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Михаил Новиков</div>
                    <div className="text-xs text-muted-foreground">1 день назад</div>
                  </div>
                </div>
                <p className="text-sm">Готов помочь с техническим планированием проекта!</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}