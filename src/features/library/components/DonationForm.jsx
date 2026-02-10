import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { donateBook, identifyBook } from "../services/libraryService";
import toast, { Toaster } from "react-hot-toast";
import { CpuChipIcon } from "@heroicons/react/24/outline";
import { useAuth } from "react-oidc-context";
import Spinner from "../../../components/Spinner"; // <-- import your custom spinner

export default function DonationForm() {
  const auth = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIdentifying, setIsIdentifying] = useState(false);

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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIdentifyBook = async () => {
    if (!file) return toast.error("Please upload a file first!");
    setIsIdentifying(true);
    try {
      const response = await identifyBook({title,author}, auth.user?.access_token);
      toast.success("🤖 Book details identified!");
      console.log("Backend response:", response);
    } catch (err) {
      console.error(err);
      toast.error("Error identifying book");
    } finally {
      setIsIdentifying(false);
    }
  };

  const disableForm = isSubmitting || isIdentifying;

  return (
    <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full">
      <h1 className="text-3xl font-bold text-center text-gray-100 mb-10">
        📖 Donate a Book
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Left column: Upload + AI + Preview */}
        <div className="space-y-6 flex flex-col justify-start items-center">
          {/* Drag & Drop Zone */}
          <div
            {...getRootProps()}
            className={`w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-400 bg-gray-700" : "border-gray-600"
            }`}
          >
            <input {...getInputProps()} disabled={disableForm} />
            {file ? (
              <p className="text-green-400 font-medium">Uploaded: {file.name}</p>
            ) : (
              <p className="text-gray-400">
                Drag & drop a cover image, or click to select
              </p>
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
            disabled={isIdentifying || isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg text-base font-semibold transition-colors disabled:opacity-50"
          >
            {isIdentifying ? (
              <>
                <Spinner showLogo={false} size={30} />
                <span className="ml-2 animate-pulse">AI is thinking...</span>
              </>
            ) : (
              <>
                <CpuChipIcon className="w-5 h-5" />
                AI Identify Book
              </>
            )}
          </button>
        </div>

        {/* Right column: Input fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Book Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={disableForm}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={disableForm}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              ISBN
            </label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              disabled={disableForm}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={disableForm}
              className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              required
            >
              <option value="">Select Language</option>
              <option value="Afrikaans">Afrikaans</option>
              <option value="English">English</option>
              <option value="isiNdebele">isiNdebele</option>
              <option value="isiXhosa">isiXhosa</option>
              <option value="isiZulu">isiZulu</option>
              <option value="Sesotho">Sesotho</option>
              <option value="Setswana">Setswana</option>
              <option value="Siswati">Siswati</option>
              <option value="Tshivenda">Tshivenda</option>
              <option value="Xitsonga">Xitsonga</option>
              <option value="Sepedi">Sepedi</option>
            </select>
          </div>

         <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={disableForm}
                className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                required
              >
                <option value="">Select Category</option>

                {/* Fiction */}
                <optgroup label="Fiction">
                  <option value="fantasy">Fantasy</option>
                  <option value="science-fiction">Science Fiction</option>
                  <option value="dystopian">Dystopian</option>
                  <option value="adventure">Adventure</option>
                  <option value="romance">Romance</option>
                  <option value="contemporary">Contemporary</option>
                  <option value="mystery">Mystery</option>
                  <option value="thriller">Thriller</option>
                  <option value="horror">Horror</option>
                  <option value="historical-fiction">Historical Fiction</option>
                  <option value="magical-realism">Magical Realism</option>
                  <option value="graphic-novel">Graphic Novel</option>
                  <option value="young-adult">Young Adult</option>
                  <option value="children">Children’s Fiction</option>
                </optgroup>

                {/* Non-fiction */}
                <optgroup label="Non-fiction">
                  <option value="biography">Biography</option>
                  <option value="autobiography">Autobiography</option>
                  <option value="memoir">Memoir</option>
                  <option value="self-help">Self-Help</option>
                  <option value="true-crime">True Crime</option>
                  <option value="history">History</option>
                  <option value="travel">Travel</option>
                  <option value="science">Science & Technology</option>
                  <option value="philosophy">Philosophy</option>
                  <option value="religion">Religion & Spirituality</option>
                  <option value="politics">Politics</option>
                  <option value="essays">Essays</option>
                  <option value="journalism">Journalism</option>
                  <option value="health">Health & Wellness</option>
                </optgroup>
              </select>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isIdentifying}
            className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg text-base font-semibold transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Spinner showLogo={false} size={30} />
                <span className="ml-2">Submitting...</span>
              </>
            ) : (
              "Contribute Book"
            )}
          </button>
        </div>
      </form>
      <Toaster position="top-right" />
    </div>
  );
}
