# URL Shortener

## Objective
Build a beginner-friendly web app that converts long URLs into short links and redirects users to the original destination.

## Core Requirements
- Add form input for long URLs.
- Validate URL format before saving.
- Generate unique short codes (6-8 characters).
- Store code-to-URL mapping in database or JSON store.
- Redirect from short URL to original URL.
- Show error for invalid or expired links.

## Suggested Architecture
- UI layer: submit and display generated short URL.
- API layer: validate URL, generate code, save mapping.
- Storage layer: persist short code records.

## Data Model
- `id`
- `original_url`
- `short_code`
- `created_at`
- `expires_at` (optional)
- `click_count` (optional)

## API Endpoints
- `POST /api/shorten`
- `GET /:shortCode`
- `GET /api/links/:shortCode` (optional analytics)

## Implementation Guide
1. Validate URL input using `URL` parser.
2. Generate short code and check collision.
3. Save mapping and created timestamp.
4. Build redirect route by `shortCode`.
5. Add basic click tracking and expiry handling.

## Code Snippets
```ts
function createShortCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}
```

```ts
export async function GET(_: Request, { params }: { params: { code: string } }) {
  const link = await findByCode(params.code);
  if (!link) return new Response("Not found", { status: 404 });
  return Response.redirect(link.originalUrl, 302);
}
```

## Implementation Steps
- Build input UI and submit action.
- Add API route for shortening.
- Implement random code generation with collision checks.
- Save mapping in storage.
- Implement redirect handler.
- Add basic analytics (click count).

## Deliverables
- Working URL shortener web app.
- README with setup instructions.
- Sample test links and expected behavior.

## Difficulty
Level: Easy  
Time: 3-5 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// URL Shortener - React starter snippet
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
      <h1>URL Shortener</h1>
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
# URL Shortener - Django model + API view snippet
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
// URL Shortener - Spring Boot entity + REST endpoint snippet
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

