import { useEffect, useState, type FormEvent } from "react";
import {
  AtSign,
  ChevronDown,
  Loader2,
  Lock,
  Smartphone,
  Sparkles,
} from "lucide-react";
import mtnLogo from "../assets/mtn-momo.png";
import airtelLogo from "../assets/airtel-money.png";

export type MobileMoneyNetwork = "mtn" | "airtel";

export interface PayPayload {
  network: MobileMoneyNetwork;
  email: string;
  /** International format without "+", e.g. 256741491117 */
  phone: string;
}

interface PaywallDialogProps {
  /** One-time price in UGX */
  amount?: number;
  /** Start the mobile money charge. Throw an Error to show a message in the dialog. */
  onPay: (payload: PayPayload) => Promise<void>;
  /** Restore access for a reader who already paid. Throw an Error to show a message. */
  onRestore: (email: string) => Promise<void>;
  /** Optional. If omitted the dialog cannot be dismissed. */
  onClose?: () => void;
}

type Tab = "new" | "returning";

const NETWORKS: { id: MobileMoneyNetwork; label: string; logo: string }[] = [
  { id: "mtn", label: "MTN MoMo", logo: mtnLogo },
  { id: "airtel", label: "Airtel Money", logo: airtelLogo },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Accepts 0741491117, 741491117 or +256741491117 and returns 256741491117, or null. */
function normalizeUgPhone(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("256")) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return /^7\d{8}$/.test(digits) ? `256${digits}` : null;
}

export default function PaywallDialog({
  amount = 9500,
  onPay,
  onRestore,
  onClose,
}: PaywallDialogProps) {
  const [tab, setTab] = useState<Tab>("new");
  const [network, setNetwork] = useState<MobileMoneyNetwork>("mtn");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!onClose) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const switchTab = (next: Tab) => {
    setTab(next);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!EMAIL_RE.test(cleanEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setPending(true);
    try {
      if (tab === "new") {
        const normalized = normalizeUgPhone(phone);
        if (!normalized) {
          setError("Enter a valid Ugandan mobile number, e.g. 0771234567.");
          setPending(false);
          return;
        }
        await onPay({ network, email: cleanEmail, phone: normalized });
      } else {
        await onRestore(cleanEmail);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  };

  const inputShell =
    "flex items-center rounded-xl border border-stone-200 bg-stone-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-stone-50/80 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="paywall-title"
        className="my-auto w-full max-w-[460px] rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] sm:p-8"
      >
        {/* Lock badge */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-500">
          <Lock size={20} />
        </div>

        <h2
          id="paywall-title"
          className="mt-5 text-center font-serif text-[26px] font-medium leading-tight text-stone-900"
        >
          Support Independent Writing &amp; Unlock Full Blog
        </h2>

        {/* Price pill */}
        <div className="mt-5 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-amber-200 bg-amber-50/70 px-4 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">
              One-time reader contribution
            </span>
            <span className="font-serif text-base font-bold text-amber-700">
              UGX {amount.toLocaleString("en-US")}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          className="mt-6 grid grid-cols-2 gap-1 rounded-xl border border-stone-200 bg-stone-100 p-1"
        >
          {(
            [
              ["new", "New Access (Mobile Money)"],
              ["returning", "Returning Reader (Restore)"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => switchTab(id)}
              className={`rounded-lg px-2 py-2.5 text-xs font-semibold transition ${
                tab === id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          {tab === "new" && (
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Select mobile money network
              </p>
              <div className="grid grid-cols-2 gap-3">
                {NETWORKS.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    aria-pressed={network === n.id}
                    onClick={() => setNetwork(n.id)}
                    className={`flex h-20 items-center justify-center rounded-xl border px-3 transition ${
                      network === n.id
                        ? "border-blue-500 bg-blue-50/60"
                        : "border-stone-200 bg-stone-50 hover:border-stone-300"
                    }`}
                  >
                    <img
                      src={n.logo}
                      alt={n.label}
                      className={`max-h-10 w-auto max-w-[80%] object-contain transition ${
                        network === n.id ? "" : "opacity-70 grayscale"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="pw-email" className="mb-1.5 block text-xs font-bold text-stone-800">
              Your Email Address
            </label>
            <div className={`${inputShell} gap-2 px-3`}>
              <AtSign size={16} className="shrink-0 text-stone-400" />
              <input
                id="pw-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-stone-500">
              {tab === "new"
                ? "Used to securely associate and restore your lifetime reading pass."
                : "Enter the email you used when you first paid to restore your access."}
            </p>
          </div>

          {/* Phone */}
          {tab === "new" && (
            <div>
              <label htmlFor="pw-phone" className="mb-1.5 block text-xs font-bold text-stone-800">
                Mobile Money Phone Number
              </label>
              <div className={`${inputShell} overflow-hidden`}>
                <div className="relative border-r border-stone-200">
                  <select
                    aria-label="Country code"
                    className="h-full appearance-none bg-transparent py-3 pl-3 pr-8 text-sm font-semibold text-stone-800 outline-none"
                  >
                    <option>+256 (UG)</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                </div>
                <Smartphone size={16} className="ml-3 shrink-0 text-stone-400" />
                <input
                  id="pw-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0771234567"
                  className="w-full bg-transparent px-2 py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-stone-500">
                Direct authorization; standard network tariffs apply.
              </p>
            </div>
          )}

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {tab === "new" ? "Waiting for approval on your phone…" : "Restoring…"}
              </>
            ) : (
              <>
                <Lock size={15} />
                {tab === "new" ? "Pay via Mobile Money & Read Now" : "Restore my access"}
              </>
            )}
          </button>

          {tab === "new" && (
            <div className="flex gap-3 rounded-xl border border-stone-200 bg-stone-50 p-3.5">
              <Sparkles size={16} className="mt-0.5 shrink-0 text-orange-500" />
              <p className="text-[11px] leading-relaxed text-stone-500">
                <span className="font-bold text-stone-800">Instant Handset Prompt:</span> After
                clicking, a secure USSD pop-up will appear immediately on your device. Enter your
                secret Mobile Money PIN to approve the transaction.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}