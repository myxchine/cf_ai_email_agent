# Vesqa AI Email Agent

Live on [https://mail.vesqa.com](https://mail.vesqa.com).

This is a powerful realtime AI Agent built on Cloudflare's Agents SDK that allows users to create their own account and instantly chat with the AI Agent to bring their email ideas to life through natural conversation with a live preview of the email. Once the user is happy with the email, they can simply ask the AI Agent to send the email to any email address requested. The AI Agent ensures all necessary details are collected and the email is sent to the requested recipient.

## Tech Stack

### Cloudflare Native Technologies

This project is built entirely on **Cloudflare's edge computing platform**, showcasing deep expertise with Cloudflare-native technologies:

- **Cloudflare Workers** - The entire backend runs on Cloudflare Workers, providing edge computing with global distribution and low latency
- **D1 Database** - SQLite database powered by Cloudflare D1 for persistent data storage (user accounts, sessions, etc.)
- **Durable Objects** - Stateful agents implemented using Durable Objects, enabling real-time WebSocket connections and maintaining conversation state
- **Cloudflare Agents SDK** - Leveraging the official `agents` package for building AI-powered conversational agents with WebSocket support
- **Cloudflare Workers AI** - AI binding configured (see note below about implementation)
- **Wrangler** - Cloudflare's CLI tool for local development, D1 migrations, and deployment
- **Cloudflare Vite Plugin** - Seamless integration with Vite for development and production builds
- **Cloudflare Observability** - Built-in monitoring and observability features enabled

### Frontend Technologies

- **React 19** - Latest React with modern hooks and concurrent features
- **React Router 7** - Client-side routing for SPA navigation
- **TypeScript** - Full type safety across the codebase
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework for styling (all components are custom-built with Tailwind)
- **Custom Components** - Self-rolled UI components including buttons, navigation, modals, and chat interface
- **Lucide React** - Modern icon library
- **React Markdown** - Markdown rendering for AI responses

### Backend & AI Technologies

- **Vercel AI SDK** - Streaming AI responses with `streamText` and tool calling capabilities
- **Groq AI** - Using Groq's Moonshot AI model (`moonshotai/kimi-k2-instruct-0905`) for fast inference
- **AI SDK React** - React hooks for AI chat interfaces (`useAgentChat`, `useAgent`)
- **Zod** - Schema validation for tool inputs and type safety
- **Drizzle ORM** - Type-safe SQL query builder with D1 dialect
- **Drizzle Kit** - Database migrations and schema management
- **Better Auth** - Authentication system with Google OAuth integration
- **Brevo API** - Email delivery service for sending transactional emails

### Development Tools

- **Biome** - Fast linter and formatter
- **Vitest** - Unit testing framework with Cloudflare Workers support
- **Prettier** - Code formatting

### Note on Cloudflare Workers AI Provider

Initially, I attempted to use Cloudflare's native Workers AI provider (`workers-ai-provider`) instead of Groq. However, I encountered issues with:
- **Streaming limitations** - The streaming implementation didn't work as expected with the AI SDK's streaming requirements
- **Limited model availability** - The available models through Workers AI didn't meet the specific requirements for this use case

As a result, I switched to Groq's API, which provided better streaming support and access to the Moonshot AI (Kimi K2) model which is great at design and tool calling. The Cloudflare Workers AI binding remains configured in `wrangler.jsonc` for potential future use.

## Features

- **User Authentication** - Google OAuth integration via Better Auth
- **Real-time Chat Interface** - WebSocket-based conversations with the AI agent
- **Live Email Preview** - See email changes in real-time as you chat
- **Professional Email Templates** - HTML/CSS email templates optimized for email clients
- **AI-Powered Email Generation** - Natural language to HTML email conversion
- **Email Sending** - Direct email delivery through Brevo API
- **Responsive Design** - Works on desktop and mobile browsers
- **Edge Computing** - Global distribution via Cloudflare Workers

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Cloudflare account with:
  - D1 database created
  - Workers AI enabled (optional, if using Workers AI)
- Brevo account for email sending
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agents-starter-main
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy `.dev.vars.example` to `.dev.vars`:
   ```bash
   cp .dev.vars.example .dev.vars
   ```
   
   Fill in the required environment variables in `.dev.vars`:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   EMAIL_KEY=your_brevo_api_key_here
   BETTER_AUTH_SECRET=your_auth_secret_here
   BETTER_AUTH_URL=http://localhost:8787
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   ```

4. **Set up D1 database**
   
   Make sure your D1 database is configured in `wrangler.jsonc` with the correct `database_id`. Then run migrations:
   ```bash
   pnpm db:migrate:local
   ```

5. **Start the development server**
   ```bash
   pnpm start
   ```

   The application will be available at `http://localhost:8787`

### Deployment

Deploy to Cloudflare Workers:
```bash
pnpm run deploy
```

For production, make sure to:
- Update `BETTER_AUTH_URL` in your Cloudflare Workers environment variables to your production URL
- Run remote database migrations: `pnpm db:migrate:remote`
- Configure your custom domain in Cloudflare dashboard

## Known Issues

- **WebSocket connection on Safari Mobile** - WebSocket isn't connecting on Safari mobile (needs investigation) but works on Chrome, Chrome mobile, and Safari desktop

## TODO

- Rate limiting for AI use to avoid abuse
- Decide if human in the loop is needed for sending emails or if the current implementation where the AI Agent decides if the email and details are appropriate and then sends the email is fine
- Investigate and fix Safari mobile WebSocket connection issue