import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, Grid, List, Plus, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBooks } from "@/context/BookContext";
import BookCard from "@/components/elements/BookCard";
import BookTable from "@/components/elements/BookTable";

const Home = () => {
  const { books, loading, deleteBook, searchBooks } = useBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filteredBooks, setFilteredBooks] = useState(books);

  React.useEffect(() => {
    setFilteredBooks(searchBooks(searchQuery));
  }, [searchQuery, books, searchBooks]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div className="space-y-8">
      {/* Header */}
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Book Inventory
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover, organize, and manage your personal book collection with
          ease. Add new books, track your reading, and never lose track of your
          literary treasures.
        </p>
      </motion.div>

      {/* Search and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search books, authors, or publishers..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-card rounded-lg p-1 shadow-sm border">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("table")}
              className="h-8 w-8"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button asChild>
            <Link to="/add-book">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Book</span>
              </motion.div>
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Books</p>
                <p className="text-2xl font-bold text-foreground">
                  {books.length}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Grid className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Search Results</p>
                <p className="text-2xl font-bold text-foreground">
                  {filteredBooks.length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Search className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique Authors</p>
                <p className="text-2xl font-bold text-foreground">
                  {new Set(books.map((book) => book.author)).size}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Filter className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Books Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchQuery ? "No books found" : "No books yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Start building your library by adding your first book"}
            </p>
            {!searchQuery && (
              <Button asChild>
                <Link to="/add-book">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add Your First Book
                  </motion.div>
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book, index) => (
                  <BookCard
                    key={book._id}
                    book={book}
                    onDelete={deleteBook}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <BookTable books={filteredBooks} onDelete={deleteBook} />
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Home;
