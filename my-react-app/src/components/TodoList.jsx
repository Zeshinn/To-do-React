import TodoItem from "./TodoItem";

export default function TodoList({ todos, onAction, actionLabel, showDate }) {
  return (
    <div className="flex flex-col gap-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onAction={onAction}
          actionLabel={actionLabel}
          showDate={showDate}
        />
      ))}
    </div>
  );
}
