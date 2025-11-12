import { routeAgentRequest } from "agents";
import { Agent } from "./agents/AIEmailAgent";
import { auth } from "./auth";
export { Agent };

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext) {
    return await routeApiRequest(request, env);
  }
} satisfies ExportedHandler<Env>;

async function routeApiRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/auth")) {
    return auth().handler(request);
  }
  return (
    (await routeAgentRequest(request, env)) ||
    new Response("Not found", { status: 404 })
  );
}
