# Design System & Component Library

## Objective
Build an enterprise-grade design system with reusable components, tokens, theming, and documentation.

## Core Requirements
- Design token architecture (colors, spacing, typography, radius).
- Component library (Button, Input, Select, Modal, Table, Toast).
- Theme support (light/dark/brand variants).
- Accessibility-first implementation (WCAG focus).
- Storybook docs with usage and props.
- Versioning and release process.

## Suggested Architecture
- Tokens package shared across apps.
- UI components package with strict typings.
- Docs package for Storybook and guidelines.
- Build pipeline for publishing artifacts.

## Quality Standards
- Keyboard navigation across interactive components.
- ARIA semantics where required.
- Visual regression checks.
- Unit tests for component behavior.

## Implementation Guide
1. Define tokens and naming conventions.
2. Build base primitives (Button/Input/Text).
3. Build composite components (Modal/Table/Dropdown).
4. Add theme providers and token overrides.
5. Publish docs in Storybook with usage guidance.

## Code Snippets
```ts
export const tokens = {
  color: { primary: "#0f172a", accent: "#2563eb" },
  radius: { sm: "6px", md: "10px" },
  spacing: { xs: "4px", sm: "8px", md: "16px" },
} as const;
```

```tsx
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="btn btn-primary" {...props} />;
}
```

## Implementation Steps
- Define token system and naming conventions.
- Build foundational primitives.
- Compose higher-level components.
- Add theming support with token overrides.
- Document all components in Storybook.
- Set up CI checks and package publishing.

## Deliverables
- Versioned design system package.
- Storybook documentation site.
- Contribution guide and changelog process.

## Difficulty
Level: Expert  
Time: 24-40 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Design System Library - React starter snippet
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
      <h1>Design System Library</h1>
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
# Design System Library - Django model + API view snippet
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
// Design System Library - Spring Boot entity + REST endpoint snippet
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

