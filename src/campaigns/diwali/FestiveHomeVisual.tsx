const SCENES = {
  home: {
    title: "Campaign illustration of a home with warm decorative lights",
    caption: "Ghar / terrace festive lighting — campaign visual, not a job photo.",
  },
  balcony: {
    title: "Campaign illustration of balcony fairy lights",
    caption: "Apartment balcony lighting — campaign visual, not a job photo.",
  },
  shop: {
    title: "Campaign illustration of a shopfront with decorative lights",
    caption: "Dukaan / shopfront lighting — campaign visual, not a job photo.",
  },
  install: {
    title: "Campaign illustration of safe decorative-light installation",
    caption: "Safe install process — campaign visual, not a customer project.",
  },
} as const;

function SceneArt({ variant }: { variant: keyof typeof SCENES }) {
  if (variant === "balcony") {
    return (
      <>
        <rect width="480" height="320" fill="#07182C" />
        <rect x="48" y="56" width="384" height="220" rx="10" fill="#12263d" />
        <rect x="72" y="80" width="150" height="120" rx="4" fill="#FDE245" opacity="0.16" />
        <rect x="258" y="80" width="150" height="120" rx="4" fill="#FDE245" opacity="0.16" />
        <path d="M72 210 H408" stroke="#F4B942" strokeWidth="3" />
        {[90, 140, 190, 240, 290, 340, 380].map((x) => (
          <circle key={x} cx={x} cy="210" r="5" className="diwali-twinkle" fill="#FDE245" />
        ))}
      </>
    );
  }

  if (variant === "shop") {
    return (
      <>
        <rect width="480" height="320" fill="#07182C" />
        <rect x="70" y="90" width="340" height="180" fill="#1a3350" />
        <rect x="96" y="118" width="288" height="88" fill="#FDE245" opacity="0.14" />
        <path d="M80 90 H400" stroke="#F4B942" strokeWidth="6" />
        {[110, 160, 210, 260, 310, 360].map((x) => (
          <circle key={x} cx={x} cy="90" r="6" className="diwali-twinkle" fill="#FDE245" />
        ))}
        <rect x="214" y="210" width="52" height="60" fill="#07182C" />
      </>
    );
  }

  if (variant === "install") {
    return (
      <>
        <rect width="480" height="320" fill="#07182C" />
        <rect x="0" y="230" width="480" height="90" fill="#0a1c32" />
        <rect x="160" y="120" width="88" height="110" rx="8" fill="#FDE245" />
        <rect x="176" y="136" width="56" height="36" rx="3" fill="#07182C" />
        <path d="M248 148 H360" stroke="#F4B942" strokeWidth="3" />
        {[270, 310, 350].map((x) => (
          <circle key={x} cx={x} cy="148" r="5" className="diwali-twinkle" fill="#FDE245" />
        ))}
        <rect x="300" y="188" width="70" height="42" rx="6" fill="#12263d" />
      </>
    );
  }

  return (
    <>
      <rect width="480" height="420" fill="#07182C" />
      <rect x="0" y="300" width="480" height="120" fill="#0a1c32" />
      <path d="M70 300 V168 H410 V300" fill="#12263d" />
      <path d="M54 176 L240 72 L426 176 Z" fill="#1a3350" />
      <rect x="206" y="236" width="68" height="64" rx="4" fill="#07182C" />
      <rect x="108" y="196" width="58" height="48" rx="3" fill="#FDE245" opacity="0.22" />
      <rect x="314" y="196" width="58" height="48" rx="3" fill="#FDE245" opacity="0.22" />
      <path
        d="M86 168 Q160 128 240 168 Q320 208 394 168"
        fill="none"
        stroke="#F4B942"
        strokeWidth="3"
      />
      <path
        d="M100 300 Q190 250 240 300 Q300 348 380 300"
        fill="none"
        stroke="#FDE245"
        strokeWidth="2.5"
      />
      {[
        [110, 156],
        [160, 148],
        [210, 162],
        [260, 176],
        [310, 164],
        [360, 154],
        [130, 286],
        [190, 268],
        [250, 292],
        [310, 318],
        [360, 292],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" className="diwali-twinkle" fill="#FDE245" />
      ))}
    </>
  );
}

export function FestiveHomeVisual({
  variant = "home",
  compact = false,
}: {
  variant?: keyof typeof SCENES;
  compact?: boolean;
}) {
  const scene = SCENES[variant];

  return (
    <figure className="diwali-glow relative overflow-hidden rounded-[1.6rem] border border-[#F4B942]/30 bg-[#0b2238]">
      <div
        className={
          compact
            ? "max-h-[200px] overflow-hidden sm:max-h-[240px] lg:max-h-none"
            : undefined
        }
      >
      <svg
        viewBox={variant === "home" ? "0 0 480 420" : "0 0 480 320"}
        className="h-auto w-full"
        role="img"
      >
        <title>{scene.title}</title>
        <SceneArt variant={variant} />
      </svg>
      </div>
      <figcaption className="px-4 py-3 text-xs leading-relaxed text-[#FFF8E7]/65">
        {scene.caption}
      </figcaption>
    </figure>
  );
}

export const GALLERY_SCENES = ["home", "balcony", "shop", "install"] as const;
