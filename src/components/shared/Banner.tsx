import { useState, useEffect } from "react";
import { FaFutbol, FaTrophy } from "react-icons/fa";

const TRICOLOR = "linear-gradient(90deg, #E4002B 0%, #E4002B 33%, #FFFFFF 33%, #FFFFFF 66%, #002868 66%, #002868 100%)";

type CountdownUnitProps = {
  value: number;
  label: string;
  pad?: boolean;
  variant?: "default" | "accent" | "live";
  animate?: boolean;
  compact?: boolean;
  hideLabel?: boolean;
};

const CountdownUnit = ({
  value,
  label,
  pad = true,
  variant = "default",
  animate = false,
  compact = false,
  hideLabel = false,
}: CountdownUnitProps) => {
  const display = pad ? value.toString().padStart(2, "0") : value.toString();

  const digitColor =
    variant === "accent"
      ? "text-[#00FF87]"
      : variant === "live"
        ? "text-[#FF6B8A]"
        : "text-white";

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className={`relative overflow-hidden rounded border border-white/10 bg-gradient-to-b from-[#162A52] to-[#08101F] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-4px_8px_rgba(0,0,0,0.4)] ${
          variant === "live" ? "shadow-[0_0_10px_rgba(255,107,138,0.15)]" : ""
        } ${compact ? "min-w-[26px]" : "min-w-[34px]"}`}
      >
        <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: TRICOLOR }} />
        <div className="absolute inset-x-0 top-1/2 z-10 h-px bg-black/60" />
        <div className={`relative flex items-center justify-center ${compact ? "px-1 py-0.5" : "px-2 py-1"}`}>
          <span
            key={display}
            className={`block font-mono font-black tabular-nums leading-none ${digitColor} ${
              compact ? "text-xs" : "text-lg"
            } ${animate ? "animate-countdownTick" : ""}`}
          >
            {display}
          </span>
        </div>
      </div>
      {!hideLabel && (
        <span className={`font-bold uppercase tracking-wider text-white/40 ${compact ? "text-[5px]" : "text-[7px]"}`}>
          {label}
        </span>
      )}
    </div>
  );
};

const CountdownColon = ({ compact = false, inline = false }: { compact?: boolean; inline?: boolean }) => (
  <span
    className={`animate-colonBlink font-black text-white/30 ${
      inline ? "text-[10px]" : compact ? "mb-2.5 text-[10px]" : "mb-2.5 text-base"
    }`}
  >
    :
  </span>
);

type CountdownProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  compact?: boolean;
  minimal?: boolean;
};

const Countdown = ({ days, hours, minutes, seconds, compact = false, minimal = false }: CountdownProps) => (
  <div
    className={`flex shrink-0 items-center ${
      minimal
        ? "gap-0.5"
        : `gap-2 rounded border border-white/10 bg-[#060D1A]/80 backdrop-blur-md ${compact ? "px-2 py-1" : "px-3 py-1.5"}`
    }`}
    style={minimal ? undefined : { boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}
  >
    {!compact && !minimal && <FaFutbol className="shrink-0 text-[#D4AF37]/80 text-xs" />}
    <div className={`flex items-center ${minimal ? "gap-px" : compact ? "gap-0.5" : "gap-1.5"}`}>
      <CountdownUnit value={days} label="D" pad={false} compact={compact || minimal} hideLabel={minimal} />
      <CountdownColon compact={compact} inline={minimal} />
      <CountdownUnit value={hours} label="H" compact={compact || minimal} hideLabel={minimal} />
      <CountdownColon compact={compact} inline={minimal} />
      <CountdownUnit value={minutes} label="M" variant="accent" compact={compact || minimal} hideLabel={minimal} />
      <CountdownColon compact={compact} inline={minimal} />
      <CountdownUnit value={seconds} label="S" variant="live" animate compact={compact || minimal} hideLabel={minimal} />
    </div>
  </div>
);

const PromoBadge = () => (
  <div
    className="relative overflow-hidden rounded bg-[#060D1A] px-4 py-1.5"
    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)" }}
  >
    <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: TRICOLOR }} />
    <div className="flex items-center gap-2">
      <FaTrophy className="shrink-0 text-sm text-[#D4AF37]" />
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-black uppercase italic tracking-wide text-white">FC 26</span>
        <span className="h-3 w-px bg-white/20" />
        <span
          className="rounded-sm bg-gradient-to-r from-[#E4002B] to-[#FF4D6D] px-1.5 py-px text-[10px] font-black uppercase text-white"
          style={{ boxShadow: "0 0 12px rgba(228,0,43,0.35)" }}
        >
          10% OFF
        </span>
      </div>
    </div>
  </div>
);

const CodeBadge = () => (
  <div className="relative overflow-hidden rounded border border-[#00FF87]/25 bg-[#060D1A]/90 px-4 py-1.5 backdrop-blur-sm">
    <div className="absolute inset-y-0 left-0 w-[3px]" style={{ background: TRICOLOR }} />
    <div className="flex items-center gap-2 pl-1">
      <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Código</span>
      <span
        className="text-sm font-black tracking-[0.15em] text-[#00FF87]"
        style={{ textShadow: "0 0 10px rgba(0,255,135,0.4)" }}
      >
        CHIO7
      </span>
    </div>
  </div>
);

const MobileOffBadge = () => (
  <span
    className="shrink-0 rounded-sm bg-gradient-to-r from-[#E4002B] to-[#FF4D6D] px-2 py-1 text-[11px] font-black uppercase text-white"
    style={{ boxShadow: "0 0 10px rgba(228,0,43,0.3)" }}
  >
    10% OFF
  </span>
);

const MobileCodeBadge = () => (
  <span
    className="shrink-0 font-black tracking-wider text-[#00FF87] text-xs"
    style={{ textShadow: "0 0 8px rgba(0,255,135,0.4)" }}
  >
    CHIO7
  </span>
);

export const Banner = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      setTimeLeft(difference > 0 ? difference : 0);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="relative isolate overflow-hidden bg-[#040A14]">
      {/* Franja tricolor superior */}
      <div className="h-[3px] w-full" style={{ background: TRICOLOR }} />

      {/* Fondo estadio */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(228,0,43,0.12)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(0,40,104,0.15)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,255,135,0.04)_0%,transparent_40%)]" />

      {/* Patrón hexagonal sutil */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "28px 49px",
        }}
      />

      {/* Luces de estadio */}
      <div className="absolute -top-8 left-[15%] h-24 w-48 rounded-full bg-white/[0.06] blur-3xl" />
      <div className="absolute -top-8 right-[15%] h-24 w-48 rounded-full bg-[#D4AF37]/[0.08] blur-3xl" />

      {/* Contenido */}
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-center gap-3 px-3 py-2 lg:gap-5 lg:px-6 lg:py-2.5">
        {/* Desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <PromoBadge />
          <CodeBadge />
          <div className="h-6 w-px bg-white/10" />
          <Countdown days={days} hours={hours} minutes={minutes} seconds={seconds} />
        </div>

        {/* Mobile: solo OFF + código + contador */}
        <div className="flex w-full flex-nowrap items-center justify-center gap-2 px-1 py-0.5 lg:hidden">
          <MobileOffBadge />
          <MobileCodeBadge />
          <Countdown days={days} hours={hours} minutes={minutes} seconds={seconds} compact minimal />
        </div>
      </div>

      {/* Franja tricolor inferior */}
      <div className="h-px w-full opacity-60" style={{ background: TRICOLOR }} />
    </div>
  );
};
