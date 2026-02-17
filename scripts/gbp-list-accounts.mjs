import "dotenv/config";
import { google } from "googleapis";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI = "http://localhost:4321/api/google/oauth/callback",
  GOOGLE_REFRESH_TOKEN,
} = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
  console.error("Missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_REFRESH_TOKEN.");
  process.exit(1);
}

const auth = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);
auth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

const { token } = await auth.getAccessToken();
if (!token) {
  console.error("Failed to get access token from refresh token.");
  process.exit(1);
}

const url = "https://mybusinessaccountmanagement.googleapis.com/v1/accounts";
const response = await fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
});

if (!response.ok) {
  const details = await response.text();
  console.error("Failed to list accounts:", response.status, details);
  process.exit(1);
}

const data = await response.json();
const accounts = data.accounts || [];

console.log("\nGoogle Business Profile accounts:\n");
for (const a of accounts) {
  console.log(`- name: ${a.accountName || "—"}`);
  console.log(`  accountId: ${a.name}`);
}
