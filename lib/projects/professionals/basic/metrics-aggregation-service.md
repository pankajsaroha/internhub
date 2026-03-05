# Metrics Aggregation Service

## Objective
Build a service that ingests app events and provides aggregated metrics for dashboards.

## Core Requirements
- Ingest event payloads (`event_type`, `value`, `timestamp`).
- Aggregate metrics hourly/daily.
- Expose metrics API for charts.
- Handle invalid data and retries.

## Detailed Project Explanation
Data-driven products depend on metric pipelines.  
This project teaches ingestion design, aggregation logic, and data quality checks.

## Implementation Guide
1. Define event ingestion contract.
2. Build ingestion endpoint + queue.
3. Implement periodic aggregation jobs.
4. Expose query APIs for dashboards.

## Code Snippets
```ts
type MetricEvent = {
  eventType: string;
  value: number;
  timestamp: string;
};
```

```sql
CREATE TABLE metric_events (
  id BIGSERIAL PRIMARY KEY,
  event_type VARCHAR(80) NOT NULL,
  value DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP NOT NULL
);
```

## Stack-Specific IDE Snippets

### React (Frontend)
```tsx
export function MetricCard({ name, value }: { name: string; value: number }) {
  return <p>{name}: {value}</p>;
}
```

### Django (Backend)
```python
class MetricEvent(models.Model):
    event_type = models.CharField(max_length=80)
    value = models.FloatField()
    created_at = models.DateTimeField()
```

### Spring Boot (Backend)
```java
@PostMapping("/metrics/events")
public ResponseEntity<Void> ingest(@RequestBody MetricEventRequest req) {
  service.ingest(req);
  return ResponseEntity.accepted().build();
}
```
