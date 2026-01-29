import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { donateBook, uploadFile } from "../services/libraryService";
import toast, { Toaster } from "react-hot-toast";
import { CpuChipIcon } from "@heroicons/react/24/outline";
import { useAuth } from "react-oidc-context";

export default function DonationForm() {
  const auth = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const uploaded = acceptedFiles[0];
      setFile(uploaded);
      setPreview(URL.createObjectURL(uploaded));
      toast.success(`Uploaded: ${uploaded.name}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await donateBook(
        { title, author, language, category, isbn, file },
        auth.user?.access_token
      );
      toast.success("Book donated successfully! Awaiting approval.");

      // Reset form
      setTitle("");
      setAuthor("");
      setLanguage("");
      setCategory("");
      setIsbn("");
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Error donating book");
    }
  };

  const handleIdentifyBook = async () => {
    if (!file) return toast.error("Please upload a file first!");
    try {
      const response = await uploadFile(file, auth.user?.access_token);
      toast.success("🤖 Book details identified!");
      console.log("Backend response:", response);
      // Optionally auto-fill fields
      // setTitle(response.title || "");
      // setAuthor(response.author || "");
      // setIsbn(response.isbn || "");
    } catch (err) {
      console.error(err);
      toast.error("Error identifying book");
    }
  };

  return (
    <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-center text-gray-100 mb-10">
        📖 Donate a Book
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left column: Upload + AI + Preview */}
        <div className="space-y-6 flex flex-col justify-start items-center">
          {/* Drag & Drop Zone */}
          <div
            {...getRootProps()}
            className={`w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-400 bg-gray-700" : "border-gray-600"
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <p className="text-green-400 font-medium">Uploaded: {file.name}</p>
            ) : (
              <p className="text-gray-400">Drag & drop a cover image, or click to select</p>
            )}
          </div>

          {/* Preview Thumbnail */}
          {preview && (
            <img
              src={preview}
              alt="Book cover preview"
              className="w-40 h-56 object-cover rounded-lg shadow-md"
            />
          )}

          {/* AI Identify Button */}
          <button
            type="button"
            onClick={handleIdentifyBook}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg text-base font-semibold transition-colors"
          >
            <CpuChipIcon className="w-5 h-5" />
            AI Identify Book
          </button>
        </div>

        {/* Right column: Input fields */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Book Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">ISBN</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Language</option>
              <option value="Zulu">Zulu</option>
              <option value="Xhosa">Xhosa</option>
              <option value="Afrikaans">Afrikaans</option>
              <option value="Sesotho">Sesotho</option>
              <option value="Tswana">Tswana</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="fiction">Fiction</option>
              <option value="nonfiction">Non-fiction</option>
              <option value="fantasy">Fantasy</option>
              <option value="history">History</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg text-base font-semibold transition-colors"
          >
            Contribute Book
          </button>
        </div>
      </form>
      <Toaster position="top-right" />
    </div>
  );
}
