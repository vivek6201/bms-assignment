import { API } from '@/utils/api';
import React, { createContext, useContext, useState, useEffect } from 'react';

const BookContext = createContext(undefined);

export const BookProvider= ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
        const res = await API.get('/books');
        setBooks(res.data);
    } catch (error) {
        setBooks([]);
    }
    finally{
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks()
  }, []);

  const addBook = async (bookData) => {
    const newBook = {
      id: Date.now().toString(),
      ...bookData
    };

   await API.post("/books", newBook)
   fetchBooks();
  };

  const updateBook = async (id, bookData) => {
    await API.put(`/books/${id}`, bookData)
    await fetchBooks();
  };

  const deleteBook = async (id) => {
    await API.delete(`/books/${id}`)
    fetchBooks()
  };

  const getBook = (id) => {
    return books.find(book => book._id === id);
  };

  const searchBooks = (query) => {
    if (!query.trim()) return books;
    
    return books.filter(book =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.publisher.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <BookContext.Provider value={{
      books,
      loading,
      addBook,
      updateBook,
      deleteBook,
      getBook,
      searchBooks
    }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};