# Library Management System

## Objective
Build a production-style backend system to manage books, members, issue and return workflows, due dates, and fines.

## Core Requirements
- Add, update, delete, and search books.
- Register and manage members.
- Issue and return books with availability checks.
- Track due dates and calculate late fines.
- Maintain transaction history and status.

## Suggested Architecture
- Controller/API layer for request handling.
- Service layer for business logic.
- Repository/DAO layer for database access.
- Relational database for persistence.

## Database Design
Use 3 primary entities:
- `books`: title, author, isbn, total_copies, available_copies.
- `members`: name, email, phone, membership_date, status.
- `transactions`: book_id, member_id, issue_date, due_date, return_date, fine_amount, status.

## API Endpoints
- `POST /books`, `GET /books`, `PUT /books/:id`, `DELETE /books/:id`
- `POST /members`, `GET /members`
- `POST /transactions/issue`
- `POST /transactions/return`
- `GET /transactions`

## Business Rules
- A book can be issued only when `available_copies > 0`.
- On issue, decrement `available_copies`.
- On return, increment `available_copies`.
- If returned after due date, calculate fine per day and store it.

## Concurrency and Data Integrity
- Wrap issue/return flow in DB transactions.
- Lock selected book row during issue operation to avoid over-issuing.
- Validate state transitions (`ISSUED -> RETURNED`) strictly.

## Security and Access
- Add JWT-based authentication.
- Restrict write routes to admin/staff roles.
- Keep member and transaction endpoints permission-aware.

## Performance
- Add indexes on frequently queried columns:
  - `books(title)`
  - `transactions(status)`
  - `transactions(member_id)`

## Implementation Guide
1. Create schema and migration scripts.
2. Implement book/member CRUD endpoints.
3. Add issue/return workflows in service layer.
4. Enforce transactional consistency.
5. Add fine calculation and due-date scheduler.
6. Add auth and role-based access.

## Code Snippets
```sql
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_tx_member_status ON transactions(member_id, status);
```

```ts
function calculateFine(dueDate: Date, returnDate: Date, perDay = 10) {
  const lateDays = Math.max(
    0,
    Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  return lateDays * perDay;
}
```

## Deliverables
- Backend source code with layered structure.
- SQL schema and migration files.
- Postman collection with sample requests.
- README describing setup, design decisions, and tradeoffs.

## Difficulty
Level: Advanced  
Time: 12-18 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Library Management System - React starter snippet
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
      <h1>Library Management System</h1>
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
# Library Management System - Django model + API view snippet
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
// Library Management System - Spring Boot entity + REST endpoint snippet
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

