export default function FilterPanel({ onFilterChange }) {
  const handleChange = (e) => {
    onFilterChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Filters</h2>
      <select
          name="language"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
          onChange={handleChange}
        >
        <option value="">All Languages</option>
        <option value="Zulu">isiZulu</option>
        <option value="Xhosa">isiXhosa</option>
        <option value="Afrikaans">Afrikaans</option>
        <option value="English">English</option>
        <option value="Sepedi">Sepedi</option>
        <option value="Tswana">Setswana</option>
        <option value="Sesotho">Sesotho</option>
        <option value="Tsonga">Xitsonga</option>
        <option value="Swati">siSwati</option>
        <option value="Venda">Tshivenda</option>
        <option value="Ndebele">isiNdebele</option>
      </select>


      <select
        name="category"
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
        onChange={handleChange}
      >
        <option value="">All Categories</option>
        <option value="fiction">Fiction</option>
        <option value="nonfiction">Non-fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="history">History</option>
      </select>
    </div>
  );
}
