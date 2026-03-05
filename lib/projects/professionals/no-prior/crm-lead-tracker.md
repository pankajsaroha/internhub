# CRM Lead Tracker

## Objective
Create a lightweight CRM app to track leads, follow-ups, and conversion stages.

## Core Requirements
- Create and edit leads.
- Pipeline stages (`NEW`, `CONTACTED`, `QUALIFIED`, `WON`, `LOST`).
- Filter leads by stage and source.
- Add follow-up notes.

## Detailed Project Explanation
This project models a common sales workflow and teaches state transition logic, list filtering, and business reporting.

## Implementation Guide
1. Design lead and activity tables.
2. Build lead CRUD + status transition APIs.
3. Add notes/follow-up module.
4. Build stage dashboard and counts.

## Code Snippets
```ts
type LeadStage = "NEW" | "CONTACTED" | "QUALIFIED" | "WON" | "LOST";
```

## Stack-Specific IDE Snippets

### React (Frontend)
```tsx
export function LeadStagePill({ stage }: { stage: string }) {
  return <span>{stage}</span>;
}
```

### Django (Backend)
```python
class Lead(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    stage = models.CharField(max_length=20, default="NEW")
```

### Spring Boot (Backend)
```java
@Entity
public class Lead {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
  String name; String email; String stage = "NEW";
}
```
