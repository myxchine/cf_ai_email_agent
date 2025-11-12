import { Link } from "react-router";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="w-full relative">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <UseCasesSection />
      <FeaturesSection />
      <WhyAISection />
      <FooterSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative mx-auto w-full max-w-(--site-width) px-6 pb-16 pt-8 md:px-8 md:pb-20 md:pt-20">
      <div className="mb-6">
        <span className="chip">AI Email Agent</span>
      </div>
      <h1 className="max-w-3xl font-sans text-balance">
        Create beautiful emails with AI. Just ask.
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-black/70">
        An AI-powered email creation agent that designs professional bespoke
        emails with HTML and CSS through natural conversation. Chat with the AI
        agent to build, refine, and send stunning emails in minutes. No design
        skills required. All in realtime!
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          to="/signin"
          className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/90"
        >
          Get Started
        </Link>
        <a href="#features" className="btn-ghost">
          Explore Features
        </a>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="mx-auto w-full max-w-(--site-width) px-6 py-12 md:px-8 md:py-16">
      <h2>How it works</h2>
      <div className="mt-6 flex flex-col gap-4 ">
        <div className="card p-5">
          <div className="text-sm text-black/60">Step 1</div>
          <div className="mt-1 text-lg font-medium">Create Your Email</div>
          <p className="mt-2 text-sm text-black/70 mb-4">
            Start a conversation with the AI agent. Simply describe what kind of
            email you want to create, and watch as it designs a beautiful HTML
            email with modern styling.
          </p>
          <div className="mt-4 rounded-[calc(var(--rounded-radius)+2px)] overflow-hidden border border-black/10">
            <img
              src="/images/screenshots/agent-email-creation.png"
              alt="AI creating an email"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-black/60">Step 2</div>
          <div className="mt-1 text-lg font-medium">Send Your Email</div>
          <p className="mt-2 text-sm text-black/70 mb-4">
            Once you're happy with your email design, ask the AI to send it. The
            agent will collect all necessary details (recipient, subject, sender
            info) and send your email instantly.
          </p>
          <div className="mt-4 rounded-[calc(var(--rounded-radius)+2px)] overflow-hidden border border-black/10">
            <img
              src="/images/screenshots/agent-sends-email.png"
              alt="AI sending an email"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="mx-auto w-full max-w-(--site-width) px-6 py-12 md:px-8 md:py-16"
    >
      <div className="mb-8 flex items-center justify-between">
        <h2>Use Cases</h2>
        <span className="text-sm text-black/60">Real-world applications</span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card p-5">
          <div className="mb-4 text-xs text-black/60 uppercase tracking-wide">
            Personal
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-base font-medium mb-1">
                Event Invitations
              </div>
              <p className="text-sm text-black/70">
                Create beautiful invitations for birthdays, weddings, or
                parties. The AI designs eye-catching emails that get people
                excited to attend.
              </p>
            </div>
            <div>
              <div className="text-base font-medium mb-1">
                Family Newsletters
              </div>
              <p className="text-sm text-black/70">
                Keep family and friends updated with personal newsletters
                featuring photos, updates, and milestones. Perfect for holiday
                greetings or life announcements.
              </p>
            </div>
            <div>
              <div className="text-base font-medium mb-1">Thank You Notes</div>
              <p className="text-sm text-black/70">
                Send heartfelt thank you emails after events, gifts, or special
                occasions. Professional yet personal design that shows you care.
              </p>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="mb-4 text-xs text-black/60 uppercase tracking-wide">
            Business
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-base font-medium mb-1">Invoices</div>
              <p className="text-sm text-black/70">
                Generate professional invoice emails with itemized details,
                payment terms, and branding. Perfect for freelancers and small
                businesses.
              </p>
            </div>
            <div>
              <div className="text-base font-medium mb-1">
                Marketing Campaigns
              </div>
              <p className="text-sm text-black/70">
                Create promotional emails, product announcements, and
                newsletters that convert. The AI ensures your message looks
                professional and engaging.
              </p>
            </div>
            <div>
              <div className="text-base font-medium mb-1">
                Customer Onboarding
              </div>
              <p className="text-sm text-black/70">
                Welcome new customers with beautifully designed onboarding
                sequences. Set the right tone from day one with emails that
                guide and delight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "AI-Powered Design",
      desc: "Chat with an AI agent to create professional HTML emails with modern styling.",
      tag: "Core Feature"
    },
    {
      title: "Real-Time Preview",
      desc: "See your email come to life instantly as the AI designs it.",
      tag: "Live Preview"
    },
    {
      title: "Smart Copywriting",
      desc: "Get AI suggestions for email content, subject lines, and messaging.",
      tag: "AI Assistant"
    },
    {
      title: "One-Click Sending",
      desc: "Send emails directly through the interface with all necessary details.",
      tag: "Integration"
    },
    {
      title: "HTML & CSS Expert",
      desc: "The AI understands modern email design patterns and best practices.",
      tag: "Professional"
    },
    {
      title: "Conversational Interface",
      desc: "Natural chat experience makes email creation feel effortless.",
      tag: "UX"
    }
  ];

  return (
    <section
      id="features"
      className="mx-auto w-full max-w-(--site-width) px-6 py-12 md:px-8 md:py-16"
    >
      <div className="mb-8 flex items-center justify-between">
        <h2>Features</h2>
        <span className="text-sm text-black/60">Powered by AI agents</span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="card p-5">
            <div className="mb-3 text-xs text-black/60">{f.tag}</div>
            <div className="text-lg font-medium">{f.title}</div>
            <p className="mt-2 text-sm text-black/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyAISection() {
  return (
    <section
      id="why"
      className="mx-auto w-full max-w-(--site-width) px-6 py-12 md:px-8 md:py-16"
    >
      <h2>Why use AI for email creation?</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="card p-5">
          <div className="text-lg font-medium mb-2">
            No Design Skills Needed
          </div>
          <p className="text-sm text-black/70">
            The AI understands modern email design patterns, HTML, and CSS. Just
            describe what you want, and it handles the technical details.
          </p>
        </div>
        <div className="card p-5">
          <div className="text-lg font-medium mb-2">Iterate in Real-Time</div>
          <p className="text-sm text-black/70">
            See your email update live as you chat with the AI. Make changes
            instantly and preview before sending.
          </p>
        </div>
        <div className="card p-5">
          <div className="text-lg font-medium mb-2">Professional Results</div>
          <p className="text-sm text-black/70">
            Get production-ready HTML emails with clean code, responsive design,
            and modern styling that works across email clients.
          </p>
        </div>
        <div className="card p-5">
          <div className="text-lg font-medium mb-2">Complete Workflow</div>
          <p className="text-sm text-black/70">
            From initial concept to sending, handle everything in one interface.
            No need to switch between tools or copy-paste code.
          </p>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="border-t border-black/10 py-10">
      <div className="mx-auto flex w-full max-w-(--site-width) flex-col items-center justify-between gap-4 px-6 text-sm text-black/60 md:flex-row md:px-8">
        <div className="flex items-center gap-2">
          <span>AI Email Agent</span>
          <span className="text-black/30">Powered by Cloudflare Agents</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#use-cases" className="hover:text-black">
            Use Cases
          </a>
          <a href="#features" className="hover:text-black">
            Features
          </a>
          <a href="#why" className="hover:text-black">
            Why AI?
          </a>
        </div>
      </div>
    </footer>
  );
}
