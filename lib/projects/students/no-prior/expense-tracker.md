# Expense Tracker

## Objective
Build a personal expense tracker that helps users add income/expenses, classify transactions, and view balance trends.

## Core Requirements
- Add transaction with type (`INCOME` or `EXPENSE`), amount, category, and note.
- Edit and delete transactions.
- Show current balance, total income, and total expense.
- Filter by category and date range.
- Persist data in local storage or database.

## Suggested Architecture
- UI layer for forms, summary cards, and transaction table.
- State layer for transaction calculations and filters.
- Storage layer for persistence and recovery.

## Data Model
- `id`
- `type`
- `amount`
- `category`
- `note`
- `transaction_date`
- `created_at`

## Implementation Guide
1. Build transaction form and validation.
2. Create transaction list with edit/delete actions.
3. Add summary calculations for totals.
4. Add category/date filters.
5. Persist and restore data on app load.

## Code Snippets
```ts
type TxType = "INCOME" | "EXPENSE";

interface Transaction {
  id: string;
  type: TxType;
  amount: number;
  category: string;
  note?: string;
  transactionDate: string;
}
```

```ts
const totals = transactions.reduce(
  (acc, tx) => {
    if (tx.type === "INCOME") acc.income += tx.amount;
    else acc.expense += tx.amount;
    acc.balance = acc.income - acc.expense;
    return acc;
  },
  { income: 0, expense: 0, balance: 0 }
);
```

## Deliverables
- Working expense tracker app.
- README with setup and feature checklist.

## Difficulty
Level: Easy  
Time: 4-6 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
// Expense Tracker - React starter snippet
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
      <h1>Expense Tracker</h1>
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
# Expense Tracker - Django model + API view snippet
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
// Expense Tracker - Spring Boot entity + REST endpoint snippet
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

