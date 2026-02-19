// src/components/sections/Contact16.tsx
import { useState, type FormEvent } from "react";
import { CornerDownRight, Mail, Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";

interface Contact16Props {
  className?: string;
}

const Contact16 = ({ className }: Contact16Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          website,
        }),
      });

      const rawResponse = await response.text();
      let data: { ok?: boolean; error?: string } | null = null;

      try {
        data = rawResponse ? (JSON.parse(rawResponse) as { ok?: boolean; error?: string }) : null;
      } catch {
        data = null;
      }

      if (!response.ok || !data?.ok) {
        setErrorMessage(data?.error || rawResponse || "Something went wrong. Please try again.");
        return;
      }

      setSuccessMessage("Thanks! Your message has been sent.");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch {
      setErrorMessage("Network error. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={cn("dark bg-background py-32 text-foreground", className)} id="contact">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-semibold tracking-tight lg:text-8xl">
          Let’s get your fit right.
        </h1>
        <div className="mt-20 flex flex-col justify-between gap-10 lg:flex-row">
          <div className="w-full max-w-md">
            <p className="tracking-tight text-muted-foreground/50">
              Bring your piece to life again. Share a few details — we’ll guide you from fitting to collection.
            </p>
            <div className="mt-10 flex justify-between">
              <a className="flex items-center gap-1 text-foreground/40 hover:text-foreground" href="tel:07514776088">
                <Smartphone className="h-4 w-4" /> 07514 776088
              </a>
              <a className="flex items-center gap-1 text-foreground/40 hover:text-foreground" href="mailto:sewingataga@gmail.com">
                <Mail className="h-4 w-4" /> sewingataga@gmail.com
              </a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="col-span-4 flex w-full flex-col gap-2 lg:pl-30">
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name*"
              className="h-19 rounded-none border-0 border-b border-b-foreground/15 !bg-transparent placeholder:text-foreground/20 focus-visible:ring-0"
            />
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email*"
              className="h-19 rounded-none border-0 border-b border-b-foreground/15 !bg-transparent placeholder:text-foreground/20 focus-visible:ring-0"
            />
            <input
              type="text"
              name="message"
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Message (Tell us about your project)"
              className="h-19 rounded-none border-0 border-b border-b-foreground/15 !bg-transparent placeholder:text-foreground/20 focus-visible:ring-0"
            />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              className="hidden"
              aria-hidden="true"
            />
            <button type="submit" disabled={isLoading} className="mt-15 flex h-15 items-center justify-start gap-2 text-base disabled:opacity-60">
              <CornerDownRight className="size-6" />
              {isLoading ? "Sending..." : "Let’s get your fit right."}
            </button>
            {successMessage ? <p className="pt-2 text-sm text-foreground/70">{successMessage}</p> : null}
            {errorMessage ? <p className="pt-2 text-sm text-red-500">{errorMessage}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
};

export { Contact16 };
