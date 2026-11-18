import { useEffect, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Share2,
  Link as LinkIcon,
  Copy,
  Check,
} from "lucide-react";
import RecentBlogsSection from "./RecentBlogsSection";

const profile = {
  name: "Leticia",
  role: "Student Developer & Full-Stack Builder, Founder of Leticia's Dev Journal",
  photo: "/images/leticia.png",
  label: "Developer focus",
  headlineStart: "Building apps at the intersection of",
  headlineItalic: "mobile design,",
  headlineEnd: "clean backends, and software that ships.",
  bio1:
    "Over the last few years, I have built full-stack projects across Flutter, Laravel, Flask and Streamlit while studying at university, taking each one from a first sketch to a deployed demo. The Dev Journal is a place for unhurried write-ups: deliberate investigations into mobile design, clean backends, and tools built to survive demo day.",
  bio2:
    "Every piece published here goes through iterative revisions, careful debugging, and honest review. Written from my own project experience, with the trade-offs and mistakes left in. No filler, no shortcuts, no performative urgency.",
  email: "akulluleticia23@gmail.com",
  phone: "+256 7404 70595/0765451895",
  whatsapp: "https://wa.me/256740470595",
  linkedin: "https://linkedin.com/leticia-letty",
  x: "https://x.com/@leti27371",
  xHandle: "@leticia27371",
  journalName: "Leticia's Dev Journal",
};

const DESIGN_WIDTH = 1040; 

const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";
const SERIF = "'Newsreader', Georgia, serif";
const FONTS =
  "@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');";

const S = {
  page: { minHeight: "100vh", background: "#f9f8fc", color: "#1d1b22", fontFamily: SANS } satisfies CSSProperties,
  wrap: { maxWidth: 1024, margin: "0 auto", padding: "0 40px" } satisfies CSSProperties,
  hero: { paddingTop: 40, paddingBottom: 80 } satisfies CSSProperties,
  heroGrid: { display: "grid", gridTemplateColumns: "372fr 521fr", gap: 44, alignItems: "start" } satisfies CSSProperties,
  photo: { position: "relative", aspectRatio: "1 / 1.24", overflow: "hidden", borderRadius: 18, boxShadow: "0 1px 2px rgba(20,18,30,.1)" } satisfies CSSProperties,
  fade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    pointerEvents: "none",
    background: "linear-gradient(to top, rgba(255,255,255,.6), rgba(255,255,255,.15), transparent)",
  } satisfies CSSProperties,
  bar: { position: "absolute", left: 14, right: 14, bottom: 18, height: 8, borderRadius: 99, background: "rgba(255,255,255,.95)" } satisfies CSSProperties,
  caption: { marginTop: 14, fontSize: 11, lineHeight: 1.35, display: "flex", flexDirection: "column", gap: 2 } satisfies CSSProperties,
  eyebrow: { margin: "0 0 18px", fontSize: 10, lineHeight: 1, letterSpacing: ".14em", textTransform: "uppercase", color: "#b4533c" } satisfies CSSProperties,
  h1: { fontFamily: SERIF, fontSize: 40, fontWeight: 400, lineHeight: 1.25, letterSpacing: "-.01em", margin: "0 0 26px" } satisfies CSSProperties,
  bio1: { fontSize: 13, lineHeight: 1.75, color: "#4a4752", margin: "0 0 16px" } satisfies CSSProperties,
  bio2: { fontSize: 11.5, lineHeight: 1.7, color: "#6b6874", margin: "0 0 36px" } satisfies CSSProperties,
  label: { fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#6b6874", margin: "0 0 12px" } satisfies CSSProperties,
  chip: { display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", fontSize: 11, color: "#3d3a45",
    background: "#f1f0f5", border: "1px solid #e8e6ec", borderRadius: 6, textDecoration: "none" } satisfies CSSProperties,
  copyBtn: { display: "inline-flex", marginLeft: 4, padding: 0, border: 0, background: "none", color: "#6b6874", cursor: "pointer" } satisfies CSSProperties,
  foot: { display: "flex", alignItems: "center", gap: 10, padding: "24px 40px", fontSize: 12 } satisfies CSSProperties,
  avatar: { width: 24, height: 24, borderRadius: "50%", objectFit: "cover" } satisfies CSSProperties,
};

function Pic({ src, alt = "", style, fallback }: { src?: string; alt?: string; style?: CSSProperties; fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  const base: CSSProperties = { width: "100%", height: "100%", objectFit: "cover", display: "block", ...style };
  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{
          ...base,
          display: "grid",
          placeItems: "center",
          color: "#4a4752",
          background: "linear-gradient(135deg, #dcd9e8, #b8c4ea)",
        }}
      >
        {fallback}
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} style={base} />;
}


function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(window.innerWidth >= DESIGN_WIDTH ? 1 : window.innerWidth / DESIGN_WIDTH);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

export default function Portfolio() {
  const scale = useScale();
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op: clipboard access may be unavailable in some browsers
    }
  };

  return (
    <div style={{ ...S.page, zoom: scale }} className="antialiased">
      <style>{FONTS}</style>

      {/* ---------- HERO ---------- */}
      <header style={{ ...S.wrap, ...S.hero }}>
        <div style={S.heroGrid}>
          <figure className="m-0 min-w-0">
            <div style={S.photo}>
              <Pic
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                fallback={<span style={{ fontFamily: SERIF, fontSize: 120, opacity: 0.7 }}>{profile.name[0]}</span>}
              />
              <span style={S.fade} />
              <span style={S.bar} />
            </div>
            <figcaption style={S.caption}>
              <strong className="font-semibold">{profile.name}</strong>
              <span style={{ color: "#6b6874" }}>{profile.role}</span>
            </figcaption>
          </figure>

          <div className="min-w-0">
            <p style={S.eyebrow}>{profile.label}</p>
            <h1 style={S.h1}>
              {profile.headlineStart} <em style={{ fontStyle: "italic" }}>{profile.headlineItalic}</em>{" "}
              {profile.headlineEnd}
            </h1>
            <p style={S.bio1}>{profile.bio1}</p>
            <p style={S.bio2}>{profile.bio2}</p>

            <p style={S.label}>Direct inquiries &amp; collaboration</p>
            <div className="flex flex-wrap gap-2">
              <a style={S.chip} href={`mailto:${profile.email}`}>
                <Mail size={13} /> {profile.email}
                <button type="button" onClick={copyEmail} aria-label="Copy email address"
                  title={copied ? "Copied" : "Copy email"} style={S.copyBtn}>
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </a>
              <a style={S.chip} href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                <Phone size={13} /> {profile.phone}
              </a>
              <a style={S.chip} href={profile.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle size={13} /> WhatsApp
              </a>
              <a style={S.chip} href={profile.linkedin} target="_blank" rel="noreferrer">
                <Share2 size={13} /> LinkedIn
              </a>
              <a style={S.chip} href={profile.x} target="_blank" rel="noreferrer">
                <LinkIcon size={13} /> X {profile.xHandle}
              </a>
            </div>
          </div>
        </div>
      </header>

      <RecentBlogsSection />

      <footer style={{ ...S.wrap, ...S.foot }}>
        <div style={S.avatar}>
          <Pic src={profile.photo} style={{ borderRadius: "50%" }}
            fallback={<span style={{ fontSize: 11, fontWeight: 600 }}>{profile.name[0]}</span>} />
        </div>
        <strong style={{ fontWeight: 500 }}>{profile.journalName}</strong>
      </footer>
    </div>
  );
}