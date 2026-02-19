import { useEffect, useState } from "react";

const CONSENT_KEY = "saas_cookie_consent";
const ADDRESS = "4 Victoria Rd, Poole BH12 3BB, United Kingdom";
const MAP_QUERY = encodeURIComponent(ADDRESS);
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export default function MapEmbed() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const syncConsent = () => {
      setHasConsent(window.localStorage.getItem(CONSENT_KEY) === "accepted");
    };

    syncConsent();
    window.addEventListener("saas-cookie-consent-changed", syncConsent);

    return () => {
      window.removeEventListener("saas-cookie-consent-changed", syncConsent);
    };
  }, []);

  const openPreferences = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.dispatchEvent(new CustomEvent("saas-open-cookie-preferences"));
  };

  if (hasConsent) {
    return (
      <div className="min-h-[360px] md:min-h-[420px]">
        <iframe
          title="Google map showing 4 Victoria Rd, Poole BH12 3BB, United Kingdom"
          src={MAP_EMBED_SRC}
          width="100%"
          height="100%"
          className="h-full w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="min-h-[360px] md:min-h-[420px]">
      <div className="flex h-full min-h-[360px] flex-col justify-center rounded-none bg-slate-50 p-6 md:min-h-[420px] md:p-8">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Map disabled</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-700">
          Google Maps is disabled until you allow non-essential cookies.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={openPreferences}
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
          >
            Cookie settings
          </button>
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-[rgba(255,74,1,1)] bg-[rgba(255,74,1,1)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
