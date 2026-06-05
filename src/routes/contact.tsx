import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, MapPin, Send, ChevronDown } from "lucide-react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FindMySubsidy" },
      { name: "description", content: "Get in touch with the FindMySubsidy team. Questions, partnerships, feedback — we want to hear from you." },
      { property: "og:title", content: "Contact FindMySubsidy" },
      { property: "og:description", content: "Reach out to the FindMySubsidy team." },
    ],
  }),
  component: Contact,
});

const FAQS = [
  { q: "Is FindMySubsidy free to use?", a: "Yes. Browsing the map and exploring schemes is completely free." },
  { q: "Are scheme details official?", a: "We curate publicly available scheme information; always verify on the official portal before applying." },
  { q: "Do you help with applications?", a: "Application drafting and matching is on our roadmap. Subscribe to know when it goes live." },
  { q: "How often is data updated?", a: "Our team reviews state policies regularly; major policies are refreshed within weeks of notification." },
];

function Contact() {
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contact</div>
        <h1 className="mt-2 font-display text-5xl font-bold sm:text-6xl">
          Let's <span className="text-gradient-primary">talk</span>.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Questions, partnerships, scheme corrections — drop us a note and we'll get back within 24 hours.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="glass shadow-elegant rounded-3xl p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Name
                </label>
                <input
                  required
                  className="mt-2 w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Subject
              </label>
              <input
                required
                className="mt-2 w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="What's this about?"
              />
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <textarea
                required
                rows={6}
                className="mt-2 w-full resize-none rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                placeholder="Tell us more…"
              />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              {sent ? "Message sent ✓" : "Send message"}
              {!sent && <Send className="h-4 w-4" />}
            </button>
          </form>

          <aside className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "hello@findmysubsidy.in" },
              { icon: MessageSquare, label: "Support", value: "support@findmysubsidy.in" },
              { icon: MapPin, label: "Based in", value: "Bengaluru, India" },
            ].map((c) => (
              <div key={c.label} className="glass shadow-elegant flex items-center gap-3 rounded-2xl p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="text-sm font-medium">{c.value}</div>
                </div>
              </div>
            ))}
          </aside>
        </div>

        <h2 className="mt-20 font-display text-3xl font-bold">Frequently asked</h2>
        <div className="glass shadow-elegant mt-6 divide-y divide-border overflow-hidden rounded-3xl">
          {FAQS.map((f, i) => (
            <button
              key={f.q}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full px-6 py-5 text-left"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium">{f.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openFaq === i && (
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              )}
            </button>
          ))}
        </div>
      </section>
    </Layout>
  );
}
