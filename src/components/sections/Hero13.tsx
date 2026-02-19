// src/components/sections/Hero13.tsx
import { PlayCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { AvatarCircles } from "@/components/ui/avatar-circles";
import { TextAnimate } from "@/registry/magicui/text-animate";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";

interface Hero13Props {
  className?: string;
}

const avatars = [
  { imageUrl: "https://avatars.githubusercontent.com/u/16860528", profileUrl: "https://github.com/dillionverma" },
  { imageUrl: "https://avatars.githubusercontent.com/u/20110627", profileUrl: "https://github.com/tomonarifeehan" },
  { imageUrl: "https://avatars.githubusercontent.com/u/106103625", profileUrl: "https://github.com/BankkRoll" },
  { imageUrl: "https://avatars.githubusercontent.com/u/59228569", profileUrl: "https://github.com/safethecode" },
  { imageUrl: "https://avatars.githubusercontent.com/u/59442788", profileUrl: "https://github.com/sanjay-mali" },
  { imageUrl: "https://avatars.githubusercontent.com/u/89768406", profileUrl: "https://github.com/itsarghyadas" },
];

const OPENING_HOURS: Record<number, { open: number; close: number } | null> = {
  0: null, // Sun
  1: { open: 9, close: 17 }, // Mon
  2: { open: 9, close: 17 }, // Tue
  3: { open: 9, close: 17 }, // Wed
  4: null, // Thu
  5: { open: 9, close: 17 }, // Fri
  6: { open: 9, close: 14 }, // Sat
};

const formatHour = (hour: number) => {
  const period = hour >= 12 ? "pm" : "am";
  const twelveHour = hour % 12 || 12;
  return `${twelveHour}${period}`;
};

const getLondonNow = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return { day: dayMap[weekday] ?? 1, hour, minute };
};

const getOpeningStatus = () => {
  const { day, hour, minute } = getLondonNow();
  const currentHours = OPENING_HOURS[day];
  const currentTime = hour * 60 + minute;

  if (currentHours) {
    const openAt = currentHours.open * 60;
    const closeAt = currentHours.close * 60;

    if (currentTime >= openAt && currentTime < closeAt) {
      return `Open now • Closes at ${formatHour(currentHours.close)}`;
    }
    if (currentTime < openAt) {
      return `Closed • Opens at ${formatHour(currentHours.open)}`;
    }
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = (day + offset) % 7;
    const nextHours = OPENING_HOURS[nextDay];
    if (!nextHours) continue;

    if (offset === 1) return `Closed • Opens tomorrow ${formatHour(nextHours.open)}`;
    return `Closed • Opens at ${formatHour(nextHours.open)}`;
  }

  return "Closed";
};

const getOpeningInsight = () => {
  const { day, hour, minute } = getLondonNow();
  const currentHours = OPENING_HOURS[day];
  const currentTime = hour * 60 + minute;

  if (currentHours) {
    const openAt = currentHours.open * 60;
    const closeAt = currentHours.close * 60;

    if (currentTime >= openAt && currentTime < closeAt) return `Open now — closes ${formatHour(currentHours.close)}`;
    if (currentTime < openAt) return `Closed now — opens ${formatHour(currentHours.open)}`;
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = (day + offset) % 7;
    const nextHours = OPENING_HOURS[nextDay];
    if (nextHours) return `Closed now — opens ${formatHour(nextHours.open)}`;
  }

  return "Closed";
};

const Hero13 = ({ className }: Hero13Props) => {
  const [isHoursOpen, setIsHoursOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Compute live strings on render (cheap) and memoize rows (static)
  const openingStatus = getOpeningStatus();
  const openingInsight = getOpeningInsight();
  const isOpenNow = openingStatus.includes("Open now");
  const { day: todayIndex } = getLondonNow();

  const openingHoursRows = useMemo(
    () => [
      { index: 1, day: "Monday", hours: "9am – 5pm" },
      { index: 2, day: "Tuesday", hours: "9am – 5pm" },
      { index: 3, day: "Wednesday", hours: "9am – 5pm" },
      { index: 4, day: "Thursday", hours: "Closed" },
      { index: 5, day: "Friday", hours: "9am – 5pm" },
      { index: 6, day: "Saturday", hours: "9am – 2pm" },
      { index: 0, day: "Sunday", hours: "Closed" },
    ],
    [],
  );

  // Force playback on mobile browsers that ignore the initial autoplay.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.autoplay = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("loop", "");

    const ensurePlayback = () => {
            if (document.hidden) return;

      if (video.ended) {
        video.currentTime = 0;
      }


      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Some mobile browsers require a user gesture; this is retried on visibility/touch events below.
        });
      }
    };

    ensurePlayback();

    const onCanPlay = () => {
      if (video.paused) ensurePlayback();
    };

    const onVisibilityChange = () => {
      if (!document.hidden && video.paused) ensurePlayback();
    };

    const onUserGesture = () => {
      if (video.paused) ensurePlayback();
    };

    video.addEventListener("canplay", onCanPlay);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("touchstart", onUserGesture, { passive: true });
    window.addEventListener("focus", onUserGesture);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("touchstart", onUserGesture);
      window.removeEventListener("focus", onUserGesture);
    };
  }, []);

  // Lock background scroll on mobile when sheet is open
  useEffect(() => {
    if (!isHoursOpen) return;

    document.documentElement.classList.add("sheet-open");
    document.body.classList.add("sheet-open");

    return () => {
      document.documentElement.classList.remove("sheet-open");
      document.body.classList.remove("sheet-open");
    };
  }, [isHoursOpen]);

  // Close on Escape (nice UX)
  useEffect(() => {
    if (!isHoursOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsHoursOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isHoursOpen]);

  return (
    <section id="hero" className={cn("relative overflow-visible py-20 md:overflow-hidden md:py-32", className)}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
      >
        <source src="/agasewingclip.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 text-white">
        {/* STATUS PILL */}
        <div className="relative mb-4 inline-flex max-w-full items-center gap-2 rounded-full border px-2 py-1 text-sm font-normal lg:mb-10 lg:px-5 lg:py-2">
          <span
            className={cn(
              "inline-block h-2.5 w-2.5 rounded-full",
              isOpenNow ? "bg-emerald-400" : "bg-red-500",
            )}
            aria-hidden="true"
          />
          <p className="truncate whitespace-nowrap">{openingStatus}</p>

          {/* Desktop popover can stay if you want; mobile uses sheet */}
          <button
            type="button"
            aria-expanded={isHoursOpen}
            aria-controls="opening-hours-panel"
            onClick={() => setIsHoursOpen((prev) => !prev)}
            className="text-xs text-white/90 underline underline-offset-4 transition-opacity hover:opacity-90"
          >
            View opening times
          </button>

          {/* Desktop POPOVER */}
          <div
            id="opening-hours-panel"
            className={cn(
              "hidden md:block",
              "absolute left-0 top-[calc(100%+0.75rem)] z-20 w-[min(22rem,92vw)] rounded-2xl border border-white/35 bg-white/14 p-4 text-white backdrop-blur-md shadow-[0_20px_45px_rgba(0,0,0,0.35)]",
              "origin-top-left transform-gpu transition-all duration-150 ease-out",
              isHoursOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
            )}
          >
            <div className="absolute -top-1.5 left-6 h-3 w-3 rotate-45 border-l border-t border-white/35 bg-white/14" aria-hidden="true" />
            <p className="text-sm font-semibold">Opening times</p>
            <p className="mb-3 mt-1 text-xs text-white/90">{openingInsight}</p>

            <div className="space-y-1.5 text-xs">
              {openingHoursRows.map(({ index, day, hours }) => (
                <div
                  key={day}
                  className={cn(
                    "grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg px-2.5 py-1.5",
                    index === todayIndex && "bg-[rgba(255,74,1,0.10)]",
                  )}
                >
                  <span className="text-white/95">{day}</span>
                  {hours === "Closed" ? (
                    <span className="rounded-full border border-white/35 bg-white/15 px-2 py-0.5 text-[11px] font-medium tracking-wide text-white">
                      Closed
                    </span>
                  ) : (
                    <span className="text-white/90">{hours}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HERO TEXT */}
        <h1 className="mb-6 text-[2.7rem] font-bold leading-none tracking-tighter text-[rgba(255,74,1,1)] md:text-[7vw] lg:text-8xl">
          <TextAnimate animation="blurInUp" by="character" once>
            Sewing at Aga&apos;s
          </TextAnimate>
        </h1>

        <p className="max-w-2xl text-white/90 md:text-[2vw] lg:text-xl">
          <TextAnimate animation="blurInUp" by="word" once>
            Chosen by you, fitted by me - Aga.
          </TextAnimate>
        </p>

        <p className="mt-4 text-sm text-white/95 md:text-base">
          Walk-ins for fittings • No booking needed • 30+ years’ experience
        </p>

        <div className="mt-6 flex flex-row items-start gap-3 sm:gap-4 lg:mt-10">
          <InteractiveHoverButton
            type="button"
            onClick={() => window.open("https://wa.me/447514776088", "_blank", "noopener,noreferrer")}
            mobileActive
            className="order-1 self-start border-white/70 bg-white/90 px-7 py-2.5 text-base text-black sm:order-1 sm:text-sm"
          >
            Message
          </InteractiveHoverButton>

          <a
            href="#gallery"
            className="order-2 inline-flex self-start items-center justify-center rounded-md border border-white/70 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/15 sm:order-2"
          >
            <PlayCircle className="mr-2 size-4" />
            See gallery
          </a>
        </div>

        <div className="mt-6">
          <AvatarCircles numPeople={99} avatarUrls={avatars} />
        </div>
      </div>

      {/* =========================
          MOBILE-ONLY BOTTOM SHEET
          (rendered outside the pill to avoid stacking-context issues)
         ========================= */}

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[9998] bg-black/55 backdrop-blur-[2px] transition-opacity duration-200 md:hidden",
          isHoursOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
        onClick={() => setIsHoursOpen(false)}
      />

      {/* Sheet */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-[9999] rounded-t-3xl border border-white/20 bg-[#0e0e0e] p-5 text-white shadow-[0_-20px_50px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out md:hidden",
          isHoursOpen ? "translate-y-0" : "translate-y-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Opening times"
      >
        {/* Handle */}
        <button
          type="button"
          aria-label="Close opening times"
          className="mx-auto mb-4 block h-1.5 w-12 rounded-full bg-white/30"
          onClick={() => setIsHoursOpen(false)}
        />

        <p className="text-sm font-semibold">Opening times</p>
        <p className="mb-3 mt-1 text-xs text-white/90">{openingInsight}</p>

        <div className="space-y-1.5 text-xs">
          {openingHoursRows.map(({ index, day, hours }) => (
            <div
              key={day}
              className={cn(
                "grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg px-2.5 py-1.5",
                index === todayIndex && "bg-[rgba(255,74,1,0.10)]",
              )}
            >
              <span className="text-white/95">{day}</span>
              {hours === "Closed" ? (
                <span className="rounded-full border border-white/35 bg-white/15 px-2 py-0.5 text-[11px] font-medium tracking-wide text-white">
                  Closed
                </span>
              ) : (
                <span className="text-white/90">{hours}</span>
              )}
            </div>
          ))}
        </div>

        {/* Small actions */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href="tel:+447514776088"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium"
          >
            Call
          </a>
          <button
            type="button"
            onClick={() => setIsHoursOpen(false)}
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black"
          >
            Done
          </button>
        </div>
      </div>
    </section>
  );
};

export { Hero13 };
