export function LocationMap() {
  const address = "4 Victoria Rd, Poole BH12 3BB, United Kingdom";
  const mapQuery = encodeURIComponent(address);

  return (
    <section id="location" className="bg-slate-100 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Find us
        </h2>
        <p className="mt-3 text-center text-slate-600">{address}</p>
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <iframe
            title="Google map showing 4 Victoria Rd, Poole BH12 3BB, United Kingdom"
            src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
