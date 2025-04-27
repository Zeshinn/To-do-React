import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import FilterDropdown from "./FilterDropdown";
import SortDropdown from "./SortDropdown";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [completedSortOrder, setCompletedSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleComplete = (todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
    setCompletedTodos([
      ...completedTodos,
      { ...todo, completedAt: new Date().toISOString() },
    ]);
  };

  const handleUncomplete = (todo) => {
    setCompletedTodos(completedTodos.filter((t) => t.id !== todo.id));
    setTodos([...todos, { ...todo, completed: false }]);
  };

  const filteredTodos = todos
    .filter((todo) =>
      filterUser ? todo.userId === Number(filterUser) : true
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  const filteredCompletedTodos = completedTodos
    .filter((todo) =>
      filterUser ? todo.userId === Number(filterUser) : true
    )
    .sort((a, b) => {
      if (completedSortOrder === "asc") {
        return new Date(a.completedAt) - new Date(b.completedAt);
      } else {
        return new Date(b.completedAt) - new Date(a.completedAt);
      }
    });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Todo App</h1>

        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-6">
          <FilterDropdown value={filterUser} onChange={setFilterUser} />
          <SortDropdown
            value={sortOrder}
            onChange={setSortOrder}
            label="Sort Uncompleted"
          />
          <SortDropdown
            value={completedSortOrder}
            onChange={setCompletedSortOrder}
            label="Sort Completed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Uncompleted Todos</h2>
            <TodoList
              todos={filteredTodos}
              onAction={handleComplete}
              actionLabel="Complete"
            />
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Completed Todos</h2>
            <TodoList
              todos={filteredCompletedTodos}
              onAction={handleUncomplete}
              actionLabel="Uncomplete"
              showDate
            />
          </div>
        </div>
      </main>

      <footer className="sticky top-[100vh] text-center p-4 bg-white shadow-inner text-gray-600 text-sm">
        © Денис Иванов, ТУ-София
      </footer>
    </div>
  );
}
