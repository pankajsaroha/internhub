# Weather Dashboard

## Objective
Build an interactive dashboard that fetches and displays real-time weather data and short-term forecasts for searched cities.

## Core Requirements
- Search weather by city name.
- Display current temperature, humidity, wind speed, and condition.
- Show 5-day forecast cards.
- Handle loading, empty, and API error states.
- Add responsive design for mobile and desktop.

## Suggested Architecture
- UI layer for search, weather summary, and forecast cards.
- Service layer for weather API integration.
- Utility layer for unit conversion and date formatting.

## API Integration
- Use OpenWeatherMap or WeatherAPI.
- Keep API key in environment variables.
- Normalize API responses before rendering.

## Implementation Guide
1. Add search input with debounce.
2. Fetch and transform weather payload.
3. Render current conditions and forecast.
4. Handle error and retry paths.
5. Add responsive UI and unit conversion.

## Code Snippets
```ts
const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
const response = await fetch(endpoint);
if (!response.ok) throw new Error("Weather API error");
const data = await response.json();
```

```ts
const dailyForecast = list.filter((entry: { dt_txt: string }) =>
  entry.dt_txt.includes("12:00:00")
);
```

## Implementation Steps
- Build search form and state handling.
- Integrate API fetch service.
- Render current weather section.
- Render forecast section.
- Add retry option on failures.
- Add optional C/F unit toggle.

## Deliverables
- Working weather dashboard app.
- Well-structured components and reusable API utility.
- README with environment setup and API key steps.

## Difficulty
Level: Intermediate  
Time: 5-8 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Weather Dashboard - React starter snippet
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
      <h1>Weather Dashboard</h1>
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
# Weather Dashboard - Django model + API view snippet
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
// Weather Dashboard - Spring Boot entity + REST endpoint snippet
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

