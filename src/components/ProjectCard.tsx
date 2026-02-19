import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Eye, Calendar } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  author: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  createdAt: string;
  status: 'idea' | 'development' | 'completed';
  category: string;
  images?: string[];
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
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

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card 
      className="h-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 border-border/50 hover:border-primary/30"
      onClick={() => onClick(project)}
    >
      {project.images && project.images.length > 0 && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={project.images[0]} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="line-clamp-2 mb-2">{project.title}</h3>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>{project.author}</span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{project.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge className={`text-xs ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {project.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{project.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{project.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{project.views}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
            Подробнее
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}