import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Emily Carter",
    role: "Bridesmaid dress alteration",
    content:
      "Aga shortened and reshaped my dress perfectly. Great communication and a very quick turnaround.",
  },
  {
    name: "Sophie Wilson",
    role: "Trousers tapering",
    content:
      "The fit is now exactly how I wanted. Clean finish, fair price, and super friendly service.",
  },
  {
    name: "Rachel Turner",
    role: "Wedding dress adjustments",
    content:
      "I felt fully looked after before my wedding day. Every detail was done with care and precision.",
  },
  {
    name: "Olivia Brown",
    role: "Curtains hemming",
    content:
      "Lovely quality work and everything was ready on time. I will definitely come back.",
  },
];

interface Testimonial7Props {
  className?: string;
}

const Testimonial7 = ({ className }: Testimonial7Props) => {
  return (
    <section className={cn("py-20 md:py-24", className)} id="reviews">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Client Reviews</h2>
          <p className="mt-3 text-neutral-600">Kind words from customers in and around Aberdeen.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-neutral-700">“{testimonial.content}”</p>
              <div className="mt-4">
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-neutral-500">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Testimonial7 };
