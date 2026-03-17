import { useState } from 'react'
import './App.css'

// ── Types ──────────────────────────────────────────────
interface Todo {
  id: number
  text: string
  completed: boolean
}

// ── Sub-component: TodoItem ────────────────────────────
function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}) {
  return (
    <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  )
}

// ── Main App Component ─────────────────────────────────
function App() {
  // State: counter
  const [count, setCount] = useState<number>(0)

  // State: todo list
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Set up CI/CD', completed: false },
  ])
  const [input, setInput] = useState<string>('')

  // Handler: add todo
  const addTodo = () => {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input, completed: false }])
    setInput('')
  }

  // Handler: toggle done
  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  // Handler: delete
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <h1>My React App</h1>

      {/* Counter Section */}
      <section>
        <h2>Counter: {count}</h2>
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
        <button onClick={() => setCount(c => c - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </section>

      <hr />

      {/* Todo Section */}
      <section>
        <h2>Todo List</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            placeholder='Add a task...'
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
        <p>Remaining: {todos.filter(t => !t.completed).length}</p>
      </section>
    </div>
  )
}

export default App

