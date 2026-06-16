# System Design: Building a High-Scale URL Shortener

Designing a URL shortener like Bitly or TinyURL is a classic engineering challenge that touches upon hashing, caching, and distributed systems.

## 1. Requirements & Goals

### Functional Requirements
- **Shortening**: Given a long URL, return a unique 6-8 character alias.
- **Redirection**: Clicking a short link redirects users to the original URL.
- **Custom Aliases**: Users can provide a custom string for their links (optional).
- **Expiry**: Links should have a default lifetime (e.g., 2 years).

### Non-Functional Requirements
- **High Availability**: The system must be 100% available for redirects.
- **Low Latency**: Redirection should happen in < 10ms.
- **Read-Heavy**: Most traffic will be clicking links, not creating them (e.g., 100:1 read-write ratio).

---

## 2. Capacity Estimation

Before designing the architecture, we must understand the scale.

| Resource | Value |
| --- | --- |
| Total URLs (5 years) | 30 Billion |
| Write Throughput | 200 URLs/sec |
| Read Throughput | 20,000 Redirects/sec |
| Storage Required | 15 TB |

---

## 3. Hashing vs. Base62 Encoding

There are two main ways to generate the short ID:

### Option A: MD5/SHA Hashing
- Take MD5 of the URL.
- Convert to Base64.
- Take the first 7 characters.
- **Problem**: Collisions. You need to check the DB and append a salt if it exists.

### Option B: Base62 Encoding (Recommended)
- Use a counter/auto-incrementing ID from the database.
- Convert that number (e.g., 10,000,000) into Base62 (`[0-9, a-z, A-Z]`).
- **Advantage**: No collisions if the ID is unique.

---

## 4. Implementation: The Hashing Utility

Here is how you implement a production-grade Base62 encoder in TypeScript:

```ts
const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodeBase62(id: number): string {
    let result = "";
    while (id > 0) {
        result = CHARS[id % 62] + result;
        id = Math.floor(id / 62);
    }
    return result || "0";
}

// Example: 1,000,000,000 -> "15FTGg"
```

---

## 5. Detailed Approach: Step-by-Step

### Step 1: Data Modeling
We need a simple but fast schema. Using a unique ID generator like Snowflake ensures distributed scale.

### Step 2: The Redirection Flow
- User clicks link -> **Redis Cache** check.
- **Cache Hit**: Redirect (302).
- **Cache Miss**: DB Query -> Cache Update -> Redirect.

---

## 6. Reference Implementation

You can find the production-ready starter kit here:
[GitHub: Internhub URL Shortener Starter](https://github.com/inzivoo/url-shortener-starter)
