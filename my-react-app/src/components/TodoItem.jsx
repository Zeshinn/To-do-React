export default function TodoItem({ todo, onAction, actionLabel, showDate }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm">
      <div>
        <p className="font-medium">{todo.title}</p>
        {showDate && (
          <p className="text-sm text-gray-500">
            Completed on: {new Date(todo.completedAt).toLocaleString()}
          </p>
        )}
      </div>
      <button
        onClick={() => onAction(todo)}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm transition"
      >
        {actionLabel}
      </button>
    </div>
  );
}
