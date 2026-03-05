# Social Media Feed (Clone)

## Objective
Build a social feed app where users can create posts, engage with content, and view profile-based timelines.

## Core Requirements
- User authentication and profile setup.
- Create posts with text and image upload.
- Display chronological or ranked feed.
- Like and comment on posts.
- User profile page with authored posts.
- Basic moderation (delete own post/comment).

## Suggested Architecture
- Auth layer for user sessions.
- Feed service for post and interaction logic.
- Media service for image uploads.
- Realtime updates using subscriptions (optional).

## Data Model
- `users`: id, name, avatar_url.
- `posts`: id, user_id, content, image_url, created_at.
- `likes`: id, user_id, post_id.
- `comments`: id, user_id, post_id, content, created_at.

## Implementation Guide
1. Implement auth and profile setup flow.
2. Build create-post UI + media upload.
3. Render feed with pagination.
4. Add like/comment mutations with optimistic updates.
5. Add profile timeline and moderation actions.

## Code Snippets
```ts
const { data: posts } = await supabase
  .from("posts")
  .select("id, content, image_url, created_at, users(name, avatar_url)")
  .order("created_at", { ascending: false })
  .limit(20);
```

```ts
await supabase.from("likes").upsert({
  user_id: userId,
  post_id: postId,
});
```

## Implementation Steps
- Set up auth and protected routes.
- Build create-post workflow.
- Render feed with pagination or lazy loading.
- Add like and comment actions.
- Add profile page and post filtering.
- Improve UX with loading and empty states.

## Deliverables
- Working social feed app with auth.
- Database schema and seed script.
- README with deployment notes.

## Difficulty
Level: Advanced  
Time: 14-20 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Social Media Feed - React starter snippet
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
      <h1>Social Media Feed</h1>
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
# Social Media Feed - Django model + API view snippet
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
// Social Media Feed - Spring Boot entity + REST endpoint snippet
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

