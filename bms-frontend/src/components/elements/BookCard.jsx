import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Building, Eye, Edit, Trash2, BookOpen } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

const BookCard = ({ book, onDelete, index }) => {
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this book?')) {
      onDelete(book._id);
    }
  };

  const getBookColor = (name) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-red-500 to-red-600',
      'from-yellow-500 to-yellow-600',
      'from-indigo-500 to-indigo-600',
      'from-pink-500 to-pink-600',
      'from-teal-500 to-teal-600',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={() => navigate(`/book/${book._id}`)}
      className="group cursor-pointer"
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
        <div className="relative">
          <div className={`h-48 bg-gradient-to-br ${getBookColor(book.name)} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="absolute top-4 left-4 right-4">
              <div className="h-1 bg-white/30 rounded-full mb-2"></div>
              <div className="h-0.5 bg-white/20 rounded-full"></div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <BookOpen className="h-12 w-12 mb-2 opacity-80" />
              <div className="text-4xl font-bold opacity-90">
                {book.name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-0.5 bg-white/20 rounded-full mb-2"></div>
              <div className="h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <div className="flex space-x-2">
              <Link to={`/book/${book._id}`}>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-white/90 hover:bg-white"
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Eye className="h-4 w-4" />
                  </motion.div>
                </Button>
              </Link>

              <Link to={`/edit-book/${book._id}`}>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-white/90 hover:bg-white"
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Edit className="h-4 w-4" />
                  </motion.div>
                </Button>
              </Link>

              <Button
                size="icon"
                variant="destructive"
                className="h-8 w-8"
                onClick={handleDelete}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Trash2 className="h-4 w-4" />
                </motion.div>
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-6 bg-white">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 leading-tight">
              {book.name}
            </h3>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{book.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{book.publisher}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{new Date(book.publishedDate).getFullYear()}</span>
            </div>
          </div>

          {book.description && (
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {book.description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookCard;
