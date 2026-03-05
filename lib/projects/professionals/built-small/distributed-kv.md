# Distributed Key-Value Store

## Objective
Design and implement a distributed key-value system with partitioning, replication, and failure tolerance.

## Core Requirements
- Consistent hashing-based partitioning.
- Replication factor configuration.
- GET/SET/DELETE API (HTTP or gRPC).
- Health checks and node heartbeat.
- Basic quorum or leader strategy.
- Recovery behavior when nodes rejoin.

## Suggested Architecture
- Coordinator/routing layer for request forwarding.
- Storage engine per node.
- Membership and gossip/heartbeat subsystem.
- Replication and sync module.

## Data Model
- `key`, `value`, `version`, `timestamp`, `ttl` (optional).

## Implementation Guide
1. Build single-node read/write API.
2. Add consistent hash ring routing.
3. Implement replication and read quorum.
4. Add heartbeats and failure detection.
5. Add rebalancing and recovery flows.

## Code Snippets
```go
type Record struct {
    Key       string
    Value     []byte
    Version   int64
    UpdatedAt time.Time
}
```

```go
func isQuorumMet(acks int, replicas int) bool {
    return acks >= (replicas/2 + 1)
}
```

## Implementation Steps
- Build single-node KV API first.
- Add hash ring and partition routing.
- Add replication and read/write handling.
- Add heartbeat-based failure detection.
- Implement rebalance on topology changes.
- Add integration tests for failover scenarios.

## Deliverables
- Multi-node KV system runnable with Docker.
- Load and failure simulation scripts.
- README with architecture and consistency model.

## Difficulty
Level: Expert  
Time: 24-36 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Distributed KV Store - React starter snippet
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
      <h1>Distributed KV Store</h1>
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
# Distributed KV Store - Django model + API view snippet
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
// Distributed KV Store - Spring Boot entity + REST endpoint snippet
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

