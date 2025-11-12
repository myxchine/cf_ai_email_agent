import { routeAgentRequest } from "agents";
import { Agent } from "./agents/AIEmailAgent";
import { auth } from "./auth";
import { getSession } from "./auth/server";
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

  if (url.pathname.startsWith("/agents")) {
    const session = await getSession(request);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    return (
      (await routeAgentRequest(request, env)) ||
      new Response("Not found", { status: 404 })
    );
  }

  return new Response("Not found", { status: 404 });
}
