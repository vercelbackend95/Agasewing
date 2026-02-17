import "dotenv/config";
import { google } from "googleapis";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI = "http://localhost:4321/api/google/oauth/callback",
  GOOGLE_REFRESH_TOKEN,
  GBP_ACCOUNT_ID, // np. accounts/1234567890
} = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !GBP_ACCOUNT_ID) {
  console.error("Missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, or GBP_ACCOUNT_ID.");
  process.exit(1);
}

const auth = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);
auth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

async function fetchWithRetry(url, options, retries = 4) {
  for (let i = 0; i <= retries; i++) {
    const res = await fetch(url, options);

    if (res.status !== 429) return res;

    const waitMs = Math.min(60000, 1000 * Math.pow(2, i));
    console.log(`429 quota hit. Waiting ${waitMs}ms then retrying...`);
    await new Promise((r) => setTimeout(r, waitMs));
  }
  return fetch(url, options);
}

const token = await auth.getAccessToken();
if (!token.token) {
  console.error("Failed to get access token from refresh token.");
  process.exit(1);
}

// ✅ POPRAWNY HOST dla LOCATIONS:
const endpoint = `https://mybusinessbusinessinformation.googleapis.com/v1/${GBP_ACCOUNT_ID}/locations`;

const response = await fetchWithRetry(endpoint, {
  headers: { Authorization: `Bearer ${token.token}` },
});

if (!response.ok) {
  const details = await response.text();
  console.error("Failed to list locations:", response.status, details);
  process.exit(1);
}

const data = await response.json();
const locations = data.locations || [];

if (!locations.length) {
  console.log(`No locations found for ${GBP_ACCOUNT_ID}.`);
  process.exit(0);
}

console.log(`\nLocations for ${GBP_ACCOUNT_ID}:\n`);
for (const location of locations) {
  // location.name wygląda zwykle jak: "locations/12345678901234567890"
  const locationPath = location.name || "";
  const locationId = locationPath.split("/").pop() || "unknown";
  const title = location.title || "Untitled location";
  const address = location.storefrontAddress?.addressLines?.join(", ") || "No address";

  console.log(`- locationId: ${locationId}`);
  console.log(`  title: ${title}`);
  console.log(`  address: ${address}`);
  console.log(`  hint: set GBP_LOCATION_ID=${locationId}\n`);
}
