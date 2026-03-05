# Micro-frontend Platform Shell

## Objective
Build a shell application that composes multiple frontend modules owned by different teams.

## Core Requirements
- Shell routing and navigation.
- Load remote micro-frontends dynamically.
- Shared auth/session context.
- Independent deployment for each micro-frontend.
- Runtime error isolation and fallback UI.

## Suggested Architecture
- Host shell app for layout and route orchestration.
- Remote apps exposed through module federation.
- Shared design system and auth SDK package.

## Implementation Guide
1. Build shell with route registry.
2. Configure remote module loading.
3. Implement shared auth/session layer.
4. Add error boundaries per micro-app.
5. Add telemetry for module load failures.

## Code Snippets
```ts
const RemoteOrdersApp = dynamic(
  () => import("orders_app/App"),
  { ssr: false, loading: () => <p>Loading module...</p> }
);
```

```tsx
<ErrorBoundary fallback={<ModuleFallback name="Orders" />}>
  <RemoteOrdersApp />
</ErrorBoundary>
```

## Deliverables
- Functional micro-frontend shell.
- Docs for onboarding new remote teams.

## Difficulty
Level: Expert  
Time: 22-36 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Micro-frontend Platform Shell - React starter snippet
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
      <h1>Micro-frontend Platform Shell</h1>
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
# Micro-frontend Platform Shell - Django model + API view snippet
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
// Micro-frontend Platform Shell - Spring Boot entity + REST endpoint snippet
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

