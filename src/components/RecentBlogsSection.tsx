import { useState, type CSSProperties } from "react";
import {
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  Globe,
  Server,
  Smartphone,
} from "lucide-react";
import { Link } from "../navigation/RouterContext";
import { PATHS } from "../navigation/paths";
import { BLOG_POSTS, type BlogPost } from "../data/blogPosts";

type Category = BlogPost["category"];
type Filter = "All" | Category;

const filters: readonly Filter[] = ["All", "Mobile", "Web", "Backend"];
const POSTS_PER_PAGE = 3;

const styles = {
  section: {
    background: "#f3f2f6",
    padding: "72px 0",
    color: "#1d1b22",
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  } satisfies CSSProperties,
  wrap: { maxWidth: 1024, margin: "0 auto", padding: "0 40px" } satisfies CSSProperties,
  archive: {
    margin: "0 0 4px",
    fontSize: 9,
    letterSpacing: ".1em",
    textTransform: "uppercase",
    color: "#6b6874",
  } satisfies CSSProperties,
  dot: {
    display: "inline-block",
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "#2457e6",
    marginRight: 8,
    verticalAlign: "middle",
  } satisfies CSSProperties,
  heading: {
    fontFamily: "'Newsreader', Georgia, serif",
    fontSize: 34,
    fontWeight: 400,
    lineHeight: 1.2,
    margin: 0,
  } satisfies CSSProperties,
  count: { fontSize: 9.5, letterSpacing: ".04em", color: "#6b6874" } satisfies CSSProperties,
  card: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: 10,
    border: "1px solid #e6e3ea",
    background: "#fff",
    boxShadow: "0 1px 3px rgba(20,18,30,.06)",
  } satisfies CSSProperties,
  image: { aspectRatio: "16 / 9", overflow: "hidden" } satisfies CSSProperties,
  body: { flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px" } satisfies CSSProperties,
  tag: {
    fontSize: 9,
    padding: "4px 8px",
    borderRadius: 6,
    border: "1px solid #e6e3ea",
    background: "#f3f2f6",
    color: "#4a4752",
  } satisfies CSSProperties,
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    margin: "0 0 10px",
    fontSize: 9.5,
    color: "#6b6874",
  } satisfies CSSProperties,
  title: {
    fontFamily: "'Newsreader', Georgia, serif",
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 1.35,
    margin: "0 0 8px",
  } satisfies CSSProperties,
  excerpt: { fontSize: 11, lineHeight: 1.75, color: "#6b6874", margin: 0 } satisfies CSSProperties,
  read: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    borderTop: "1px solid #e6e3ea",
    padding: "12px 20px",
    fontSize: 11,
    fontWeight: 500,
    color: "#2457e6",
    textDecoration: "none",
  } satisfies CSSProperties,
};

function formatPage(value: number) {
  return String(value).padStart(2, "0");
}

function categoryIcon(category: Category) {
  const Icon = category === "Mobile" ? Smartphone : category === "Web" ? Globe : Server;
  return <Icon size={34} strokeWidth={1.4} aria-hidden="true" />;
}

function priceStyle(isFree: boolean): CSSProperties {
  return {
    display: "inline-flex",
    gap: 6,
    fontSize: 9,
    padding: "4px 8px",
    borderRadius: 6,
    background: isFree ? "#e5f5ec" : "#fdf0d9",
    color: isFree ? "#2f8f5b" : "#b7791f",
  };
}

function PostImage({ post }: { post: BlogPost }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${post.category} article image placeholder`}
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
          color: "#4a4752",
          background: "linear-gradient(135deg, #dcd9e8, #b8c4ea)",
        }}
      >
        {categoryIcon(post.category)}
      </div>
    );
  }

  return (
    <img
      src={post.image}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

export default function RecentBlogsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [page, setPage] = useState(1);

  const filteredPosts = BLOG_POSTS.filter(
    (post) => activeFilter === "All" || post.category === activeFilter,
  );
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const visiblePosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <section aria-labelledby="recent-blogs-title" style={styles.section}>
      <div style={styles.wrap}>
        <p style={styles.archive}>
          <span style={styles.dot} />
          The Dev Journal archive
        </p>

        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 id="recent-blogs-title" style={styles.heading}>
            Recent Blogs
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            <div role="tablist" aria-label="Filter blog posts" className="flex items-center gap-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setPage(1);
                  }}
                  style={{
                    border: 0,
                    cursor: "pointer",
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontSize: 10.5,
                    fontFamily: "inherit",
                    background: activeFilter === filter ? "#2457e6" : "transparent",
                    color: activeFilter === filter ? "#fff" : "#4a4752",
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>

            <span style={styles.count} aria-live="polite">
              {formatPage(page)} / {formatPage(totalPages)}
            </span>
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              aria-label="Previous blog posts"
              style={{
                display: "grid",
                placeItems: "center",
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "1px solid #e6e3ea",
                background: "#fff",
                color: "#1d1b22",
                cursor: page === 1 ? "default" : "pointer",
                opacity: page === 1 ? 0.5 : 1,
              }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
              aria-label="Next blog posts"
              style={{
                display: "grid",
                placeItems: "center",
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "1px solid #e6e3ea",
                background: "#fff",
                color: "#1d1b22",
                cursor: page === totalPages ? "default" : "pointer",
                opacity: page === totalPages ? 0.5 : 1,
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label={`Blog posts, page ${page} of ${totalPages}`}
        >
          {visiblePosts.map((post) => (
            <article key={post.id} style={styles.card}>
              <div style={styles.image}>
                <PostImage post={post} />
              </div>
              <div style={styles.body}>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span style={styles.tag}>{post.category}</span>
                  <span style={priceStyle(post.price === "Free")}>
                    <strong style={{ fontWeight: 600 }}>{post.price}</strong>
                    {post.amount && <span>{post.amount}</span>}
                  </span>
                </div>
                <p style={styles.meta}>
                  <Clock size={12} aria-hidden="true" />
                  {post.date} · {post.read}
                </p>
                <h3 style={styles.title}>{post.title}</h3>
                <p style={styles.excerpt} className="line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <Link
                to={PATHS.BLOG_DETAILS}
                search={`?id=${post.id}`}
                style={styles.read}
                aria-label={`Read ${post.title}`}
              >
                Read article <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}