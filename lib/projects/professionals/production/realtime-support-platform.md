# Realtime Support Platform

## Objective
Build a fullstack customer support platform with live chat, ticket conversion, and agent analytics.

## Core Requirements
- Realtime customer-agent chat.
- Convert chats into support tickets.
- Ticket status workflow and SLA timers.
- Agent assignment and load balancing.
- Dashboard for response/resolution metrics.

## Suggested Architecture
- Realtime gateway (WebSocket).
- Ticketing backend and relational database.
- Notification service for assignments and SLA breaches.

## Data Model
- `users`, `agents`, `chat_sessions`, `messages`, `tickets`, `sla_events`

## Implementation Guide
1. Build chat room lifecycle.
2. Store and stream messages reliably.
3. Add ticket creation from chat transcript.
4. Implement SLA policies and reminders.
5. Build analytics dashboard for ops team.

## Code Snippets
```ts
io.on("connection", (socket) => {
  socket.on("join-session", (sessionId: string) => {
    socket.join(sessionId);
  });

  socket.on("send-message", async (payload) => {
    await saveMessage(payload);
    io.to(payload.sessionId).emit("new-message", payload);
  });
});
```

```ts
const remainingMins = Math.max(
  0,
  Math.floor((slaDueAt.getTime() - Date.now()) / 60000)
);
```

## Deliverables
- Realtime support platform with ticketing.
- Monitoring and SLA visibility.

## Difficulty
Level: Expert  
Time: 28-45 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Realtime Support Platform - React starter snippet
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
      <h1>Realtime Support Platform</h1>
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
# Realtime Support Platform - Django model + API view snippet
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
// Realtime Support Platform - Spring Boot entity + REST endpoint snippet
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

