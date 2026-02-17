import "dotenv/config";
import http from "node:http";
import { google } from "googleapis";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI = "http://localhost:4321/api/google/oauth/callback",
} = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in your environment.");
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/business.manage"],
});

console.log("\n=== Google Business Profile refresh token setup ===\n");
console.log("1) Open this URL in your browser and complete consent:");
console.log(authUrl);
console.log("\n2) Keep this terminal open. Waiting for callback on:");
console.log(`   ${GOOGLE_REDIRECT_URI}\n`);

const CALLBACK_PATH = "/api/google/oauth/callback";

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url || "", "http://localhost:4321");

    if (requestUrl.pathname !== CALLBACK_PATH) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found.");
      return;
    }

    const code = requestUrl.searchParams.get("code");
    if (!code) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Missing OAuth code.");
      return;
    }

    const { tokens } = await oauth2Client.getToken(code);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Success. You can close this tab and return to your terminal.");

    console.log("\n=== OAuth tokens received ===\n");

    if (!tokens.refresh_token) {
      console.log("No refresh_token returned.");
      console.log("Tip: revoke app access and retry with prompt=consent.");
    } else {
      console.log("Copy this into .env as GOOGLE_REFRESH_TOKEN:\n");
      console.log(tokens.refresh_token);
    }

    server.close(() => process.exit(0));
  } catch (error) {
    console.error("OAuth callback error:", error?.message || error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("OAuth callback failed. Check terminal logs.");
    server.close(() => process.exit(1));
  }
});

server.listen(4321, "127.0.0.1", () => {
  console.log("Local callback server started on http://localhost:4321");
});
