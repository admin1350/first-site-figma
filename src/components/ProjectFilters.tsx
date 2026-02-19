import React, { useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface ProjectFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  activeTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

const statusOptions = [
  { value: 'all', label: 'Все статусы' },
  { value: 'idea', label: 'Идеи' },
  { value: 'development', label: 'В разработке' },
  { value: 'completed', label: 'Завершенные' }
];

const sortOptions = [
  { value: 'newest', label: 'Сначала новые' },
  { value: 'popular', label: 'По популярности' },
  { value: 'discussed', label: 'По обсуждаемости' }
];

const popularTags = [
  'образование', 'веб-разработка', 'искусственный-интеллект', 
  'экология', 'блокчейн', 'здоровье', 'игры', 'менторство',
  'социальные-сети', 'мобильные-приложения', 'безопасность', 'искусство'
];

export function ProjectFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  activeTags,
  onTagToggle,
  onClearFilters
}: ProjectFiltersProps) {
  const hasActiveFilters = useMemo(() => {
    return selectedCategory !== 'all' || selectedStatus !== 'all' || activeTags.length > 0;
  }, [selectedCategory, selectedStatus, activeTags]);

  return (
    <div className="bg-muted/30 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 mb-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Фильтры и сортировка:</span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3 mr-1" />
              Сбросить все
            </Button>
          )}
        </div>

        <div className="flex flex-col space-y-4">
          {/* Основные фильтры */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Категория:</span>
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Статус:</span>
              <Select value={selectedStatus} onValueChange={onStatusChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Сортировка:</span>
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Теги */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-muted-foreground">Популярные теги:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={activeTags.includes(tag) ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors text-xs ${
                    activeTags.includes(tag)
                      ? 'bg-primary text-primary-foreground hover:bg-primary/80'
                      : 'hover:bg-secondary/80'
                  }`}
                  onClick={() => onTagToggle(tag)}
                >
                  #{tag}
                  {activeTags.includes(tag) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Активные фильтры */}
          {hasActiveFilters && (
            <div className="flex items-center space-x-2 pt-2 border-t border-border/30">
              <span className="text-sm text-muted-foreground">Активные фильтры:</span>
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== 'all' && (
                  <Badge variant="outline" className="text-xs">
                    Категория: {selectedCategory}
                    <button
                      onClick={() => onCategoryChange('all')}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedStatus !== 'all' && (
                  <Badge variant="outline" className="text-xs">
                    Статус: {statusOptions.find(s => s.value === selectedStatus)?.label}
                    <button
                      onClick={() => onStatusChange('all')}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {activeTags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                    <button
                      onClick={() => onTagToggle(tag)}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}