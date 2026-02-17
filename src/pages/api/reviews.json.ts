import type { APIRoute } from "astro";
import { google } from "googleapis";

type NormalizedReview = {
  reviewId: string;
  starRating: string;
  ratingValue: number;
  comment: string;
  createTime: string;
  reviewer: string;
  profilePhotoUrl: string | null;
};

type ReviewsPayload = {
  fetchedAt: string;
  averageRating: number | null;
  totalReviewCount: number | null;
  reviews: NormalizedReview[];
};

let cached: { expiresAt: number; data: ReviewsPayload } | null = null;

const STAR_MAP: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

const getEnv = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
};

export const GET: APIRoute = async () => {
  try {
    const ttlHours = Number(process.env.GBP_REVIEWS_CACHE_TTL_HOURS || "12");
    const ttlMs = (Number.isFinite(ttlHours) && ttlHours > 0 ? ttlHours : 12) * 60 * 60 * 1000;

    if (cached && Date.now() < cached.expiresAt) {
      return new Response(JSON.stringify(cached.data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=600",
        },
      });
    }

    const GOOGLE_CLIENT_ID = getEnv("GOOGLE_CLIENT_ID");
    const GOOGLE_CLIENT_SECRET = getEnv("GOOGLE_CLIENT_SECRET");
    const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:4321/api/google/oauth/callback";
    const GOOGLE_REFRESH_TOKEN = getEnv("GOOGLE_REFRESH_TOKEN");
    const GBP_ACCOUNT_ID = getEnv("GBP_ACCOUNT_ID");
    const GBP_LOCATION_ID = getEnv("GBP_LOCATION_ID");

    const auth = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI,
    );
    auth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

    const token = await auth.getAccessToken();
    if (!token.token) {
      throw new Error("Unable to get Google access token from refresh token.");
    }

    const endpoint = `https://mybusiness.googleapis.com/v4/${GBP_ACCOUNT_ID}/locations/${GBP_LOCATION_ID}/reviews`;

    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token.token}` },
    });

    const raw = await response.text();
    const data = raw ? JSON.parse(raw) : {};

    if (!response.ok) {
      const details =
        response.status === 403
          ? "Google API returned 403. Verify GBP API access for this project/account and check business.manage scope approval/quota."
          : data?.error?.message || `Google API returned ${response.status}.`;
      return new Response(
        JSON.stringify({ error: "Failed to fetch Google reviews", details }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=600",
          },
        },
      );
    }

    const reviews = (data.reviews || []).map((review: any): NormalizedReview => {
      const starRating = (review.starRating || "").replace("STAR_RATING_", "") || "UNSPECIFIED";
      return {
        reviewId: review.reviewId || review.name || crypto.randomUUID(),
        starRating,
        ratingValue: STAR_MAP[starRating] || 0,
        comment: review.comment || "",
        createTime: review.createTime || "",
        reviewer: review.reviewer?.displayName || "Anonymous",
        profilePhotoUrl: review.reviewer?.profilePhotoUrl || null,
      };
    });

    const normalized: ReviewsPayload = {
      fetchedAt: new Date().toISOString(),
      averageRating: typeof data.averageRating === "number" ? data.averageRating : null,
      totalReviewCount: typeof data.totalReviewCount === "number" ? data.totalReviewCount : null,
      reviews,
    };

    cached = {
      data: normalized,
      expiresAt: Date.now() + ttlMs,
    };

    return new Response(JSON.stringify(normalized), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch Google reviews",
        details: error?.message || "Unknown server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=600",
        },
      },
    );
  }
};
