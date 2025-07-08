import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useBooks } from '../context/BookContext';
import { ArrowLeft, Edit, Trash2, Calendar, User, Building, Hash, BookOpen, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const BookDetails = () => {
  const { id } = useParams();
  const { getBook, deleteBook } = useBooks();
  const navigate = useNavigate();

  const book = id ? getBook(id) : undefined;


  if (!book) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Book not found</h3>
        <p className="text-muted-foreground mb-6">The book you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Library
            </motion.div>
          </Link>
        </Button>
      </div>
    );
  }

  const handleDelete = async () => {
    console.log(book);
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteBook(book._id);
      navigate('/');
    }
  };

  // Generate a consistent color based on book name
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
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" asChild>
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Library</span>
            </motion.div>
          </Link>
        </Button>

        <div className="flex space-x-4">
          <Button variant="secondary" asChild>
            <Link to={`/edit-book/${book._id}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </motion.div>
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            asChild
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Book Details */}
      <Card className="overflow-hidden shadow-xl">
        <div className="md:flex">
          {/* Book Cover */}
          <div className="md:w-1/3">
            <div className={`aspect-[3/4] bg-gradient-to-br ${getBookColor(book.name)} relative overflow-hidden`}>
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-8 left-8 right-8">
                <div className="h-2 bg-white/30 rounded-full mb-4"></div>
                <div className="h-1 bg-white/20 rounded-full"></div>
              </div>
              
              {/* Book icon and title */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                <BookOpen className="h-20 w-20 mb-6 opacity-80" />
                <div className="text-center">
                  <div className="text-6xl font-bold opacity-90 mb-4">
                    {book.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-lg font-medium opacity-80 text-center leading-tight">
                    {book.name}
                  </div>
                </div>
              </div>

              {/* Bottom decorative elements */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="h-1 bg-white/20 rounded-full mb-4"></div>
                <div className="h-2 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Book Info */}
          <CardContent className="md:w-2/3 p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">{book.name}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Author</p>
                  <p className="font-medium text-foreground">{book.author}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Publisher</p>
                  <p className="font-medium text-foreground">{book.publisher}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Published Date</p>
                  <p className="font-medium text-foreground">
                    {new Date(book.publishedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {book.description && (
              <div className="border-t pt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">Description</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{book.description}</p>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default BookDetails;