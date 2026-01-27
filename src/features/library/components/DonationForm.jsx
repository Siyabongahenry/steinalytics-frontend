import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadPicture } from "../services/libraryService";
import toast, { Toaster } from "react-hot-toast";
import { CpuChipIcon } from "@heroicons/react/24/outline";
import { useAuth } from "react-oidc-context";

export default function DonationForm({ onDonate }) {
  const auth = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [picture, setPicture] = useState(null);

  // 🔥 Progress state
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setPicture(acceptedFiles[0]);
      toast.success(`Uploaded: ${acceptedFiles[0].name}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onDonate(
      { title, author, language, category, isbn, picture },
      auth.user?.access_token
    );

    toast.success("Book donated successfully!");
    setTitle("");
    setAuthor("");
    setLanguage("");
    setCategory("");
    setIsbn("");
    setPicture(null);
  };

  const handleIdentifyBook = async () => {
    if (!picture) return toast.error("Please upload a picture first!");

    setUploadProgress(0);
    setIsUploading(true);

    try {
      const response = await uploadPicture(
        picture,
        auth.user?.access_token,
        setUploadProgress
      );

      toast.success("🤖 Book details identified!");
      console.log("Backend response:", response.data);

      // Optional autofill
      // setTitle(response.data.title || "");
      // setAuthor(response.data.author || "");
      // setIsbn(response.data.isbn || "");
    } catch (err) {
      console.error(err);
      toast.error("Error identifying book");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-100">Donate a Book</h2>

        {/* Drag & Drop */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${
            isDragActive ? "border-blue-400 bg-gray-700" : "border-gray-500"
          }`}
        >
          <input {...getInputProps()} />
          {picture ? (
            <p className="text-green-400">Uploaded: {picture.name}</p>
          ) : (
            <p className="text-gray-300">
              Drag & drop a picture here, or click to select
            </p>
          )}
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <>
            <div className="w-full bg-gray-700 rounded h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-3 transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-300 text-center">
              Uploading… {uploadProgress}%
            </p>
          </>
        )}

        {/* AI Identify Button */}
        <button
          type="button"
          onClick={handleIdentifyBook}
          disabled={isUploading}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded transition-colors
            ${
              isUploading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
        >
          <CpuChipIcon className="w-5 h-5" />
          {isUploading ? "Uploading…" : "AI Identify Book"}
        </button>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2"
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2"
          required
        />

        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2"
          required
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2"
          required
        >
          <option value="">Select Language</option>
          <option value="Zulu">Zulu</option>
          <option value="Xhosa">Xhosa</option>
          <option value="Afrikaans">Afrikaans</option>
          <option value="Sesotho">Sesotho</option>
          <option value="Tswana">Tswana</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-gray-700 text-gray-100 rounded px-3 py-2"
          required
        >
          <option value="">Select Category</option>
          <option value="fiction">Fiction</option>
          <option value="nonfiction">Non-fiction</option>
          <option value="fantasy">Fantasy</option>
          <option value="history">History</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded"
        >
          Contribute Book
        </button>
      </form>

      <Toaster position="top-right" />
    </>
  );
}
