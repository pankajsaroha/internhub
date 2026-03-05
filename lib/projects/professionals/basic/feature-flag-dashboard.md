# Feature Flag Dashboard

## Objective
Build a dashboard to manage feature toggles by environment and rollout percentage.

## Core Requirements
- Create/update/delete feature flags.
- Enable by environment (`dev`, `staging`, `prod`).
- Add rollout percentage.
- Evaluate flags using user bucket.

## Detailed Project Explanation
Feature flags allow safe releases and controlled rollouts.  
This project teaches release governance and runtime configuration management.

## Implementation Guide
1. Build flag schema and CRUD.
2. Add environment-specific overrides.
3. Implement evaluate endpoint.
4. Add audit log for flag changes.

## Code Snippets
```ts
function isFlagEnabled(enabled: boolean, rolloutPct: number, bucket: number) {
  return enabled && bucket < rolloutPct;
}
```

## Stack-Specific IDE Snippets

### React (Frontend)
```tsx
export function FlagRow({ name, enabled }: { name: string; enabled: boolean }) {
  return <div>{name}: {enabled ? "ON" : "OFF"}</div>;
}
```

### Django (Backend)
```python
class FeatureFlag(models.Model):
    key = models.CharField(max_length=120, unique=True)
    enabled = models.BooleanField(default=False)
    rollout_pct = models.IntegerField(default=100)
```

### Spring Boot (Backend)
```java
@GetMapping("/flags/{key}/evaluate")
public Map<String, Boolean> evaluate(@PathVariable String key, @RequestParam int bucket) {
  return Map.of("enabled", service.isEnabled(key, bucket));
}
```
