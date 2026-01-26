export default function Header({ toCount, ccCount, recipients }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2">
        <i className="fas fa-envelope-open-text"></i>
        Email Organizer
      </h2>
      <p className="text-gray-400">
        Create, manage, and organize recipient groups for bulk emails
      </p>
      {recipients.length > 0 && (
        <p className="text-gray-500 text-sm mt-1">
          TO: <span className="font-semibold">{toCount}</span> · CC:{" "}
          <span className="font-semibold">{ccCount}</span>
        </p>
      )}
    </div>
  );
}
