# Movie Discovery App

## Objective
Build a movie browsing app that lets users search titles, view details, and maintain a watchlist.

## Core Requirements
- Search movies by title.
- Show trending/popular list.
- Movie details page (overview, rating, release date).
- Add/remove from watchlist.
- Handle loading/error/empty states.

## Suggested Architecture
- Pages for list and detail views.
- API service module for TMDB/OMDb calls.
- Local persistence for watchlist.

## API Design
- `GET /api/movies?q=<query>`
- `GET /api/movies/:id`

## Implementation Guide
1. Build search and listing UI.
2. Integrate movie API service.
3. Create details page and routing.
4. Add watchlist state + persistence.
5. Add responsive styling and skeleton loaders.

## Code Snippets
```ts
export async function searchMovies(query: string) {
  const res = await fetch(`/api/movies?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}
```

```ts
const isInWatchlist = (id: string) =>
  watchlist.some((movie) => movie.id === id);
```

## Deliverables
- Functional movie discovery app.
- README with API key/env configuration.

## Difficulty
Level: Intermediate  
Time: 5-8 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Movie Discovery App - React starter snippet
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
      <h1>Movie Discovery App</h1>
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
# Movie Discovery App - Django model + API view snippet
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
// Movie Discovery App - Spring Boot entity + REST endpoint snippet
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

