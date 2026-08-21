import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { trackCta, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

const AREAS = ["Kanpur", "Shuklaganj", "Unnao", "Other"] as const;
const ISSUES = ["Switch", "Fan", "MCB", "Wiring", "Inverter", "Other"] as const;

function digitsOnly(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

function isValidMobile(value: string) {
  return /^[6-9]\d{9}$/.test(value);
}

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-2 text-sm font-semibold transition",
        active
          ? "bg-yellow text-navy-950 shadow-[0_6px_18px_rgba(255,214,0,0.28)]"
          : "border border-white/10 bg-white/5 text-white/75 hover:border-yellow/40 hover:bg-white/10 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

export function AppointmentForm({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [area, setArea] = useState<(typeof AREAS)[number]>("Kanpur");
  const [issue, setIssue] = useState<(typeof ISSUES)[number]>("Switch");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const number = digitsOnly(mobile);
    if (!isValidMobile(number)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setError("");
    const message = `Namaste BijliBhai, appointment book karna hai. Mera number +91 ${number} hai. Area: ${area}. Problem: ${issue}. Please confirm.`;

    trackCta({
      event: "appointment_clicked",
      label: `Book appointment ${area}`,
      href: "/confirmation",
    });

    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    navigate("/confirmation");
  }

  return (
    <form
      id="book"
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-yellow/20 bg-navy-900/80 p-6 text-left text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-yellow/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-6 h-28 w-28 rounded-full bg-yellow/5 blur-3xl" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow">
          Book a visit
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-[1.75rem]">
          Get an electrician at your door
        </h2>
        <p className="mt-1.5 text-sm text-white/60">
          Share your number. We confirm time and labour price before the visit.
        </p>

        <label className="mt-6 block text-sm font-semibold text-white/85">
          Mobile number
          <div
            className={cn(
              "mt-2 flex items-center rounded-2xl border bg-navy-950/70 px-3 transition focus-within:border-yellow/50 focus-within:ring-4 focus-within:ring-yellow/15",
              error ? "border-red-400/80" : "border-white/10",
            )}
          >
            <span className="pr-2 text-sm font-semibold text-yellow">+91</span>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              name="mobile"
              value={mobile}
              onChange={(e) => {
                setMobile(digitsOnly(e.target.value));
                if (error) setError("");
              }}
              placeholder="98765 43210"
              className="h-12 w-full bg-transparent text-base font-medium tracking-wide text-white outline-none placeholder:text-white/30"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "mobile-error" : undefined}
            />
          </div>
        </label>
        {error ? (
          <p id="mobile-error" className="mt-2 text-sm font-medium text-red-300">
            {error}
          </p>
        ) : null}

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold text-white/85">Area</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {AREAS.map((option) => (
              <Pill
                key={option}
                active={area === option}
                onClick={() => setArea(option)}
              >
                {option}
              </Pill>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold text-white/85">
            What do you need?
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {ISSUES.map((option) => (
              <Pill
                key={option}
                active={issue === option}
                onClick={() => setIssue(option)}
              >
                {option}
              </Pill>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="mt-7 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl bg-yellow text-base font-bold text-navy-950 shadow-[0_12px_30px_rgba(255,214,0,0.35)] transition hover:-translate-y-0.5 hover:bg-yellow-400"
        >
          Confirm appointment
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/45">
          <ShieldCheck className="h-3.5 w-3.5 text-yellow" />
          No advance payment. Price shared before work starts.
        </p>
      </div>
    </form>
  );
}
