import type { APIRoute } from "astro";

const toStringValue = (value: FormDataEntryValue | null) => (typeof value === "string" ? value.trim() : "");

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = toStringValue(formData.get("name"));
  const email = toStringValue(formData.get("email"));
  const message = toStringValue(formData.get("message"));

  if (!name || !email || !message) {
    return new Response("Missing required fields.", { status: 400 });
  }

  if (!import.meta.env.RESEND_API_KEY) {
    return new Response("RESEND_API_KEY is not configured.", { status: 500 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Sewing at Aga's Contact <onboarding@resend.dev>",
      to: ["bartoszjasinski01@gmail.com"],
      reply_to: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    return new Response(`Failed to send message: ${errorBody}`, { status: 502 });
  }

  return new Response("Message sent.", { status: 200 });
};
