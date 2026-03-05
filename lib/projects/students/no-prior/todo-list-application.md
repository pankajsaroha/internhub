# Todo List Application

## Objective
Build a complete Todo application that helps users capture, prioritize, and complete daily tasks with a clean workflow.

## Problem Statement
Most beginners create only static UIs. This project teaches real product behavior: state updates, form validation, data persistence, filtering, and user feedback loops.

## Core Requirements
- Add todo with title, optional description, and due date.
- Edit existing todo details.
- Mark todos as complete/incomplete.
- Delete single todo and clear completed todos.
- Filter by `All`, `Active`, and `Completed`.
- Persist todos so they survive page refresh.

## Detailed Project Explanation
This project simulates the core of productivity tools used in real companies.  
You will learn how state changes drive UI updates, how to keep UI and storage in sync, and how to structure small reusable components.  
A good implementation should feel fast, avoid duplicate tasks, and make completion flow intuitive.

## Suggested Architecture
- `TodoForm` component for create/update actions.
- `TodoList` component for rendering and list interactions.
- `TodoFilters` component for status-based filtering.
- Local store or API layer for persistence.

## Data Model
- `id`: unique task id
- `title`: short task title
- `description`: optional details
- `status`: `ACTIVE` or `COMPLETED`
- `due_date`: optional deadline
- `created_at`, `updated_at`

## Implementation Guide
1. Create form UI and validation.
2. Build todo list renderer with action buttons.
3. Implement add/edit/delete/toggle handlers.
4. Add filters and counts (`items left`).
5. Persist state to local storage or DB.
6. Add empty state and error handling.

## Code Snippets
```ts
type TodoStatus = "ACTIVE" | "COMPLETED";

interface TodoItem {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  dueDate?: string;
}
```

```ts
function applyFilter(items: TodoItem[], filter: "ALL" | "ACTIVE" | "COMPLETED") {
  if (filter === "ALL") return items;
  return items.filter((item) => item.status === filter);
}
```

## Deliverables
- Functional Todo app with CRUD and filters.
- Clean component structure and readable code.
- README with features and setup.

## Difficulty
Level: Easy  
Time: 4-7 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
import { useState } from "react";

export default function TodoPage() {
  const [todos, setTodos] = useState<{ id: string; title: string }[]>([]);
  const [title, setTitle] = useState("");

  const addTodo = () => {
    if (!title.trim()) return;
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), title: title.trim() }]);
    setTitle("");
  };

  return (
    <main>
      <h1>Todo List</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>{todos.map((t) => <li key={t.id}>{t.title}</li>)}</ul>
    </main>
  );
}
```

### Django (Backend)

```python
from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, default="ACTIVE")
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

### Spring Boot (Backend)

```java
@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String status = "ACTIVE";
}
```
