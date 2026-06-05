import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, TrendingUp, Building2, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import { IndiaMap } from "@/components/IndiaMap";
import { StateSidebar } from "@/components/StateSidebar";
import { SchemeModal } from "@/components/SchemeModal";
import { SCHEMES, ALL_STATES, type Scheme } from "@/data/schemes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FindMySubsidy — Government Schemes & Subsidies Across India" },
      { name: "description", content: "Discover government subsidies, schemes, grants and incentives across every Indian state through an interactive map." },
      { property: "og:title", content: "FindMySubsidy — Government Schemes Across India" },
      { property: "og:description", content: "Click any state on the interactive India map to instantly explore available subsidies and schemes." },
    ],
  }),
  component: Index,
});

function Index() {
  const [state, setState] = useState<string | null>("Maharashtra");
  const [active, setActive] = useState<Scheme | null>(null);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {SCHEMES.length}+ schemes across {ALL_STATES.length} states
              </div>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Find Government
                <br />
                <span className="text-gradient-primary">Subsidies</span> Across India.
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Explore state-wise schemes, incentives, grants and subsidy programs
                through an interactive map experience designed for founders and industry teams.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/explore"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
                >
                  Explore States
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/schemes"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-accent"
                >
                  Browse Schemes
                </Link>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
                {[
                  { icon: Sparkles, label: "Schemes", value: `${SCHEMES.length}+` },
                  { icon: MapPin, label: "States & UTs", value: `${ALL_STATES.length}` },
                  { icon: Users, label: "Businesses", value: "1K+" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-border bg-surface/40 p-4 backdrop-blur">
                    <s.icon className="h-5 w-5 text-primary" />
                    <div className="mt-2 font-display text-2xl font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="glass shadow-elegant rounded-3xl p-3 sm:p-4"
            >
              <IndiaMap selected={state} onSelect={setState} height={520} />
              <div className="px-3 pb-2 pt-1 text-center text-xs text-muted-foreground">
                Click on any state to update the sidebar below.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAP + SIDEBAR SECTION */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Interactive Explorer
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Explore Schemes by State
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Click on any state on the map to discover government schemes
              and incentives available for your business.
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Full-screen view <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="glass shadow-elegant rounded-3xl p-4">
            <IndiaMap selected={state} onSelect={setState} height={620} />
          </div>
          <div className="h-[620px]">
            <StateSidebar state={state} onSchemeClick={setActive} />
          </div>
        </div>
      </section>

      {/* STATE OVERVIEW */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Built for every kind of business</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          From bootstrapped MSMEs to scaling industries, FindMySubsidy surfaces the right incentives for your stage and sector.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: TrendingUp, title: "Startups & Innovators", desc: "Seed grants, sustenance allowances, acceleration support and patent reimbursements." },
            { icon: Building2, title: "MSMEs & Manufacturers", desc: "Capital, interest and power subsidies, SGST refunds and stamp duty waivers." },
            { icon: Users, title: "Industry Investors", desc: "Mega-project incentives, employment-linked rebates and single-window clearances." },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass shadow-elegant rounded-3xl p-6"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <SchemeModal scheme={active} onClose={() => setActive(null)} />
    </Layout>
  );
}
