import type { NextApiRequest, NextApiResponse } from "next";
import { ChatbotService } from "@/lib/chatbot/chatbot.service";
import { LRUCache } from "lru-cache";

interface RateLimitError extends Error {
  code: string;
}

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1]);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        if (isRateLimited) {
          const error = new Error("Rate limit exceeded") as RateLimitError;
          error.code = "RATE_LIMIT_EXCEEDED";
          return reject(error);
        }

        return resolve();
      }),
  };
}

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Apply rate limiting
    await limiter.check(10, "CACHE_TOKEN"); // 10 requests per minute

    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ message: "Invalid message format" });
    }

    const chatbotService = new ChatbotService();
    const response = await chatbotService.generateResponse(message);

    res.status(200).json({ response });
  } catch (error) {
    if ((error as RateLimitError).code === "RATE_LIMIT_EXCEEDED") {
      return res.status(429).json({ message: "Rate limit exceeded" });
    }
    console.error("Chatbot error:", error);
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error processing your request",
    });
  }
}
