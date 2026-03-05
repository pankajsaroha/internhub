# Calculator Application

## Objective
Build a robust calculator app that supports basic arithmetic operations and proper expression evaluation.

## Problem Statement
Simple calculator UIs often break on edge cases (multiple operators, decimals, divide-by-zero). This project trains clean input handling and deterministic logic.

## Core Requirements
- Numeric keypad and operator keys (`+`, `-`, `*`, `/`).
- Decimal support and clear/backspace controls.
- Evaluate full expression on `=`.
- Handle invalid operations (for example divide by zero).
- Keyboard input support (optional bonus).

## Detailed Project Explanation
This is not just a UI task. You are building a tiny expression engine.  
You need to manage input state carefully and enforce operator rules, so users cannot crash the app with bad sequences.  
A production-style solution separates view logic from computation logic.

## Suggested Architecture
- Input/display component.
- Keypad component with action dispatch.
- Expression parser/evaluator utility.
- Error state handler.

## Data Model
- `display_value`
- `expression_tokens[]`
- `last_result`
- `error_message`

## Implementation Guide
1. Build calculator layout and button grid.
2. Add input reducer for number/operator actions.
3. Implement expression evaluator utility.
4. Add clear/backspace/percent handling.
5. Add validation and user-safe error messages.
6. Add optional keyboard shortcuts.

## Code Snippets
```ts
const operators = new Set(["+", "-", "*", "/"]);

function isOperator(token: string) {
  return operators.has(token);
}
```

```ts
function safeDivide(a: number, b: number) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
```

## Deliverables
- Working calculator with expression evaluation.
- Clean utility-based logic and UI separation.
- README with supported operations.

## Difficulty
Level: Easy  
Time: 3-6 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
import { useState } from "react";

export default function Calculator() {
  const [value, setValue] = useState("0");

  const press = (token: string) => {
    setValue((prev) => (prev === "0" ? token : prev + token));
  };

  return (
    <main>
      <h1>Calculator</h1>
      <div>{value}</div>
      <button onClick={() => press("1")}>1</button>
      <button onClick={() => press("+")}>+</button>
    </main>
  );
}
```

### Django (Backend)

```python
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json

@require_POST
def evaluate(request):
    payload = json.loads(request.body.decode("utf-8"))
    expr = payload.get("expression", "")
    # Keep this restricted in real implementation
    result = eval(expr)
    return JsonResponse({"result": result})
```

### Spring Boot (Backend)

```java
@RestController
@RequestMapping("/api/calculator")
public class CalculatorController {
  @PostMapping("/evaluate")
  public Map<String, Object> eval(@RequestBody Map<String, String> payload) {
    String expression = payload.get("expression");
    // Replace with safe parser for production
    return Map.of("expression", expression);
  }
}
```
