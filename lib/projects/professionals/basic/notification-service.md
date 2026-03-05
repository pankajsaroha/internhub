# Notification Service

## Objective
Build a service that sends email/in-app notifications with queue, retries, and delivery tracking.

## Core Requirements
- Create notification templates.
- Queue notifications for async sending.
- Retry failed jobs.
- Store delivery logs.

## Detailed Project Explanation
Notification systems are core infrastructure.  
This project teaches async processing, failure handling, and reliability patterns.

## Implementation Guide
1. Build template + job models.
2. Create enqueue API.
3. Implement worker processor.
4. Add delivery status dashboard.

## Code Snippets
```ts
interface NotificationJob {
  id: string;
  channel: "EMAIL" | "IN_APP";
  recipient: string;
  payload: Record<string, string>;
}
```

## Stack-Specific IDE Snippets

### React (Frontend)
```tsx
export const DeliveryStat = ({ sent, failed }: { sent: number; failed: number }) =>
  <p>Sent: {sent} | Failed: {failed}</p>;
```

### Django (Backend)
```python
class NotificationLog(models.Model):
    recipient = models.EmailField()
    status = models.CharField(max_length=20, default="PENDING")
```

### Spring Boot (Backend)
```java
@PostMapping("/notifications")
public ResponseEntity<?> enqueue(@RequestBody NotificationRequest req) {
  service.enqueue(req);
  return ResponseEntity.accepted().build();
}
```
