export default function FilterPanel({ onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Filters</h2>

      {/* Language Filter */}
      <select
        name="language"
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
        onChange={handleChange}
      >
        <option value="">All Languages</option>
        <option value="Afrikaans">Afrikaans</option>
        <option value="English">English</option>
        <option value="isiNdebele">isiNdebele</option>
        <option value="isiXhosa">isiXhosa</option>
        <option value="isiZulu">isiZulu</option>
        <option value="Sesotho">Sesotho</option>
        <option value="Setswana">Setswana</option>
        <option value="Siswati">siSwati</option>
        <option value="Tshivenda">Tshivenda</option>
        <option value="Xitsonga">Xitsonga</option>
        <option value="Sepedi">Sepedi</option>
      </select>

      {/* Category Filter */}
      <select
        name="category"
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
        onChange={handleChange}
      >
        <option value="">All Categories</option>
        <optgroup label="Fiction">
          <option value="fantasy">Fantasy</option>
          <option value="science-fiction">Science Fiction</option>
          <option value="mystery">Mystery</option>
          <option value="romance">Romance</option>
          <option value="thriller">Thriller</option>
          <option value="historical-fiction">Historical Fiction</option>
          <option value="children">Children’s Fiction</option>
          <option value="young-adult">Young Adult</option>
        </optgroup>
        <optgroup label="Non-fiction">
          <option value="biography">Biography</option>
          <option value="autobiography">Autobiography</option>
          <option value="memoir">Memoir</option>
          <option value="self-help">Self-Help</option>
          <option value="true-crime">True Crime</option>
          <option value="history">History</option>
          <option value="science">Science & Technology</option>
          <option value="philosophy">Philosophy</option>
          <option value="religion">Religion & Spirituality</option>
          <option value="politics">Politics</option>
        </optgroup>
      </select>
    </div>
  );
}
