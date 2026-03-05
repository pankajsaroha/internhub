# SaaS Dashboard Template

## Objective
Build a feature-rich admin dashboard for a SaaS product with analytics, user management, and settings modules.

## Core Requirements
- Dashboard overview with KPI cards.
- Charts for usage, revenue, and growth trends.
- User management table with search, filter, and sort.
- Role and status indicators.
- Sidebar navigation and responsive layout.
- Theme toggle (light/dark).

## Suggested Architecture
- Layout shell component for nav/header/content.
- Module-level components (analytics, users, settings).
- Shared chart and table primitives.
- API mock/service layer for dashboard data.

## Data Model
- `metrics`: active_users, mrr, churn, conversion.
- `users`: id, name, email, role, status, created_at.
- `events`: timestamp, type, value.

## Implementation Guide
1. Build dashboard shell and navigation layout.
2. Add KPI cards with mocked or live data.
3. Add charts for trends and performance.
4. Build user table with search/filter/sort.
5. Add theme switcher and persist preference.

## Code Snippets
```ts
const filteredUsers = users.filter((u) =>
  u.name.toLowerCase().includes(search.toLowerCase()) ||
  u.email.toLowerCase().includes(search.toLowerCase())
);
```

```tsx
<ResponsiveContainer width="100%" height={280}>
  <LineChart data={metricsByDay}>
    <Line type="monotone" dataKey="activeUsers" stroke="#2563eb" />
  </LineChart>
</ResponsiveContainer>
```

## Implementation Steps
- Build app shell and routing structure.
- Add KPI cards and chart components.
- Implement user table actions and filters.
- Add settings panel and profile controls.
- Implement theme provider and persistence.
- Ensure mobile usability and accessibility.

## Deliverables
- Functional SaaS dashboard.
- Reusable chart/table components.
- README with architecture and setup.

## Difficulty
Level: Advanced  
Time: 12-18 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// SaaS Dashboard - React starter snippet
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
      <h1>SaaS Dashboard</h1>
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
# SaaS Dashboard - Django model + API view snippet
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
// SaaS Dashboard - Spring Boot entity + REST endpoint snippet
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

