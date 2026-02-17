import "dotenv/config";
import { google } from "googleapis";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI = "http://localhost:4321/api/google/oauth/callback",
  GOOGLE_REFRESH_TOKEN,
  GBP_ACCOUNT_ID, // np. "accounts/1234567890"
} = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !GBP_ACCOUNT_ID) {
  console.error("Missing GOOGLE_* vars or GBP_ACCOUNT_ID.");
  process.exit(1);
}

const auth = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
auth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

const { token } = await auth.getAccessToken();
if (!token) {
  console.error("Failed to get access token.");
  process.exit(1);
}

const url = `https://mybusinessbusinessinformation.googleapis.com/v1/${GBP_ACCOUNT_ID}/locations`;
const response = await fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
});

if (!response.ok) {
  const details = await response.text();
  console.error("Failed to list locations:", response.status, details);
  process.exit(1);
}

const data = await response.json();
const locations = data.locations || [];

console.log(`\nLocations for ${GBP_ACCOUNT_ID}:\n`);
for (const l of locations) {
  console.log(`- title: ${l.title || "—"}`);
  console.log(`  name: ${l.name || "—"}`); // zwykle accounts/.../locations/...
  console.log("");
}
