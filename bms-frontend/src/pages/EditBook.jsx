import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useBooks } from "../context/BookContext";
import BookForm from "../components/elements/BookForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const EditBook = () => {
  const { id } = useParams();
  const { getBook, updateBook } = useBooks();
  const navigate = useNavigate();

  const book = id ? getBook(id) : undefined;

  const handleSubmit = (data) => {
    if (id) {
      updateBook(id, data);
      navigate(`/book/${id}`);
    }
  };

  const handleCancel = () => {
    if (id) {
      navigate(`/book/${id}`);
    } else {
      navigate("/");
    }
  };

  if (!book) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Book not found
        </h3>
        <p className="text-muted-foreground mb-6">
          The book you're trying to edit doesn't exist.
        </p>
        <Button asChild>
          <Link to="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Back to Library
            </motion.div>
          </Link>
        </Button>
      </div>
    );
  }

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
          <Link to={`/book/${book._id}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Book Details</span>
            </motion.div>
          </Link>
        </Button>

        <h1 className="text-3xl font-bold text-foreground mb-2">Edit Book</h1>
        <p className="text-muted-foreground">
          Update the details of "{book.name}".
        </p>
      </div>

      <BookForm
        initialData={{
          name: book.name,
          author: book.author,
          publishedDate: book.publishedDate,
          publisher: book.publisher,
          shortDescription: book.shortDescription,
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={true}
      />
    </motion.div>
  );
};

export default EditBook;
