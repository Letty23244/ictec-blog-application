import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import {
  ChevronDown,
  Clock,
  Calendar,
  Lock,
  ShieldCheck,
  Zap,
  Mail,
  Smartphone,
  Check,
  Info,
  Globe,
  Server,
  Camera,
} from "lucide-react";
import { Link, useLocation } from "../navigation/RouterContext";
import { PATHS } from "../navigation/paths";
import { BLOG_POSTS, type BlogPost } from "../data/blogPosts";
import { BLOG_ARTICLES, FALLBACK_ARTICLE } from "../data/blogArticles";

/* Same author details as the home page. Move these into a shared file when convenient. */
const AUTHOR = {
  name: "Leticia",
  photo: "/images/leticia.png",
  journal: "Leticia's Dev Journal",
  role: "Student Developer & Full-Stack Builder",
};

const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";
const SERIF = "'Newsreader', Georgia, serif";
const FONTS =
  "@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');";

const S = {
  page: { minHeight: "100vh", background: "#ffffff", color: "#1d1b22", fontFamily: SANS } satisfies CSSProperties,
  bar: { position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #ececf1" } satisfies CSSProperties,
  barIn: { maxWidth: 1024, margin: "0 auto", padding: "10px 24px", display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" } satisfies CSSProperties,
  logo: { width: 26, height: 26, borderRadius: 6, background: "#2457e6", color: "#fff", display: "grid", placeItems: "center", fontFamily: SERIF, fontSize: 14, fontWeight: 600 } satisfies CSSProperties,
  brand: { display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600 } satisfies CSSProperties,
  brandSub: { fontSize: 9.5, color: "#6b6874", marginTop: 1 } satisfies CSSProperties,
  article: { maxWidth: 576, margin: "0 auto", padding: "40px 24px 72px" } satisfies CSSProperties,
  metaRow: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 18 } satisfies CSSProperties,
  tag: { fontSize: 9, letterSpacing: ".08em", textTransform: "uppercase", padding: "4px 9px", borderRadius: 6, border: "1px solid #e6e3ea", background: "#f3f2f6", color: "#4a4752" } satisfies CSSProperties,
  tagBlue: { fontSize: 9, letterSpacing: ".08em", textTransform: "uppercase", padding: "4px 9px", borderRadius: 6, background: "#eaf0fe", color: "#2457e6", fontWeight: 600 } satisfies CSSProperties,
  premium: { fontSize: 9, letterSpacing: ".08em", textTransform: "uppercase", padding: "4px 9px", borderRadius: 6, background: "#fdf0d9", color: "#b7791f", fontWeight: 600 } satisfies CSSProperties,
  free: { fontSize: 9, letterSpacing: ".08em", textTransform: "uppercase", padding: "4px 9px", borderRadius: 6, background: "#e5f5ec", color: "#2f8f5b", fontWeight: 600 } satisfies CSSProperties,
  metaR: { display: "flex", alignItems: "center", gap: 14, fontSize: 10.5, color: "#6b6874" } satisfies CSSProperties,
  h1: { fontFamily: SERIF, fontSize: 40, fontWeight: 500, lineHeight: 1.15, letterSpacing: "-.01em", margin: "0 0 14px" } satisfies CSSProperties,
  sub: { fontSize: 14, lineHeight: 1.65, color: "#5a5762", margin: "0 0 22px" } satisfies CSSProperties,
  cover: { aspectRatio: "16 / 8", borderRadius: 10, overflow: "hidden", border: "1px solid #ececf1" } satisfies CSSProperties,
  caption: { display: "flex", alignItems: "center", gap: 6, fontSize: 9.5, color: "#8a8794", margin: "8px 0 20px" } satisfies CSSProperties,
  author: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid #ececf1", borderRadius: 10, margin: "0 0 26px" } satisfies CSSProperties,
  avatar: { width: 30, height: 30, borderRadius: "50%", overflow: "hidden", flex: "none" } satisfies CSSProperties,
  p: { fontSize: 15, lineHeight: 1.85, color: "#2c2a33", margin: "0 0 20px" } satisfies CSSProperties,
  drop: { float: "left", fontFamily: SERIF, fontSize: 58, lineHeight: 0.82, color: "#2457e6", padding: "6px 8px 0 0" } satisfies CSSProperties,
  quote: { margin: "26px 0", padding: "18px 20px", borderLeft: "3px solid #2457e6", background: "#eef2fd", borderRadius: "0 10px 10px 0" } satisfies CSSProperties,
  quoteText: { fontFamily: SERIF, fontStyle: "italic", fontSize: 19, lineHeight: 1.5, color: "#1d2a5b", margin: 0 } satisfies CSSProperties,
  cite: { display: "block", marginTop: 10, fontSize: 9, letterSpacing: ".08em", textTransform: "uppercase", color: "#6b6874", fontStyle: "normal" } satisfies CSSProperties,
  teaser: { filter: "blur(3.5px)", userSelect: "none", pointerEvents: "none", maxHeight: 150, overflow: "hidden",
    WebkitMaskImage: "linear-gradient(to bottom, #000 10%, transparent)", maskImage: "linear-gradient(to bottom, #000 10%, transparent)" } satisfies CSSProperties,
  card: { position: "relative", zIndex: 2, maxWidth: 490, margin: "28px auto 0", background: "#fafafc", border: "1px solid #ececf1", borderRadius: 18,
    boxShadow: "0 10px 40px rgba(20,18,50,.12)", padding: "28px 28px 20px" } satisfies CSSProperties,
  lockCircle: { width: 40, height: 40, margin: "0 auto", borderRadius: "50%", background: "#fff3dd", color: "#d6892b", display: "grid", placeItems: "center" } satisfies CSSProperties,
  payTitle: { fontFamily: SERIF, fontSize: 26, fontWeight: 500, lineHeight: 1.2, textAlign: "center", margin: "14px 0 8px" } satisfies CSSProperties,
  payDesc: { fontSize: 11.5, lineHeight: 1.65, color: "#6b6874", textAlign: "center", maxWidth: 380, margin: "0 auto 16px" } satisfies CSSProperties,
  priceWrap: { display: "flex", justifyContent: "center", marginBottom: 18 } satisfies CSSProperties,
  price: { display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 14px", borderRadius: 99, border: "1px solid #f3dcae", background: "#fff8ea" } satisfies CSSProperties,
  priceLabel: { fontSize: 8.5, letterSpacing: ".08em", textTransform: "uppercase", color: "#6b6874" } satisfies CSSProperties,
  priceVal: { fontSize: 13, fontWeight: 700, color: "#c26a00" } satisfies CSSProperties,
  tabs: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, padding: 3, background: "#f3f2f6", borderRadius: 10, marginBottom: 18 } satisfies CSSProperties,
  label: { fontSize: 8.5, letterSpacing: ".08em", textTransform: "uppercase", color: "#6b6874" } satisfies CSSProperties,
  netRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } satisfies CSSProperties,
  secure: { display: "inline-flex", alignItems: "center", gap: 4, fontSize: 9, color: "#2f8f5b" } satisfies CSSProperties,
  nets: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 } satisfies CSSProperties,
  fieldLabel: { display: "block", fontSize: 10.5, fontWeight: 600, color: "#3d3a45", margin: "0 0 6px" } satisfies CSSProperties,
  field: { display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", border: "1px solid #e0dde6", borderRadius: 8, background: "#ffffff", color: "#6b6874" } satisfies CSSProperties,
  input: { flex: 1, minWidth: 0, border: 0, outline: "none", background: "transparent", fontFamily: "inherit", fontSize: 12, color: "#1d1b22" } satisfies CSSProperties,
  cc: { display: "inline-flex", alignItems: "center", gap: 4, paddingRight: 10, marginRight: 2, borderRight: "1px solid #e0dde6", fontSize: 11.5, color: "#3d3a45", whiteSpace: "nowrap" } satisfies CSSProperties,
  hint: { fontSize: 9, color: "#8a8794", margin: "6px 0 14px" } satisfies CSSProperties,
  error: { fontSize: 10.5, color: "#c0392b", margin: "0 0 10px" } satisfies CSSProperties,
  notice: { display: "flex", gap: 8, marginTop: 14, padding: "10px 12px", borderRadius: 10, background: "#eef2fd", border: "1px solid #d9e3fb", fontSize: 10, lineHeight: 1.55, color: "#3d4a7a" } satisfies CSSProperties,
  trust: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginTop: 16, paddingTop: 14, borderTop: "1px solid #ececf1" } satisfies CSSProperties,
  trustItem: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 9, color: "#6b6874" } satisfies CSSProperties,
  unlocked: { display: "flex", alignItems: "center", gap: 8, margin: "8px 0 0", padding: "10px 12px", borderRadius: 10, background: "#e5f5ec", color: "#2f8f5b", fontSize: 11 } satisfies CSSProperties,
};

const tabStyle = (on: boolean): CSSProperties => ({
  border: 0, cursor: "pointer", fontFamily: "inherit", fontSize: 10.5, padding: "8px 6px", borderRadius: 8,
  background: on ? "#ffffff" : "transparent", color: on ? "#2457e6" : "#6b6874", fontWeight: on ? 600 : 400,
  boxShadow: on ? "0 1px 2px rgba(20,18,30,.1)" : "none",
});
const netStyle = (on: boolean): CSSProperties => ({
  display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
  border: on ? "1.5px solid #f2b705" : "1.5px solid #e6e3ea", background: on ? "#fffbea" : "#fff", textAlign: "left",
});
const netDotStyle = (bg: string, fg: string): CSSProperties => ({
  width: 22, height: 22, borderRadius: "50%", background: bg, color: fg, display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700, flex: "none",
});
const payBtnStyle = (busy: boolean): CSSProperties => ({
  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 14px", border: 0, borderRadius: 10,
  background: "#2457e6", color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: busy ? "default" : "pointer", opacity: busy ? 0.7 : 1,
});

const storageKey = (id: string) => `devjournal:unlocked:${id}`;
const readUnlocked = (id: string) => {
  try { return localStorage.getItem(storageKey(id)) === "1"; } catch { return false; }
};

function categoryIcon(category: BlogPost["category"]) {
  const Icon = category === "Mobile" ? Smartphone : category === "Web" ? Globe : Server;
  return <Icon size={34} strokeWidth={1.4} aria-hidden="true" />;
}

/* Shows your image; if the file is missing it shows a clean placeholder. */
function Pic({ src, alt = "", style, fallback }: { src?: string; alt?: string; style?: CSSProperties; fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  const base: CSSProperties = { width: "100%", height: "100%", objectFit: "cover", display: "block", ...style };
  if (!src || failed) {
    return (
      <div role="img" aria-label={alt}
        style={{ ...base, display: "grid", placeItems: "center", color: "#4a4752", background: "linear-gradient(135deg, #dcd9e8, #b8c4ea)" }}>
        {fallback}
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} style={base} />;
}

function Paywall({ amount, onUnlock }: { amount: string; onUnlock: () => void }) {
  const [tab, setTab] = useState<"new" | "restore">("new");
  const [network, setNetwork] = useState<"mtn" | "airtel">("mtn");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (tab === "new" && phone.replace(/\D/g, "").length < 9) return setError("Enter a valid phone number.");
    setError("");
    setBusy(true);
    // DEMO ONLY: replace this timer with a call to your payment backend (for example a Convex action).
    // The reader approves the PIN prompt on their phone, then your server confirms the payment and unlocks the article.
    setTimeout(onUnlock, 1800);
  };

  return (
    <form onSubmit={submit} style={S.card} noValidate>
      <div style={S.lockCircle}><Lock size={18} /></div>
      <h2 style={S.payTitle}>Support Independent Writing &amp; Unlock Full Essay</h2>
      <p style={S.payDesc}>
        Access the complete deep dive, annotated system blueprints, and the full archive packs with instant Mobile Money authorization.
      </p>
      <div style={S.priceWrap}>
        <span style={S.price}>
          <span style={S.priceLabel}>One-time essay contribution</span>
          <span style={S.priceVal}>{amount}</span>
        </span>
      </div>

      <div style={S.tabs} role="tablist">
        <button type="button" role="tab" aria-selected={tab === "new"} style={tabStyle(tab === "new")} onClick={() => setTab("new")}>
          New Access (Mobile Money)
        </button>
        <button type="button" role="tab" aria-selected={tab === "restore"} style={tabStyle(tab === "restore")} onClick={() => setTab("restore")}>
          Returning Reader (Restore)
        </button>
      </div>

      {tab === "new" && (
        <>
          <div style={S.netRow}>
            <span style={S.label}>Select mobile money network</span>
            <span style={S.secure}><ShieldCheck size={11} /> Instantly secure</span>
          </div>
          <div style={S.nets}>
            <button type="button" style={netStyle(network === "mtn")} onClick={() => setNetwork("mtn")}>
              <span style={netDotStyle("#ffcc00", "#1d1b22")}>M</span>
              <span style={{ fontSize: 11, fontWeight: 600 }}>MTN MoMo</span>
            </button>
            <button type="button" style={netStyle(network === "airtel")} onClick={() => setNetwork("airtel")}>
              <span style={netDotStyle("#e4002b", "#ffffff")}>A</span>
              <span style={{ fontSize: 11, fontWeight: 600 }}>Airtel Money</span>
            </button>
          </div>
        </>
      )}

      <label style={S.fieldLabel} htmlFor="pay-email">Your Email Address</label>
      <div style={S.field}>
        <Mail size={14} />
        <input id="pay-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" style={S.input} />
      </div>
      <p style={S.hint}>
        {tab === "new" ? "Used to send your receipt and restore access later." : "Enter the email you used when you first paid."}
      </p>

      {tab === "new" && (
        <>
          <label style={S.fieldLabel} htmlFor="pay-phone">Mobile Money Phone Number</label>
          <div style={S.field}>
            <span style={S.cc}>+256 (UG) <ChevronDown size={11} /></span>
            <input id="pay-phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="700 000 000" style={S.input} />
          </div>
          <p style={S.hint}>Do not include the country code; use the number registered for Mobile Money.</p>
        </>
      )}

      {error && <p style={S.error}>{error}</p>}

      <button type="submit" disabled={busy} style={payBtnStyle(busy)}>
        <Smartphone size={15} />
        {busy ? "Waiting for approval…" : tab === "new" ? "Pay via Mobile Money & Read Now" : "Restore My Access"}
      </button>

      {tab === "new" && (
        <div style={S.notice}>
          <Info size={13} style={{ flex: "none", marginTop: 1 }} />
          <span>
            <strong>Instant Handshake Prompt:</strong> after clicking, a secure USSD pop-up appears immediately on your device; enter your Mobile Money PIN to approve the transaction.
          </span>
        </div>
      )}

      <div style={S.trust}>
        <span style={S.trustItem}><ShieldCheck size={12} /> Verified secure checkout</span>
        <span style={S.trustItem}><Lock size={12} /> 256-bit SSL</span>
        <span style={S.trustItem}><Zap size={12} /> Instant activation</span>
      </div>
    </form>
  );
}

export function BlogDetailsPage() {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id") ?? "";
  const post = BLOG_POSTS.find((p) => String(p.id) === id);
  const [unlocked, setUnlocked] = useState(() => readUnlocked(id));

  useEffect(() => {
    setUnlocked(readUnlocked(id));
  }, [id]);

  if (!post) {
    return (
      <div style={{ ...S.page, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <h1 style={{ fontFamily: SERIF, fontSize: 28, margin: "0 0 8px" }}>Blog not found</h1>
          <Link to={PATHS.LANDING} style={{ color: "#2457e6", fontSize: 13 }}>← Back to Recent Blogs</Link>
        </div>
      </div>
    );
  }

  const article = BLOG_ARTICLES[String(post.id)] ?? FALLBACK_ARTICLE;
  const [p1, p2, p3, p4] = article.paragraphs;
  const isPaid = post.price === "Paid";
  const open = !isPaid || unlocked;

  const unlock = () => {
    try { localStorage.setItem(storageKey(String(post.id)), "1"); } catch { /* storage unavailable */ }
    setUnlocked(true);
  };

  return (
    <div style={S.page} className="antialiased">
      <style>{FONTS}</style>

      {/* If your PublicLayout already renders a header, delete this one. */}
      <header style={S.bar}>
        <Link to={PATHS.LANDING} style={S.barIn} aria-label="Back to home">
          <span style={S.logo}>{AUTHOR.name[0]}</span>
          <div>
            <div style={S.brand}>{AUTHOR.journal} <ChevronDown size={12} /></div>
            <div style={S.brandSub}>Mobile, web and backend notes</div>
          </div>
        </Link>
      </header>

      <main style={S.article}>
        <div style={S.metaRow}>
          <div className="flex items-center gap-2">
            {isPaid ? <span style={S.premium}>Premium access</span> : <span style={S.free}>Free</span>}
            <span style={S.tagBlue}>{post.category}</span>
          </div>
          <div style={S.metaR}>
            <span className="flex items-center gap-1"><Clock size={12} /> {post.read}</span>
            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
          </div>
        </div>

        <h1 style={S.h1}>{post.title}</h1>
        <p style={S.sub}>{article.subtitle}</p>

        <div style={S.cover}>
          <Pic src={post.image} alt={post.title} fallback={categoryIcon(post.category)} />
        </div>
        <p style={S.caption}><Camera size={11} aria-hidden="true" /> {article.caption}</p>

        <div style={S.author}>
          <div style={S.avatar}>
            <Pic src={AUTHOR.photo} alt={AUTHOR.name}
              fallback={<span style={{ fontSize: 12, fontWeight: 600 }}>{AUTHOR.name[0]}</span>} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{AUTHOR.name}</div>
            <div style={{ fontSize: 10, color: "#6b6874" }}>{AUTHOR.role}, {AUTHOR.journal}</div>
          </div>
        </div>

        <p style={S.p}><span style={S.drop}>{p1.charAt(0)}</span>{p1.slice(1)}</p>
        <p style={S.p}>{p2}</p>

        <blockquote style={S.quote}>
          <p style={S.quoteText}>“{article.quote.text}”</p>
          <cite style={S.cite}>— {article.quote.source}</cite>
        </blockquote>

        {open ? (
          <>
            <p style={S.p}>{p3}</p>
            <p style={S.p}>{p4}</p>
            {isPaid && (
              <p style={S.unlocked}><Check size={14} /> Access unlocked. Thank you for supporting independent writing.</p>
            )}
          </>
        ) : (
          <>
            <div style={S.teaser}><p style={{ ...S.p, margin: 0 }}>{p3}</p></div>
            <Paywall amount={post.amount ?? "UGX 9,900"} onUnlock={unlock} />
          </>
        )}
      </main>
    </div>
  );
}

export default BlogDetailsPage;