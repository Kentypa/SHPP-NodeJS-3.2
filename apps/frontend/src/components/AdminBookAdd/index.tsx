import { FC, useState } from "react";
import { useForm } from "../../hooks/use-form";
import { booksService } from "../../services/books-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const AdminBookAdd: FC = () => {
  const { addBook } = booksService("admin/api/v1/");

  const queryClient = useQueryClient();

  const addBookMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
    },
  });

  const [authors, setAuthors] = useState<string[]>([""]);

  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };

  const addAuthorField = () => {
    if (authors.length < 3) {
      setAuthors((prev) => [...prev, ""]);
    }
  };

  const validAuthors = authors.filter((a) => a.trim() !== "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChangeByValue("image", file);
    }
  };

  const addBookSubmit = () => {
    const formData = new FormData();

    formData.append("name", String(formState.title || ""));
    formData.append("year", String(formState.year || ""));
    formData.append("description", String(formState.description || ""));

    validAuthors.forEach((author, index) =>
      formData.append(`authors[${index}]`, author)
    );

    if (formState.image instanceof File) {
      formData.append("coverImage", formState.image);
    }

    console.log("Prepared FormData:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    addBookMutation.mutate(formData);
  };

  const { formState, handleChange, handleSubmit, handleChangeByValue } =
    useForm(
      {
        title: "",
        year: "",
        description: "",
        image: "",
      },
      addBookSubmit
    );

  return (
    <form
      className="border border-gray-600 p-6 rounded-xl max-w-2xl w-full mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold mb-4 border-b pb-2">Add new book</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <input
            name="title"
            value={
              typeof formState.title === "string" ||
              typeof formState.title === "number"
                ? formState.title
                : ""
            }
            onChange={handleChange}
            placeholder="Book name"
            className="border rounded-lg p-2"
          />
          <input
            name="year"
            value={
              typeof formState.year === "string" ||
              typeof formState.year === "number"
                ? formState.year
                : ""
            }
            onChange={handleChange}
            placeholder="Year"
            type="number"
            className="border rounded-lg p-2"
          />
          <label className="flex flex-col gap-2">
            <input
              type="file"
              id="image-upload"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-gray-100 border rounded-lg p-2 text-center"
            >
              {formState.image ? "Image selected" : "Load image"}
            </label>
          </label>
        </div>

        <div className="flex flex-col gap-2 col-span-1">
          {authors.map((author, idx) => (
            <input
              key={idx}
              value={author}
              onChange={(e) => handleAuthorChange(idx, e.target.value)}
              placeholder={`Author ${idx + 1}`}
              className="border rounded-lg p-2"
            />
          ))}
          {authors.length < 3 && (
            <button
              type="button"
              onClick={addAuthorField}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              + Add another author
            </button>
          )}
        </div>

        <div className="col-span-1">
          <textarea
            name="description"
            value={
              typeof formState.description === "string" ||
              typeof formState.description === "number"
                ? formState.description
                : ""
            }
            onChange={(e) => handleChangeByValue("description", e.target.value)}
            placeholder="Book description"
            rows={6}
            className="w-full border rounded-lg p-2 resize-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          type="submit"
          className="bg-green-300 hover:bg-green-400 text-black px-5 py-2 rounded-xl text-sm font-semibold"
        >
          ADD &gt;
        </button>
      </div>
    </form>
  );
};
