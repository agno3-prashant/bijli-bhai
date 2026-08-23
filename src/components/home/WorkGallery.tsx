import { Camera } from "lucide-react";

import { Section } from "@/components/layout/Section";

const FUTURE_SLOTS = [
  "Fan installations",
  "MCB work",
  "Wiring",
  "Lighting",
  "Inverter work",
  "Switchboards",
] as const;

export function WorkGallery({
  photos = [],
}: {
  photos?: ReadonlyArray<{ src: string; alt: string; label: string }>;
}) {
  return (
    <Section className="bg-canvas">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-navy-600">
          Real work
        </p>
        <h2 className="section-title mt-2">BijliBhai at Work</h2>
        <p className="section-copy">
          Genuine job photos of fan, MCB, wiring, lighting and inverter work
          will appear here. We do not use stock or fabricated project images.
        </p>
      </div>

      {photos.length > 0 ? (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo) => (
            <li key={photo.src} className="overflow-hidden rounded-2xl bg-mist">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-40 w-full object-cover sm:h-48"
              />
              <p className="px-3 py-2 text-sm font-medium text-navy-700">
                {photo.label}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="surface-card mt-8 flex items-start gap-4 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-navy-600">
            <Camera className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <p className="font-semibold text-ink">Team photos coming next</p>
            <p className="mt-1 text-sm text-slate">
              Ready slots: {FUTURE_SLOTS.join(" · ")}.
            </p>
          </div>
        </div>
      )}
    </Section>
  );
}
