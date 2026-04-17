"use client";

import { memo } from "react";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// Each zodiac sign as a minimal, elegant SVG path inspired by the actual constellation/symbol

export const AriesIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 8 C12 8 8 4 4 6 C2 7 2 10 4 11 C6 12 8 10 8 8" />
    <path d="M12 8 C12 8 16 4 20 6 C22 7 22 10 20 11 C18 12 16 10 16 8" />
    <line x1="12" y1="8" x2="12" y2="20" />
    <circle cx="8" cy="7" r="0.8" fill={color} />
    <circle cx="16" cy="7" r="0.8" fill={color} />
  </svg>
));
AriesIcon.displayName = "AriesIcon";

export const TaurusIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="14" r="5" />
    <path d="M7 11 C7 11 6 7 4 6 C3 5.5 2 6 2 7" />
    <path d="M17 11 C17 11 18 7 20 6 C21 5.5 22 6 22 7" />
    <path d="M4 7 C6 8 9 9 12 9 C15 9 18 8 20 7" />
  </svg>
));
TaurusIcon.displayName = "TaurusIcon";

export const GeminiIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="8" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="16" y2="21" />
    <path d="M4 6 C6 5 10 4 12 4 C14 4 18 5 20 6" />
    <path d="M4 18 C6 19 10 20 12 20 C14 20 18 19 20 18" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
));
GeminiIcon.displayName = "GeminiIcon";

export const CancerIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12 C5 8 8 5 12 5 C16 5 18 8 18 10 C18 12 16 13 14 12 C12 11 11 9 12 7" />
    <path d="M19 12 C19 16 16 19 12 19 C8 19 6 16 6 14 C6 12 8 11 10 12 C12 13 13 15 12 17" />
    <circle cx="5.5" cy="8.5" r="1" fill={color} stroke="none" />
    <circle cx="18.5" cy="15.5" r="1" fill={color} stroke="none" />
  </svg>
));
CancerIcon.displayName = "CancerIcon";

export const LeoIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="7" r="3" />
    <path d="M12 7 C14 7 17 8 18 11 C19 14 18 17 17 18 C16 19 15 19 15 19" />
    <path d="M15 19 C15 19 14 21 16 21 C18 21 19 19 18 17" />
    <line x1="6" y1="7" x2="6" y2="10" />
  </svg>
));
LeoIcon.displayName = "LeoIcon";

export const VirgoIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="6" y1="3" x2="6" y2="17" />
    <line x1="11" y1="3" x2="11" y2="17" />
    <path d="M6 9 C8 7 11 7 11 9" />
    <path d="M11 7 C13 5 18 6 18 10 C18 14 16 17 14 17 C13 17 12 16 12 15 C12 14 13 14 14 14" />
    <path d="M14 17 C14 19 16 20 17 19" />
  </svg>
));
VirgoIcon.displayName = "VirgoIcon";

export const LibraIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="19" x2="20" y2="19" />
    <line x1="12" y1="19" x2="12" y2="15" />
    <path d="M6 15 C6 12 8 10 12 10 C16 10 18 12 18 15" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <circle cx="12" cy="7" r="2" />
  </svg>
));
LibraIcon.displayName = "LibraIcon";

export const ScorpioIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="3" x2="5" y2="16" />
    <line x1="10" y1="3" x2="10" y2="16" />
    <path d="M5 9 C7 7 10 7 10 9" />
    <path d="M10 3 C12 3 15 4 15 8 C15 12 13 15 11 16 C10.5 16 10 16 10 16" />
    <path d="M15 14 C17 13 19 14 19 16 C19 18 18 19 17 21 C16.5 21.5 15 21 15 20 L17 18" />
  </svg>
));
ScorpioIcon.displayName = "ScorpioIcon";

export const SagittariusIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="20" x2="20" y2="4" />
    <path d="M14 4 L20 4 L20 10" />
    <line x1="6" y1="12" x2="12" y2="18" />
  </svg>
));
SagittariusIcon.displayName = "SagittariusIcon";

export const CapricornIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 5 C5 5 5 12 8 14 C10 15 12 14 12 14" />
    <path d="M5 14 C5 17 7 19 10 20 C14 21 17 19 18 16 C19 13 18 11 17 10" />
    <path d="M12 3 C14 3 17 5 17 8 C17 10 15 11 14 10 C13 9 13 8 14 7" />
    <path d="M17 10 C19 10 21 11 21 14 C21 17 19 19 17 19" />
  </svg>
));
CapricornIcon.displayName = "CapricornIcon";

export const AquariusIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 9 C4 7 6 11 8 9 C10 7 12 11 14 9 C16 7 18 11 20 9 C21 8 22 8.5 22 9" />
    <path d="M2 15 C4 13 6 17 8 15 C10 13 12 17 14 15 C16 13 18 17 20 15 C21 14 22 14.5 22 15" />
  </svg>
));
AquariusIcon.displayName = "AquariusIcon";

export const PiscesIcon = memo(({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4 C5 4 3 8 4 12 C5 16 7 18 8 20" />
    <path d="M19 4 C19 4 21 8 20 12 C19 16 17 18 16 20" />
    <line x1="5" y1="12" x2="19" y2="12" />
    <path d="M6 4 C10 3 14 3 18 4" />
    <path d="M6 20 C10 21 14 21 18 20" />
  </svg>
));
PiscesIcon.displayName = "PiscesIcon";

// Map for easy lookup
export const ZODIAC_ICONS: Record<string, React.ComponentType<IconProps>> = {
  Aries: AriesIcon,
  Taurus: TaurusIcon,
  Gemini: GeminiIcon,
  Cancer: CancerIcon,
  Leo: LeoIcon,
  Virgo: VirgoIcon,
  Libra: LibraIcon,
  Scorpio: ScorpioIcon,
  Sagittarius: SagittariusIcon,
  Capricorn: CapricornIcon,
  Aquarius: AquariusIcon,
  Pisces: PiscesIcon,
};

// Planet SVG icons
export const SunIcon = ({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
  </svg>
);

export const MoonIcon = ({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const StarIcon = ({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const OrbIcon = ({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="4" ry="9" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);

export const CrosshairIcon = ({ size = 24, color = "currentColor", strokeWidth = 1.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="7" />
    <line x1="12" y1="3" x2="12" y2="7" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <line x1="3" y1="12" x2="7" y2="12" />
    <line x1="17" y1="12" x2="21" y2="12" />
  </svg>
);

// Decorative SVG spark/diamond for replacing ✦
export const SparkIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} aria-hidden="true">
    <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
  </svg>
);

// Constellation dot cluster (decorative)
export const ConstellationIcon = ({ size = 40, color = "currentColor", strokeWidth = 1 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth={strokeWidth} aria-hidden="true">
    <circle cx="8" cy="8" r="2" fill={color} opacity="0.9" />
    <circle cx="32" cy="12" r="1.5" fill={color} opacity="0.7" />
    <circle cx="20" cy="20" r="2.5" fill={color} opacity="1" />
    <circle cx="10" cy="30" r="1.5" fill={color} opacity="0.6" />
    <circle cx="34" cy="30" r="2" fill={color} opacity="0.8" />
    <line x1="8" y1="8" x2="20" y2="20" opacity="0.4" />
    <line x1="32" y1="12" x2="20" y2="20" opacity="0.4" />
    <line x1="20" y1="20" x2="10" y2="30" opacity="0.4" />
    <line x1="20" y1="20" x2="34" y2="30" opacity="0.4" />
  </svg>
);
