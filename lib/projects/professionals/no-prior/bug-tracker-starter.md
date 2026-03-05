# Bug Tracker Starter

## Objective
Build a bug tracking system for teams to create, assign, and resolve issues.

## Core Requirements
- Create tickets with severity and description.
- Assign owner and priority.
- Update status (`OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`).
- Filter by status and assignee.

## Detailed Project Explanation
A bug tracker is a practical workflow system.  
You will learn lifecycle modeling, state transitions, and operational transparency.

## Implementation Guide
1. Create ticket schema.
2. Add ticket CRUD and assignment APIs.
3. Add workflow transition rules.
4. Build dashboard view and filters.

## Code Snippets
```ts
function canTransition(from: string, to: string) {
  const map: Record<string, string[]> = {
    OPEN: ["IN_PROGRESS", "CLOSED"],
    IN_PROGRESS: ["RESOLVED", "OPEN"],
    RESOLVED: ["CLOSED", "IN_PROGRESS"],
    CLOSED: [],
  };
  return map[from]?.includes(to) ?? false;
}
```

## Stack-Specific IDE Snippets

### React (Frontend)
```tsx
export const TicketCount = ({ total }: { total: number }) => <p>Total Tickets: {total}</p>;
```

### Django (Backend)
```python
class Ticket(models.Model):
    title = models.CharField(max_length=180)
    status = models.CharField(max_length=20, default="OPEN")
```

### Spring Boot (Backend)
```java
@PatchMapping("/tickets/{id}/status")
public Ticket updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
  return service.updateStatus(id, body.get("status"));
}
```
