import { createGroq } from "@ai-sdk/groq";
import { env } from "cloudflare:workers";

export const groq = createGroq({
  apiKey: env.GROQ_API_KEY
});
