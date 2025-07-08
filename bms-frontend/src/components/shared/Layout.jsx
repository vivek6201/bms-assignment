import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Home, Plus, Search } from 'lucide-react';
import { Button } from '../ui/button';


const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/add-book', label: 'Add Book', icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-background to-purple-50">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              
              <span className="text-xl font-bold text-foreground">Book Inventory</span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Button
                  variant={location.pathname === path ? "default" : "ghost"}
                  asChild
                  key={path}
                >
                  <Link to={path} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                </Button>
              ))}
            </nav>

            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;