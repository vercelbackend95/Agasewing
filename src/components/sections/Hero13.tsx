// src/components/sections/Hero13.tsx
import { Bell, PlayCircle } from "lucide-react";
import { useState } from "react";

import { AvatarCircles } from "@/components/ui/avatar-circles";
import { TextAnimate } from "@/registry/magicui/text-animate";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";

interface Hero13Props {
  className?: string;
}

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

const OPENING_HOURS: Record<number, { open: number; close: number } | null> = {
  0: null,
  1: { open: 9, close: 17 },
  2: { open: 9, close: 17 },
  3: { open: 9, close: 17 },
  4: null,
  5: { open: 9, close: 17 },
  6: { open: 9, close: 14 },
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
      return `🟢 Open now • Closes at ${formatHour(currentHours.close)}`;
    }

    if (currentTime < openAt) {
      return `🔴 Closed • Opens at ${formatHour(currentHours.open)}`;
    }
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = (day + offset) % 7;
    const nextHours = OPENING_HOURS[nextDay];

    if (!nextHours) {
      continue;
    }

    if (offset === 1) {
      return `🔴 Closed • Opens tomorrow ${formatHour(nextHours.open)}`;
    }

    return `🔴 Closed • Opens at ${formatHour(nextHours.open)}`;
  }

  return "🔴 Closed";
};

const Hero13 = ({ className }: Hero13Props) => {
  const openingStatus = getOpeningStatus();
  const [isHoursOpen, setIsHoursOpen] = useState(false);

  const openingHoursRows = [
    { day: "Monday", hours: "9am – 5pm" },
    { day: "Tuesday", hours: "9am – 5pm" },
    { day: "Wednesday", hours: "9am – 5pm" },
    { day: "Thursday", hours: "Closed" },
    { day: "Friday", hours: "9am – 5pm" },
    { day: "Saturday", hours: "9am – 2pm" },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <section id="hero" className={cn("relative overflow-hidden py-20 md:py-32", className)}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/agasewingclip.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 text-white">
        <div className="relative mb-4 inline-flex max-w-full items-center gap-2 rounded-full border px-2 py-1 text-sm font-normal lg:mb-10 lg:py-2 lg:pr-5 lg:pl-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(255,74,1,1)] text-white">
            <Bell className="size-4" />
          </span>
          <p className="truncate whitespace-nowrap">{openingStatus}</p>
          <button
            type="button"
            aria-expanded={isHoursOpen}
            aria-controls="opening-hours-bubble"
            onClick={() => setIsHoursOpen((prev) => !prev)}
            className="text-xs text-white/90 underline underline-offset-4 transition-opacity hover:opacity-90"
          >
            View opening times
          </button>

          {isHoursOpen ? (
            <div
              id="opening-hours-bubble"
              className="absolute top-[calc(100%+0.75rem)] left-0 z-20 w-[min(20rem,90vw)] rounded-2xl border border-white/30 bg-black/85 p-4 shadow-xl backdrop-blur-sm"
            >
              <p className="mb-2 text-sm font-semibold">Opening times</p>
              <ul className="space-y-1 text-xs text-white/90">
                {openingHoursRows.map(({ day, hours }) => (
                  <li key={day} className="flex items-center justify-between gap-4">
                    <span>{day}</span>
                    <span>{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <h1 className="mb-6 text-4xl leading-none font-bold tracking-tighter md:text-[7vw] lg:text-8xl">
          <TextAnimate animation="blurInUp" by="character" once>
            Sewing at Aga&apos;s
          </TextAnimate>
        </h1>

        <p className="max-w-2xl text-white/90 md:text-[2vw] lg:text-xl">
          <TextAnimate animation="blurInUp" by="word" once>
            Choosen by you, Fitted by me - Aga.
          </TextAnimate>
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:mt-10">
          <InteractiveHoverButton
            type="button"
            onClick={() => window.open("https://wa.me/447514776088", "_blank", "noopener,noreferrer")}
            className="w-full border-white/70 bg-white/90 text-sm text-black md:w-auto"
          >
            Message
          </InteractiveHoverButton>
          <a
            href="#gallery"
            className="inline-flex w-full items-center justify-center rounded-md border border-white/70 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/15 md:w-auto"
          >
            <PlayCircle className="mr-2 size-4" />
            See gallery
          </a>
        </div>

        <div className="mt-6">
          <AvatarCircles numPeople={99} avatarUrls={avatars} />
        </div>
      </div>
    </section>
  );
};

export { Hero13 };
