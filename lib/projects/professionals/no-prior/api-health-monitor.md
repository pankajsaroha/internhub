# API Health Monitor

## Objective
Build a monitoring tool to check API endpoints continuously and report uptime, failures, and latency trends.

## Core Requirements
- Register multiple API endpoints.
- Run health checks on schedule.
- Store status code and response time.
- Show endpoint uptime summary.

## Detailed Project Explanation
This project introduces practical ops concepts for developers: observability, reliability, and incident detection.  
You will build a small but real production utility used by teams to detect outages early.

## Implementation Guide
1. Build endpoint CRUD API.
2. Add scheduled checker job.
3. Persist check results.
4. Create dashboard summary endpoint.
5. Add retry and timeout handling.

## Code Snippets
```ts
async function runCheck(url: string) {
  const start = Date.now();
  const res = await fetch(url, { method: "GET" });
  return { ok: res.ok, status: res.status, latencyMs: Date.now() - start };
}
```

## Stack-Specific IDE Snippets

### React (Frontend)
```tsx
export function UptimeCard({ uptime }: { uptime: number }) {
  return <p>Uptime: {uptime.toFixed(2)}%</p>;
}
```

### Django (Backend)
```python
class Endpoint(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField()
```

### Spring Boot (Backend)
```java
@GetMapping("/health")
public Map<String, String> health() { return Map.of("status", "ok"); }
```
