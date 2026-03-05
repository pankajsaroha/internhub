# Event-Driven Order Processing

## Objective
Design a backend workflow where order events drive inventory, payment, shipping, and notification services asynchronously.

## Core Requirements
- Order create/confirm/cancel events.
- Message broker integration (Kafka/RabbitMQ/SQS).
- Idempotent consumers and retry strategy.
- Dead-letter queue handling.
- End-to-end order status tracking.

## Suggested Architecture
- API service for order intake.
- Event bus for domain events.
- Independent consumers: inventory, payment, shipping, notification.

## Implementation Guide
1. Define event schema and versioning policy.
2. Publish events from order service.
3. Implement consumer idempotency.
4. Add retries with backoff + DLQ.
5. Add saga/compensation flows.

## Code Snippets
```ts
interface OrderCreatedEvent {
  eventId: string;
  eventType: "order.created";
  orderId: string;
  userId: string;
  items: Array<{ sku: string; qty: number }>;
  createdAt: string;
}
```

```ts
if (await hasProcessed(event.eventId)) return;
await reserveInventory(event.orderId, event.items);
await markProcessed(event.eventId);
```

## Deliverables
- Event-driven order processing backend.
- Diagrams for event flow and failure handling.

## Difficulty
Level: Expert  
Time: 20-32 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Event-Driven Order Processing - React starter snippet
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
      <h1>Event-Driven Order Processing</h1>
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
# Event-Driven Order Processing - Django model + API view snippet
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
// Event-Driven Order Processing - Spring Boot entity + REST endpoint snippet
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

