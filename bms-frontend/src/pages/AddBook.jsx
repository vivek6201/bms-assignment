import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useBooks } from '../context/BookContext';
import BookForm from '../components/elements/BookForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const AddBook = () => {
  const { addBook } = useBooks();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    addBook(data);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
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
        
        <h1 className="text-3xl font-bold text-foreground mb-2">Add New Book</h1>
        <p className="text-muted-foreground">
          Add a new book to your personal library collection.
        </p>
      </div>

      <BookForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={false}
      />
    </motion.div>
  );
};

export default AddBook;