import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { uploadPicture } from "../services/libraryService";
import toast, { Toaster } from "react-hot-toast";
import { CpuChipIcon } from "@heroicons/react/24/outline";
import { useAuth } from "react-oidc-context";

// --------------------
// Helpers
// --------------------
const SMALL_WORDS = new Set([
  "and", "or", "the", "of", "in", "on", "at", "for", "to", "with",
]);

const smartTitleCase = (str = "") =>
  str
    .toLowerCase()
    .split(" ")
    .map((word, i) =>
      i !== 0 && SMALL_WORDS.has(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

const formatAuthors = (authors = []) =>
  authors.map((a) => smartTitleCase(a)).join(", ");

// --------------------
// Component
// --------------------
export default function DonationForm({ onDonate }) {
  const auth = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null); // ✅ Image preview

  // AI/Upload States
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [aiFilled, setAiFilled] = useState({});
  const [backup, setBackup] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPicture(file);
      toast.success(`Uploaded: ${file.name}`);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    },
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // --------------------
  // Handlers
  // --------------------
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
    setPreview(null);
    setAiFilled({});
    setConfidence(null);
    setBackup(null);
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

      const data = response.data;
      setConfidence(data.confidence ?? 0);
      setBackup({ title, author, language, category, isbn });

      const filled = {};

      if (data.title) {
        setTitle(smartTitleCase(data.title));
        filled.title = true;
      }
      if (data.authors?.length) {
        setAuthor(formatAuthors(data.authors));
        filled.author = true;
      }
      if (data.language) {
        setLanguage(smartTitleCase(data.language));
        filled.language = true;
      }
      if (data.categories?.length) {
        setCategory(data.categories[0].toLowerCase());
        filled.category = true;
      }
      if (data.isbn) {
        setIsbn(data.isbn);
        filled.isbn = true;
      }

      setAiFilled(filled);

      toast.success(
        data.confidence >= 0.75
          ? "🤖 Book identified with high confidence"
          : "🤖 Book identified — please verify"
      );
    } catch (err) {
      console.error(err);
      toast.error("Error identifying book");
    } finally {
      setIsUploading(false);
    }
  };

  const undoAIFill = () => {
    if (backup) {
      setTitle(backup.title);
      setAuthor(backup.author);
      setLanguage(backup.language);
      setCategory(backup.category);
      setIsbn(backup.isbn);
      setAiFilled({});
      setBackup(null);
      toast("AI autofill undone");
    }
  };

  // --------------------
  // Render
  // --------------------
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-bold text-gray-100 mb-4">Donate a Book</h2>

        {/* Large screen layout: image left, form right */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Preview */}
          {preview && (
            <div className="flex justify-center lg:justify-start lg:w-1/3">
              <img
                src={preview}
                alt="Book Preview"
                className="max-h-64 object-contain rounded border border-gray-600"
              />
            </div>
          )}

          {/* Form Fields */}
          <div className="flex-1 space-y-4">
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
              className={`w-full flex items-center justify-center gap-2 py-2 rounded transition-colors ${
                isUploading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              <CpuChipIcon className="w-5 h-5" />
              {isUploading ? "Uploading…" : "AI Identify Book"}
            </button>

            {/* Undo AI autofill */}
            {backup && (
              <button
                type="button"
                onClick={undoAIFill}
                className="text-sm text-gray-400 underline text-center w-full"
              >
                Undo AI autofill
              </button>
            )}

            {/* Confidence warning */}
            {confidence !== null && confidence < 0.7 && (
              <p className="text-xs text-yellow-400 text-center">
                ⚠ Low confidence — please verify details before submitting
              </p>
            )}

            {/* Inputs */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
              className={`w-full rounded px-3 py-2 bg-gray-700 text-gray-100 ${
                aiFilled.title ? "ring-2 ring-blue-500" : ""
              }`}
              required
            />

            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
              className={`w-full rounded px-3 py-2 bg-gray-700 text-gray-100 ${
                aiFilled.author ? "ring-2 ring-blue-500" : ""
              }`}
              required
            />

            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="ISBN"
              className={`w-full rounded px-3 py-2 bg-gray-700 text-gray-100 ${
                aiFilled.isbn ? "ring-2 ring-blue-500" : ""
              }`}
              required
            />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`w-full rounded px-3 py-2 bg-gray-700 text-gray-100 ${
                aiFilled.language ? "ring-2 ring-blue-500" : ""
              }`}
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
              className={`w-full rounded px-3 py-2 bg-gray-700 text-gray-100 ${
                aiFilled.category ? "ring-2 ring-blue-500" : ""
              }`}
              required
            >
              <option value="">Select Category</option>
              <option value="fiction">Fiction</option>
              <option value="nonfiction">Non-fiction</option>
              <option value="fantasy">Fantasy</option>
              <option value="history">History</option>
            </select>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded"
            >
              Contribute Book
            </button>
          </div>
        </div>
      </form>

      <Toaster position="top-right" />
    </>
  );
}
