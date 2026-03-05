# Learning Management Mini Platform

## Objective
Build a mini LMS where instructors publish lessons and students track course progress.

## Core Requirements
- Instructor creates courses and lessons.
- Student enrolls and views lesson content.
- Mark lessons completed and track progress.
- Course dashboard with progress percentage.
- Basic role-based access (`INSTRUCTOR` / `STUDENT`).

## Suggested Architecture
- Auth + role middleware.
- Course service for content and enrollment.
- Progress tracking service.

## Data Model
- `users`, `courses`, `lessons`, `enrollments`, `lesson_progress`

## Implementation Guide
1. Build auth and role guards.
2. Add course and lesson CRUD.
3. Add enrollment flow.
4. Track completion per lesson.
5. Show progress dashboard and filters.

## Code Snippets
```ts
const progressPct = (completed: number, total: number) =>
  total === 0 ? 0 : Math.round((completed / total) * 100);
```

```sql
CREATE TABLE lesson_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  lesson_id BIGINT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP NULL
);
```

## Deliverables
- LMS mini app with role-based flows.
- Database schema + API endpoints.

## Difficulty
Level: Advanced  
Time: 12-18 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Learning Management Mini Platform - React starter snippet
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
      <h1>Learning Management Mini Platform</h1>
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
# Learning Management Mini Platform - Django model + API view snippet
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
// Learning Management Mini Platform - Spring Boot entity + REST endpoint snippet
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

