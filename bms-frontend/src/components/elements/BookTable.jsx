import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';

const BookTable = ({ books, onDelete }) => {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      onDelete(id);
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
    <div className="overflow-hidden bg-card rounded-xl shadow-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%] text-left">Book</TableHead>
            <TableHead className="w-[20%] text-left">Author</TableHead>
            <TableHead className="w-[20%] text-left">Publisher</TableHead>
            <TableHead className="w-[15%] text-left">Published</TableHead>
            <TableHead className="w-[5%] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book, index) => (
            <motion.tr
              key={book._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-t"
            >
              {/* Book Column */}
              <TableCell className="align-middle">
                <Link to={`/book/${book._id}`} className="group flex items-center space-x-3">
                  <div className="flex-shrink-0 h-12 w-8">
                    <div className={`h-12 w-8 bg-gradient-to-br ${getBookColor(book.name)} rounded shadow-sm flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute top-1 left-0.5 right-0.5 h-0.5 bg-white/30 rounded-full"></div>
                      <div className="absolute bottom-1 left-0.5 right-0.5 h-0.5 bg-white/30 rounded-full"></div>
                      <BookOpen className="h-3 w-3 text-white/80" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {book.name}
                    </div>
                  </div>
                </Link>
              </TableCell>

              {/* Author */}
              <TableCell className="align-middle">
                <div className="text-sm text-foreground">{book.author}</div>
              </TableCell>

              {/* Publisher */}
              <TableCell className="align-middle">
                <div className="text-sm text-foreground">{book.publisher}</div>
              </TableCell>

              {/* Published Date */}
              <TableCell className="align-middle">
                <div className="text-sm text-foreground">
                  {new Date(book.publishedDate).toLocaleDateString()}
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell className="align-middle text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Link to={`/book/${book._id}`}>
                    <Button size="icon" variant="ghost" className="h-8 w-8" title="View">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Eye className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </Link>

                  <Link to={`/edit-book/${book._id}`}>
                    <Button size="icon" variant="ghost" className="h-8 w-8" title="Edit">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Edit className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </Link>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(book._id)}
                    title="Delete"
                  >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Trash2 className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookTable;
