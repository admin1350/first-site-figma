import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';

interface HeaderProps {
  onNewIdeaClick: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function Header({ onNewIdeaClick, searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white border-b border-border shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white rounded-lg">
                <img 
                  src="https://raw.githubusercontent.com/admin1350/PetroStudying/main/e1c2bed9ab4c849509b3bab10ce49db79e8c354a.png"
                  alt="Логотип ВДОСТУПЕ" 
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl">ВДОСТУПЕ</h1>
                <p className="text-sm text-muted-foreground">Место для твоих идей</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Поиск идей и проектов..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-input-background"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button onClick={onNewIdeaClick} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Новая идея</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
