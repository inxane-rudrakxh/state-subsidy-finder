import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Send, ArrowRight, Compass, Target, Zap } from "lucide-react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FindMySubsidy" },
      { name: "description", content: "FindMySubsidy makes Indian government schemes discoverable through a beautiful, map-first product experience." },
      { property: "og:title", content: "About FindMySubsidy" },
      { property: "og:description", content: "Built to make government subsidies accessible to every business in India." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About</div>
        <h1 className="mt-2 font-display text-5xl font-bold leading-tight sm:text-6xl">
          Government schemes,
          <br />
          finally <span className="text-gradient-primary">discoverable</span>.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          FindMySubsidy turns the maze of Indian government subsidies into a single
          map-first product experience. Built for founders, MSMEs and industry teams who
          deserve a modern interface — not a 90s portal.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="glass shadow-elegant rounded-3xl p-8">
            <Target className="h-6 w-6 text-primary" />
            <h2 className="mt-4 font-display text-2xl font-bold">Why we built it</h2>
            <p className="mt-3 text-muted-foreground">
              Every state has dozens of capital, interest and SGST schemes — but they
              live across PDFs, departments and acronyms. We bring them together in one
              clean interface where you can click, filter and act.
            </p>
          </div>
          <div className="glass shadow-elegant rounded-3xl p-8">
            <Compass className="h-6 w-6 text-primary" />
            <h2 className="mt-4 font-display text-2xl font-bold">Our mission</h2>
            <p className="mt-3 text-muted-foreground">
              Make every government incentive in India just one click away. So that more
              capital reaches more founders, faster.
            </p>
          </div>
        </div>

        <h2 className="mt-20 font-display text-3xl font-bold">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: MapPin, title: "Select State", desc: "Click any state on the interactive India map." },
            { icon: Sparkles, title: "Discover Schemes", desc: "See all available subsidies, grants and incentives instantly." },
            { icon: Zap, title: "Apply", desc: "Get eligibility, documents and the official portal in one place." },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass shadow-elegant relative rounded-3xl p-6"
            >
              <div className="absolute right-4 top-4 font-display text-4xl font-bold text-primary/20">
                0{i + 1}
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass shadow-elegant mt-16 rounded-3xl p-8 sm:p-12">
          <h2 className="font-display text-3xl font-bold">Future vision</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Smart matching that recommends the most relevant schemes based on your
            business profile, sector and location. Real-time updates as new policies
            are notified. One-tap eligibility checks and application drafts.
          </p>
          <Link
            to="/explore"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            <Send className="h-4 w-4" /> Start exploring <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
