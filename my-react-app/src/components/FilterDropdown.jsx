export default function FilterDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 rounded-lg border shadow-sm w-full md:w-auto"
    >
      <option value="">All Users</option>
      {[...Array(10)].map((_, idx) => (
        <option key={idx} value={idx + 1}>
          User {idx + 1}
        </option>
      ))}
    </select>
  );
}
