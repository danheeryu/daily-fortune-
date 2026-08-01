import { detectFortuneMood, type FortuneMood } from "@/lib/fortuneMood";

function SparkleIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="#a97c3f">
      <path d="M32 4 L38 26 L60 32 L38 38 L32 60 L26 38 L4 32 L26 26 Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="#a97c3f">
      <path d="M32 54 C10 40 4 27 4 17 C4 8 11 2 19 2 C25 2 30 6 32 12 C34 6 39 2 45 2 C53 2 60 8 60 17 C60 27 54 40 32 54 Z" />
    </svg>
  );
}

function CoinIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      <circle cx="32" cy="32" r="28" fill="#d9b877" stroke="#6b4423" strokeWidth="3" />
      <circle cx="32" cy="32" r="18" fill="none" stroke="#6b4423" strokeWidth="2" />
      <text
        x="32"
        y="39"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill="#4a2f12"
      >
        ₩
      </text>
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="#a97c3f">
      <path d="M12 52 C12 30 26 8 52 6 C54 32 36 50 12 52 Z" />
      <path
        d="M14 50 C24 40 34 30 48 12"
        stroke="#4a2f12"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-14 w-14"
      fill="none"
      stroke="#a97c3f"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 8 h24 v14 a12 12 0 0 1 -24 0 Z" fill="#d9b877" />
      <path d="M20 12 h-8 a2 2 0 0 0 -2 2 v2 a10 10 0 0 0 10 10" />
      <path d="M44 12 h8 a2 2 0 0 1 2 2 v2 a10 10 0 0 1 -10 10" />
      <path d="M32 34 v10" />
      <path d="M22 54 h20" />
      <path d="M26 44 h12 l2 10 h-16 Z" fill="#d9b877" />
    </svg>
  );
}

function CalmIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="#a97c3f">
      <path d="M40 6 A22 22 0 1 0 40 58 A26 26 0 0 1 40 6 Z" />
      <circle cx="50" cy="14" r="2.5" />
      <circle cx="56" cy="24" r="1.8" />
    </svg>
  );
}

function AdventureIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-14 w-14"
      fill="none"
      stroke="#a97c3f"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M32 4 C42 12 46 26 42 40 L22 40 C18 26 22 12 32 4 Z" fill="#d9b877" />
      <circle cx="32" cy="22" r="4" fill="#4a2f12" stroke="none" />
      <path d="M22 40 L14 50 L24 46 Z" fill="#6b4423" stroke="none" />
      <path d="M42 40 L50 50 L40 46 Z" fill="#6b4423" stroke="none" />
      <path d="M28 40 L26 58 M36 40 L38 58" />
    </svg>
  );
}

const ICONS: Record<FortuneMood, () => React.ReactElement> = {
  love: HeartIcon,
  money: CoinIcon,
  health: LeafIcon,
  achievement: TrophyIcon,
  calm: CalmIcon,
  adventure: AdventureIcon,
  default: SparkleIcon,
};

export default function FortuneIllustration({ fortune }: { fortune: string }) {
  const mood = detectFortuneMood(fortune);
  const Icon = ICONS[mood];
  return <Icon />;
}
