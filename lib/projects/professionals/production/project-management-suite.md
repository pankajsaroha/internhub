# Team Project Management Suite

## Objective
Build a fullstack application for team project planning with boards, tasks, comments, and sprint tracking.

## Core Requirements
- Workspace/project creation.
- Kanban board with task lifecycle.
- Comments, mentions, and activity logs.
- Sprint planning and burndown overview.
- Role-based permissions (admin/member/viewer).

## Suggested Architecture
- Next.js frontend + API routes/backend.
- Relational database for projects/tasks.
- Realtime layer for board updates.

## Data Model
- `workspaces`, `projects`, `sprints`, `tasks`, `comments`, `activity_logs`

## Implementation Guide
1. Implement workspace and user roles.
2. Build board and task CRUD.
3. Add drag-drop task movement.
4. Add comment/mention notifications.
5. Add sprint metrics and reports.

## Code Snippets
```ts
type TaskStatus = "BACKLOG" | "TODO" | "IN_PROGRESS" | "DONE";

function moveTask(taskId: string, to: TaskStatus) {
  return fetch(`/api/tasks/${taskId}/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to }),
  });
}
```

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL,
  title TEXT NOT NULL,
  status VARCHAR(20) NOT NULL,
  assignee_id UUID NULL,
  due_date DATE NULL
);
```

## Deliverables
- Working project management suite.
- API docs + schema migration files.

## Difficulty
Level: Expert  
Time: 26-42 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Team Project Management Suite - React starter snippet
import { useEffect, useState } from "react";

type ProjectItem = {
  id: string;
  title: string;
  status?: string;
};

export default function ProjectPage() {
  const [items, setItems] = useState<ProjectItem[]>([]);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []));
  }, []);

  return (
    <main>
      <h1>Team Project Management Suite</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </main>
  );
}
```

### Django (Backend)

```python
# Team Project Management Suite - Django model + API view snippet
from django.db import models
from django.http import JsonResponse
from django.views.decorators.http import require_GET

class ProjectItem(models.Model):
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=40, default="ACTIVE")
    created_at = models.DateTimeField(auto_now_add=True)

@require_GET
def list_items(request):
    items = list(ProjectItem.objects.values("id", "title", "status"))
    return JsonResponse({"items": items})
```

### Spring Boot (Backend)

```java
// Team Project Management Suite - Spring Boot entity + REST endpoint snippet
@Entity
public class ProjectItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String status = "ACTIVE";
}

@RestController
@RequestMapping("/api/items")
public class ProjectItemController {

    @Autowired
    private ProjectItemRepository repo;

    @GetMapping
    public List<ProjectItem> getAll() {
        return repo.findAll();
    }
}
```

