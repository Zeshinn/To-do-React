export default function SortDropdown({ value, onChange, label }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
      <label className="text-sm font-medium">{label}:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 rounded-lg border shadow-sm w-full md:w-auto"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
