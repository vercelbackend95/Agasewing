// src/components/sections/TermsOfServiceSection.tsx
import { cn } from "@/lib/utils";

interface TermsOfServiceSectionProps {
  className?: string;
}

const TermsOfServiceSection = ({ className }: TermsOfServiceSectionProps) => {
  return (
    <section className={cn("py-16", className)}>
      <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Terms of Service</h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/90 md:text-base">
          <p>Last updated: 13 February 2026</p>
          <p>
            These Terms of Service (“Terms”) explain how Sewing At Aga’s (“we”, “us”, “our”) provides
            tailoring and alterations services to you (“you”, “customer”). By using our website,
            contacting us, or leaving items with us for work, you agree to these Terms.
          </p>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">1) About us</h2>
            <p>Business name: Sewing At Aga’s</p>
            <p>Address: 4 Victoria Rd, Poole BH12 3BB, United Kingdom</p>
            <p>Phone/WhatsApp: 07514 776088</p>
            <p>Email: sewingataga@gmail.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">2) Our services</h2>
            <p>
              We provide clothing alterations and tailoring services such as (examples): hems, waist
              adjustments, zip replacements, repairs, and related sewing work.
            </p>
            <p>
              Important reality check: tailoring is craftsmanship. Results depend on garment
              construction, fabric condition, previous alterations, and how the item fits on your
              body. We will always aim for the best possible outcome within the limits of the
              garment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">3) Walk-ins, enquiries, and availability</h2>
            <p>We operate on a walk-in basis unless we explicitly agree otherwise in writing.</p>
            <p>
              Any times or estimates we share are best-effort and may change due to workload,
              complexity, or garment condition discovered during work.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">4) Quotes and pricing</h2>
            <p>Prices may be shown on the website or discussed in person.</p>
            <p>Quotes are estimates based on what we can see at the time.</p>
            <p>
              If, after inspection, we discover extra complexity (e.g., hidden lining, damage,
              difficult fabric, previous work, pattern matching), we will tell you before we proceed
              with any additional charge.
            </p>
            <p>Unless stated otherwise, all prices are in GBP (£).</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">5) Payment</h2>
            <p>Payment is due when you drop off or when you collect, depending on what we agree.</p>
            <p>
              We may require a deposit for complex jobs, rush work, special materials, or high-value
              items.
            </p>
            <p>
              If you request extra work after the original agreement, the total price may increase.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">6) Fittings and customer responsibility</h2>
            <p>To get the best result, you agree that:</p>
            <p>You provide accurate instructions and confirm what you want (e.g., length, tightness, shape).</p>
            <p>You try the garment on when requested.</p>
            <p>
              You bring the right shoes/undergarments for hems (especially trousers, dresses,
              wedding/formalwear).
            </p>
            <p>You check the garment at collection and raise any concerns as soon as possible.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">7) Alterations are irreversible</h2>
            <p>Many alterations are permanent (cutting fabric, shortening, resewing seams).</p>
            <p>By approving the work, you accept that:</p>
            <p>returning the item to its original state may be impossible, and</p>
            <p>
              some fabrics may show needle marks, shine, or stress after seams are moved.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">8) Customer-supplied items &amp; condition of garments</h2>
            <p>You confirm that:</p>
            <p>you own the item or have permission to authorise work on it, and</p>
            <p>
              you disclose relevant issues (fabric weakness, previous repairs, stains, damage,
              fragile materials).
            </p>
            <p>
              We are not responsible for defects that exist before we touch the item (e.g., weakened
              fabric, dry rot, hidden tears) or issues that happen because the fabric cannot
              withstand alteration.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">9) Collection, storage, and unclaimed items</h2>
            <p>Please collect your items promptly once you are told they’re ready.</p>
            <p>
              We may store items for up to 90 days after the ready date (or last contact). After
              that, we may charge a reasonable storage fee.
            </p>
            <p>
              Items left uncollected for over 180 days may be treated as abandoned and may be
              disposed of or donated to recover storage space and costs. We will attempt to contact
              you using the details you provided before taking this step.
            </p>
            <p>
              (If chcesz, zmienimy te liczby na bardziej „soft” — ale miej jakąś granicę, bo inaczej
              będziesz magazynem.)
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">10) Rush work (express)</h2>
            <p>If you request rush/express service:</p>
            <p>a higher fee may apply,</p>
            <p>completion times are still estimates, and</p>
            <p>very complex garments may not be eligible for rush service.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">11) Changes, corrections, and complaints</h2>
            <p className="font-medium">A) If something isn’t right</p>
            <p>Tell us as soon as possible — ideally within 48 hours of collection.</p>
            <p className="font-medium">B) Fixes</p>
            <p>
              If the issue is clearly due to our workmanship (not wear, washing, fabric failure, or
              changed request), we will offer:
            </p>
            <p>an adjustment/rework where reasonable, or</p>
            <p>another fair remedy at our discretion.</p>
            <p className="font-medium">C) No “free remake” for changed mind</p>
            <p>
              If you change your mind (e.g., you now want it shorter/longer/tighter/looser than
              agreed), that is a new request and may require additional charges.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">12) Refund policy</h2>
            <p>
              Because alterations are bespoke and often irreversible, refunds are generally not
              available once work has started.
            </p>
            <p>
              If we accept that a serious fault is due to our workmanship and we cannot reasonably
              fix it, we may offer a partial or full refund depending on the situation.
            </p>
            <p>Nothing in these Terms limits your statutory rights under UK consumer law.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">13) Liability</h2>
            <p>We take care of your garments, but you agree that:</p>
            <p>
              Our total liability for any claim relating to a specific job is limited to the amount
              you paid for that job, unless the law requires otherwise.
            </p>
            <p>
              We are not liable for indirect losses (e.g., missed events, travel costs, loss of
              earnings).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">14) Website use</h2>
            <p>
              You agree not to misuse the website (e.g., hacking, spam, scraping, or uploading
              malicious content). We may restrict access if misuse occurs.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">15) Intellectual property</h2>
            <p>
              All content on the website (text, photos, logos, design) belongs to Sewing At Aga’s or
              its licensors. You may not copy or reuse it commercially without permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">16) Privacy</h2>
            <p>Your personal data is handled according to our Privacy Policy (available on our website).</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">17) Governing law</h2>
            <p>
              These Terms are governed by the laws of England and Wales, and disputes will be handled
              by the courts of England and Wales (unless consumer law requires otherwise).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">18) Changes to these Terms</h2>
            <p>
              We may update these Terms. The latest version will be published on our website with an
              updated date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { TermsOfServiceSection };
