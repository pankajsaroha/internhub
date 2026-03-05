# Blog Application

## Objective
Build a full blog platform where users can create, edit, publish, and read posts with categories and comments.

## Problem Statement
Blog applications combine multiple real-world concerns: content modeling, routing, user roles, SEO-friendly pages, and CRUD security. This project bridges beginner and intermediate fullstack skills.

## Core Requirements
- User authentication (author and reader roles).
- Create/update/delete blog posts.
- Publish and unpublish drafts.
- Category/tag filtering and search.
- Post details page with comments.
- Pagination for blog listing.

## Detailed Project Explanation
A blog app teaches production-like content workflows.  
You will implement authoring, moderation, and rendering pipelines instead of a single static page.  
The project is valuable for internships because it demonstrates data modeling, access control, and API-first thinking.

## Suggested Architecture
- Public pages: home, category, post details.
- Author dashboard: post editor and post management.
- API/service layer for posts/comments.
- Database with indexed search fields.

## Data Model
- `users`: id, name, email, role
- `posts`: id, title, slug, content, status, author_id, published_at
- `categories`: id, name, slug
- `comments`: id, post_id, user_id, body, created_at

## Implementation Guide
1. Build auth and role checks.
2. Implement post CRUD and publish workflow.
3. Add slug generation and SEO routes.
4. Build category/tag and search filters.
5. Add comment creation and moderation.
6. Add pagination and performance indexes.

## Code Snippets
```ts
function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, "")
    .replace(/\\s+/g, "-");
}
```

```sql
CREATE INDEX idx_posts_status_published_at
ON posts(status, published_at DESC);
```

## Deliverables
- Full blog app with public + author sections.
- Proper role-based post management.
- README with architecture and endpoint docs.

## Difficulty
Level: Intermediate  
Time: 12-20 Hours

## Stack-Specific IDE Snippets

### React (Frontend)

```tsx
import Link from "next/link";

export default function BlogList({ posts }: { posts: { id: string; title: string; slug: string }[] }) {
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>
          <Link href={`/blog/${p.slug}`}>{p.title}</Link>
        </li>
      ))}
    </ul>
  );
}
```

### Django (Backend)

```python
class Post(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    content = models.TextField()
    status = models.CharField(max_length=20, default="DRAFT")
    published_at = models.DateTimeField(null=True, blank=True)
```

### Spring Boot (Backend)

```java
@Entity
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;
  private String slug;
  @Lob
  private String content;
  private String status = "DRAFT";
}
```
