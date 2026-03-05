# Multi-region E-commerce Platform

## Objective
Build a production-ready commerce platform supporting multiple regions, localized pricing, and resilient order processing.

## Core Requirements
- Region-aware catalog, currency, and taxes.
- Inventory sync across warehouses.
- Checkout with payment gateway integration.
- Order lifecycle and notifications.
- Monitoring, retry policies, and audit logs.

## Suggested Architecture
- API gateway + domain services (catalog, cart, checkout, orders).
- Event-driven processing for order workflows.
- Region-specific CDN and caching strategy.

## Data Model
- `products`, `prices`, `regions`, `orders`, `order_items`, `payments`, `inventory`

## Implementation Guide
1. Model region and pricing strategy.
2. Build cart and checkout APIs.
3. Integrate payment webhooks.
4. Add inventory reservation and rollback.
5. Add observability (metrics/traces/logs).
6. Add CI/CD and disaster recovery checks.

## Code Snippets
```ts
function getRegionalPrice(
  basePrice: number,
  exchangeRate: number,
  taxRate: number
) {
  const converted = basePrice * exchangeRate;
  return Number((converted + converted * taxRate).toFixed(2));
}
```

```ts
await publish("order.created", {
  orderId,
  tenantId,
  region,
  createdAt: new Date().toISOString(),
});
```

## Deliverables
- Multi-region commerce application.
- Infra notes for scaling and failover.

## Difficulty
Level: Production  
Time: 55-85 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Multi-region E-commerce Platform - React starter snippet
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
      <h1>Multi-region E-commerce Platform</h1>
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
# Multi-region E-commerce Platform - Django model + API view snippet
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
// Multi-region E-commerce Platform - Spring Boot entity + REST endpoint snippet
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

