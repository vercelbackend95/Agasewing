import { useEffect, useState } from "react";

const CONSENT_KEY = "saas_cookie_consent";

const baseButtonClass =
  "inline-flex min-w-[120px] items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,74,1,0.45)] focus-visible:ring-offset-2";

export default function CookieConsent() {
  const [isReady, setIsReady] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mapsEnabled, setMapsEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedConsent = window.localStorage.getItem(CONSENT_KEY);
    if (savedConsent === "accepted") {
      setMapsEnabled(true);
    }
    setBannerVisible(savedConsent !== "accepted" && savedConsent !== "rejected");
    setIsReady(true);

    const handleOpenPreferences = () => {
      const latestConsent = window.localStorage.getItem(CONSENT_KEY);
      setMapsEnabled(latestConsent === "accepted");
      setModalOpen(true);
    };

    window.addEventListener("saas-open-cookie-preferences", handleOpenPreferences);
    return () => {
      window.removeEventListener("saas-open-cookie-preferences", handleOpenPreferences);
    };
  }, []);

  const updateConsent = (consent: "accepted" | "rejected") => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CONSENT_KEY, consent);
    setMapsEnabled(consent === "accepted");
    setBannerVisible(false);
    setModalOpen(false);
    window.dispatchEvent(new CustomEvent("saas-cookie-consent-changed"));
  };

  const openPreferences = () => {
    if (typeof window !== "undefined") {
      const latestConsent = window.localStorage.getItem(CONSENT_KEY);
      setMapsEnabled(latestConsent === "accepted");
    }
    setModalOpen(true);
  };

  const savePreferences = () => {
    updateConsent(mapsEnabled ? "accepted" : "rejected");
  };

  if (!isReady) {
    return null;
  }

  return (
    <>
      {bannerVisible ? (
        <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-2xl px-4 pb-4 md:pb-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:p-5">
            <h2 className="text-lg font-semibold text-slate-900">Cookies</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              We only use essential cookies by default. Google Maps is optional and will load only if you allow non-essential cookies.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => updateConsent("accepted")}
                className={`${baseButtonClass} border border-[rgba(255,74,1,1)] bg-[rgba(255,74,1,1)] text-white hover:opacity-90`}
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => updateConsent("rejected")}
                className={`${baseButtonClass} border border-slate-800 bg-slate-800 text-white hover:bg-slate-700`}
              >
                Reject
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="text-sm font-semibold text-slate-700 underline-offset-4 transition hover:text-slate-900 hover:underline"
              >
                Preferences
              </button>
              <a
                href="/cookie-policy"
                className="text-sm font-semibold text-slate-700 underline-offset-4 transition hover:text-slate-900 hover:underline"
              >
                Cookie Policy
              </a>
            </div>
          </section>
        </div>
      ) : null}

      {modalOpen ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/35 p-3 md:items-center" role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 id="cookie-preferences-title" className="text-lg font-semibold text-slate-900">
                  Cookie preferences
                </h3>
                <p className="mt-1 text-sm text-slate-600">Choose whether to enable optional Google Maps content.</p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Essential cookies</p>
                  <p className="text-xs text-slate-600">Required for basic website functionality.</p>
                </div>
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Always on</span>
              </div>

              <label className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Google Maps (embedded)</p>
                  <p className="text-xs text-slate-600">Enable embedded map in the location section.</p>
                </div>
                <input
                  type="checkbox"
                  checked={mapsEnabled}
                  onChange={(event) => setMapsEnabled(event.target.checked)}
                  className="h-5 w-5 accent-[rgba(255,74,1,1)]"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={savePreferences}
                className={`${baseButtonClass} border border-[rgba(255,74,1,1)] bg-[rgba(255,74,1,1)] text-white hover:opacity-90`}
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className={`${baseButtonClass} border border-slate-800 bg-slate-800 text-white hover:bg-slate-700`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
