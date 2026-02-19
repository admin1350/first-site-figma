'use client'
import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ProjectCard, Project } from '@/components/ProjectCard';
import { NewIdeaDialog } from '@/components/NewIdeaDialog';
import { ProjectDetailDialog } from '@/components/ProjectDetailDialog';
import { ProjectFilters } from '@/components/ProjectFilters';

// Мок-данные для демонстрации
const initialProjects: Project[] = [
  {
    id: 1,
    title: "Платформа для обмена навыками между студентами",
    description: "Идея создания платформы, где студенты могут обмениваться знаниями и навыками. Например, студент IT может помочь с программированием в обмен на уроки иностранного языка. Платформа будет включать систему рейтингов, календарь встреч и видеочат.",
    author: "Алексей Смирнов",
    tags: ["образование", "веб-разработка", "социальные-сети"],
    likes: 42,
    comments: 8,
    views: 156,
    createdAt: "2 дня назад",
    status: "idea",
    category: "Образование",
    images: ["https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NTg0NjgxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080"]
  },
  {
    id: 2,
    title: "AI-ассистент для экологичного образа жизни",
    description: "Мобильное приложение с использованием ИИ, которое поможет людям вести более экологичный образ жизни. Приложение будет анализировать привычки пользователя и предлагать персонализированные советы по снижению углеродного следа.",
    author: "Мария Петрова",
    tags: ["искусственный-интеллект", "экология", "мобильные-приложения"],
    likes: 67,
    comments: 12,
    views: 234,
    createdAt: "1 день назад",
    status: "development",
    category: "Экология",
    images: ["https://images.unsplash.com/photo-1570828066702-7706220a65f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZWNvbG9neSUyMGdyZWVufGVufDF8fHx8MTc1ODQ3Mjc4Nnww&ixlib=rb-4.1.0&q=80&w=1080"]
  },
  {
    id: 3,
    title: "Блокчейн-система для медицинских записей",
    description: "Децентрализованная система хранения медицинских записей на блокчейне, обеспечивающая безопасность и приватность данных пациентов. Врачи смогут получать доступ к полной истории болезни с разрешения пациента.",
    author: "Дмитрий Иванов",
    tags: ["блокчейн", "здоровье", "безопасность"],
    likes: 89,
    comments: 15,
    views: 378,
    createdAt: "3 дня назад",
    status: "development",
    category: "Здравоохранение",
    images: ["https://images.unsplash.com/photo-1631507623121-eaaba8d4e7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwbWVkaWNhbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU4NDcyNzg5fDA&ixlib=rb-4.1.0&q=80&w=1080"]
  },
  {
    id: 4,
    title: "Игровая платформа для изучения программирования",
    description: "Интерактивная игровая платформа, где дети и подростки могут изучать основы программирования через решение головоломок и создание простых игр. Включает систему достижений и соревнования между учащимися.",
    author: "Елена Козлова",
    tags: ["образование", "игры", "веб-разработка"],
    likes: 56,
    comments: 9,
    views: 189,
    createdAt: "4 дня назад",
    status: "completed",
    category: "Образование",
    images: ["https://images.unsplash.com/photo-1717588282722-ab1beb899c26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGdhbWluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NTg0NzI3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"]
  },
  {
    id: 5,
    title: "Платформа для поиска ментора в IT",
    description: "Сервис, который поможет начинающим разработчикам найти опытного ментора в IT-сфере. Включает систему подбора по навыкам и интересам, возможность проведения онлайн-встреч и трекинг прогресса обучения.",
    author: "Андрей Волков",
    tags: ["образование", "менторство", "веб-разработка"],
    likes: 73,
    comments: 11,
    views: 267,
    createdAt: "5 дней назад",
    status: "idea",
    category: "Технологии",
    images: ["https://images.unsplash.com/photo-1733826544831-ad71d05c8423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3JzaGlwJTIwdGVjaG5vbG9neSUyMHN0YXJ0dXB8ZW58MXx8fHwxNzU4NDcyNzk1fDA&ixlib=rb-4.1.0&q=80&w=1080"]
  },
  {
    id: 6,
    title: "Арт-маркетплейс с поддержкой NFT",
    description: "Цифровая платформа для художников, где они могут продавать свои работы как в традиционном формате, так и в виде NFT. Включает инструменты для создания виртуальных выставок и интеграцию с популярными блокчейн-сетями.",
    author: "София Новикова",
    tags: ["искусство", "блокчейн", "электронная-коммерция"],
    likes: 91,
    comments: 16,
    views: 423,
    createdAt: "6 дней назад",
    status: "development",
    category: "Искусство",
    images: ["https://images.unsplash.com/photo-1492037766660-2a56f9eb3fcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwbmZ0JTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzU4NDcyNzk4fDA&ixlib=rb-4.1.0&q=80&w=1080"]
  }
];

export default function Page() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isNewIdeaDialogOpen, setIsNewIdeaDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map(p => p.category))];
    return uniqueCategories.sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      const matchesTags = activeTags.length === 0 || activeTags.some(tag => project.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesStatus && matchesTags;
    });

    // Сортировка
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'discussed':
        filtered.sort((a, b) => b.comments - a.comments);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [projects, searchTerm, selectedCategory, selectedStatus, sortBy, activeTags]);

  const handleNewIdea = (ideaData: Omit<Project, 'id' | 'likes' | 'comments' | 'views' | 'createdAt'>) => {
    const newProject: Project = {
      ...ideaData,
      id: Math.max(...projects.map(p => p.id)) + 1,
      likes: 0,
      comments: 0,
      views: 0,
      createdAt: 'только что'
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDetailDialogOpen(true);
    // Увеличиваем количество просмотров
    setProjects(prev => prev.map(p =>
      p.id === project.id ? { ...p, views: p.views + 1 } : p
    ));
  };

  const handleTagToggle = (tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedStatus('all');
    setActiveTags([]);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onNewIdeaClick={() => setIsNewIdeaDialogOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <ProjectFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
        activeTags={activeTags}
        onTagToggle={handleTagToggle}
        onClearFilters={handleClearFilters}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="mb-2">
              {searchTerm ? `Результаты поиска: "${searchTerm}"` : 'Лента идей и проектов'}
            </h2>
            <p className="text-muted-foreground">
              Найдено проектов: {filteredProjects.length}
            </p>
          </div>
          <p className="text-muted-foreground">
            Откройте для себя новые идеи и поделитесь своими проектами с сообществом
          </p>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="mb-2">Проектов не найдено</h3>
              <p className="text-muted-foreground mb-4">
                Попробуйте изменить параметры поиска или добавьте свою идею первым!
              </p>
              <button
                onClick={() => setIsNewIdeaDialogOpen(true)}
                className="text-primary hover:underline"
              >
                Поделиться новой идеей
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        )}
      </main>

      <NewIdeaDialog
        isOpen={isNewIdeaDialogOpen}
        onClose={() => setIsNewIdeaDialogOpen(false)}
        onSubmit={handleNewIdea}
      />

      <ProjectDetailDialog
        project={selectedProject}
        isOpen={isDetailDialogOpen}
        onClose={() => {
          setIsDetailDialogOpen(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
}
