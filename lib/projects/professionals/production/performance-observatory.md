# Frontend Performance Observatory

## Objective
Build a frontend analytics dashboard that tracks Core Web Vitals and interaction performance across releases.

## Core Requirements
- Collect real user metrics (LCP, CLS, INP, TTFB).
- Compare performance by route and release version.
- Alert when thresholds degrade.
- Visual dashboard with trends.

## Suggested Architecture
- Client metric collector.
- Ingestion API and storage.
- Dashboard UI for analysis.

## Implementation Guide
1. Add web-vitals collection in client app.
2. Push metrics to ingestion API.
3. Store and aggregate metrics.
4. Build route-level performance dashboard.
5. Add release comparison and alert rules.

## Code Snippets
```ts
import { onCLS, onINP, onLCP } from "web-vitals";

const report = (metric: { name: string; value: number }) =>
  fetch("/api/metrics", {
    method: "POST",
    body: JSON.stringify(metric),
    headers: { "Content-Type": "application/json" },
  });

onCLS(report);
onINP(report);
onLCP(report);
```

```sql
CREATE INDEX idx_perf_route_release
ON performance_metrics(route, release_version);
```

## Deliverables
- Real-user performance tracking system.
- Dashboard with actionable insights.

## Difficulty
Level: Expert  
Time: 18-30 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Frontend Performance Observatory - React starter snippet
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
      <h1>Frontend Performance Observatory</h1>
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
# Frontend Performance Observatory - Django model + API view snippet
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
// Frontend Performance Observatory - Spring Boot entity + REST endpoint snippet
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

