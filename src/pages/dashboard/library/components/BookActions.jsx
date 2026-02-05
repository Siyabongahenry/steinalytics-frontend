export default function BookActions({
  book,
  onBorrow,
  onReturn,
  onDelete,
}) {
  return (
    <div className="flex justify-end gap-3 whitespace-nowrap">
      <a
        href={book.file_url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:underline"
      >
        Download
      </a>

      {book.status === "available" ? (
        <button
          onClick={() => onBorrow(book.id)}
          className="text-green-600 hover:underline"
        >
          Borrow
        </button>
      ) : (
        <button
          onClick={() => onReturn(book.id)}
          className="text-yellow-600 hover:underline"
        >
          Return
        </button>
      )}

      <button
        onClick={() => onDelete(book.id)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </div>
  );
}
