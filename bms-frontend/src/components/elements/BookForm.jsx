import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Save, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const BookForm = ({ initialData, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      author: "",
      publishedDate: "",
      publisher: "",
      shortDescription: "",
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Book name is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.publishedDate)
      newErrors.publishedDate = "Published date is required";
    if (!formData.publisher.trim())
      newErrors.publisher = "Publisher is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="mb-2 block">
                Book Name *
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${errors.name ? "border-destructive" : ""}`}
                placeholder="Enter book name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="author" className="mb-2 block">
                Author *
              </Label>
              <Input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={`${errors.author ? "border-destructive" : ""}`}
                placeholder="Enter author name"
              />
              {errors.author && (
                <p className="mt-1 text-sm text-destructive">{errors.author}</p>
              )}
            </div>

            <div>
              <Label htmlFor="publishedDate" className="mb-2 block">
                Published Date *
              </Label>
              <Input
                type="date"
                id="publishedDate"
                name="publishedDate"
                value={formData.publishedDate?.slice(0, 10) || ""}
                onChange={handleChange}
                className={`${
                  errors.publishedDate ? "border-destructive" : ""
                }`}
              />
              {errors.publishedDate && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.publishedDate}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="publisher" className="mb-2 block">
                Publisher *
              </Label>
              <Input
                type="text"
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                className={`${errors.publisher ? "border-destructive" : ""}`}
                placeholder="Enter publisher name"
              />
              {errors.publisher && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.publisher}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="shortDescription" className="mb-2 block">
                Description
              </Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription || ""}
                onChange={handleChange}
                rows={4}
                placeholder="Enter book description"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel} asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </motion.div>
        </Button>
        <Button type="submit" asChild onClick={handleSubmit}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>{isEditing ? "Update Book" : "Add Book"}</span>
          </motion.div>
        </Button>
      </div>
    </motion.form>
  );
};

export default BookForm;
