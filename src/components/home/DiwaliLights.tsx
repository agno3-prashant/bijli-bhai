import { Lightbulb, Plug, Sparkles, Zap } from "lucide-react";

import { CallCta, WhatsAppCta } from "@/components/cta/CtaLinks";
import { Section } from "@/components/layout/Section";
import { DIWALI_WHATSAPP_HREF } from "@/lib/contact";

const JOBS = [
  {
    icon: Sparkles,
    title: "Jhalar / fairy lights",
    text: "Ghar, balcony, gate, terrace — jhalar seedha aur safe lagwana.",
  },
  {
    icon: Lightbulb,
    title: "Lights theek karo",
    text: "Blink, fuse, half-strip dead, connector loose — festival se pehle fix.",
  },
  {
    icon: Plug,
    title: "Extra point",
    text: "Decoration ke liye naya power point, overload se bachao.",
  },
  {
    icon: Zap,
    title: "Safe wiring check",
    text: "Zyada lights = extra load. Short / trip ka doubt ho to pehle check.",
  },
] as const;

export function DiwaliLights() {
  return (
    <Section id="diwali" className="relative overflow-hidden bg-navy-950 text-white">
      <div className="diwali-string" aria-hidden />
      <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-yellow/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-yellow/10 blur-3xl" />

      <div className="relative">
        <p className="inline-flex rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow">
          Diwali special · Kanpur • Shuklaganj • Unnao
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-[1.75rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
          Diwali pe ghar chamkana hai?
          <span className="mt-1 block text-yellow">Jhalar Bhai lagayega.</span>
        </h2>
        <p className="section-copy max-w-2xl text-white/70">
          Festival of lights, lekin bijli ka jugaad nahi. Decoration lights,
          jhalar, balcony lighting, extra point ya jo lights fuse ho gayi —
          safe fitting, clear labour, doorstep.
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {JOBS.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow text-navy-950">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="font-display text-base font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/65">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-white/55">
          Labour Light / extra-point rates se start. Jhalar-lights material alag
          ho sakta hai. Sparking ho to touch mat karo — Bhai ko bulao.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <CallCta />
          <WhatsAppCta href={DIWALI_WHATSAPP_HREF} label="Diwali WhatsApp">
            Diwali Lights WhatsApp
          </WhatsAppCta>
        </div>
      </div>
    </Section>
  );
}
