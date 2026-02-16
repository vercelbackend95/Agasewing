export function LocationMap() {
  const address = "4 Victoria Rd, Poole BH12 3BB, United Kingdom";
  const mapQuery = encodeURIComponent(address);

  return (
    <section id="location" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="flex items-center px-6 py-10 md:px-10 md:py-12">
              <div>
                <h2 className="text-4xl font-bold uppercase tracking-tight text-slate-900 md:text-5xl">
                  Find us
                </h2>
                <p className="mt-5 text-xl font-semibold uppercase leading-relaxed tracking-tight text-slate-800 md:text-2xl">
                  {address}
                </p>
              </div>
            </div>
            <div className="min-h-[360px] md:min-h-[420px]">
              <iframe
                title="Google map showing 4 Victoria Rd, Poole BH12 3BB, United Kingdom"
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                className="h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
