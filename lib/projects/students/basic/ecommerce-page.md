# E-commerce Product Page

## Objective
Create a responsive product page with a complete mini cart flow and conversion-focused UI behavior.

## Core Requirements
- Render product details from dynamic data.
- Add to cart with quantity updates.
- Build responsive product image gallery.
- Show pricing, discount, and availability.
- Include rating and reviews section.
- Preserve cart state across refresh.

## Suggested Architecture
- Product view components for hero, gallery, and details.
- Cart state layer using Context API or Redux.
- Storage adapter for local persistence.

## Data Model
- `product`: id, name, price, stock, images, description.
- `review`: user, rating, comment, date.
- `cart_item`: product_id, quantity, unit_price.

## Implementation Guide
1. Build product page layout with dynamic route.
2. Add gallery interactions and selected image state.
3. Implement cart actions with quantity controls.
4. Persist cart to local storage.
5. Render reviews and average rating.

## Code Snippets
```ts
function addToCart(productId: string, quantity: number) {
  setCart((prev) => {
    const existing = prev.find((item) => item.productId === productId);
    if (existing) {
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
      );
    }
    return [...prev, { productId, quantity }];
  });
}
```

```ts
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
```

## Implementation Steps
- Build product detail layout.
- Add image gallery interactions.
- Implement cart state actions (add/remove/update).
- Add local storage persistence.
- Implement review rendering and rating breakdown.
- Optimize mobile behavior and CTA visibility.

## Deliverables
- Responsive e-commerce product page.
- Working add-to-cart flow.
- README with architecture and assumptions.

## Difficulty
Level: Intermediate  
Time: 6-10 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// E-commerce Page - React starter snippet
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
      <h1>E-commerce Page</h1>
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
# E-commerce Page - Django model + API view snippet
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
// E-commerce Page - Spring Boot entity + REST endpoint snippet
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

