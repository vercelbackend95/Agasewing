import MapEmbed from "@/components/location/MapEmbed";

export function LocationMap() {
  const address = "4 Victoria Rd, Poole BH12 3BB, United Kingdom";
  const mapQuery = encodeURIComponent(address);
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <section id="location" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="flex items-center px-6 py-10 md:px-10 md:py-12">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                  Find our shop
                </h2>
                <div className="mt-5 space-y-1 text-slate-800">
                  <p className="text-xl font-semibold tracking-tight md:text-2xl">4 Victoria Rd</p>
                  <p className="text-lg font-medium md:text-xl">
                    Poole, <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-700">BH12 3BB</span>
                  </p>
                  <p className="text-base">United Kingdom</p>
                </div>
                <div className="mt-4 space-y-1 text-sm font-medium text-slate-700">
                  <p>Open: Mon–Wed 9–5 • Fri 9–5 • Sat 9–2</p>
                  <p>Closed: Thu &amp; Sun.</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">Walk-ins only</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">Near Upper Parkstone</span>
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">Parking nearby</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full bg-[rgba(255,74,1,1)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Get directions
                  </a>
                  <a
                    href="https://wa.me/447514776088"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-slate-300 bg-transparent px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    Message
                  </a>
                </div>
              </div>
            </div>
            <MapEmbed client:load />
          </div>
        </div>
      </div>
    </section>
  );
}
