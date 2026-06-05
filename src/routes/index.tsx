import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Building2, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import { IndiaMap } from "@/components/IndiaMap";
import { StateSidebar } from "@/components/StateSidebar";
import { SchemeModal } from "@/components/SchemeModal";
import { SCHEMES, type Scheme } from "@/data/schemes";

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

const POPULAR_STATES = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Uttar Pradesh", "Telangana"];

function Index() {
  const [state, setState] = useState<string | null>("Maharashtra");
  const [active, setActive] = useState<Scheme | null>(null);

  return (
    <Layout>
      {/* HEADER & INTRODUCTION */}
      <section className="relative overflow-hidden pt-8 pb-6">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1 text-xs text-muted-foreground backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>{SCHEMES.length}+ Subsidies Decoded Across India</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
            >
              Find Government <span className="text-gradient-primary">Subsidies</span> & Schemes
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto"
            >
              Click any state on the map to explore available industrial incentives, manufacturing grants, startup seed funds, and infrastructure policies.
            </motion.p>

            {/* Quick Pick Chips */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              <span className="text-xs text-muted-foreground font-medium mr-1 uppercase tracking-wider">Quick Select:</span>
              {POPULAR_STATES.map((s) => (
                <button
                  key={s}
                  onClick={() => setState(s)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all hover:scale-[1.03] active:scale-100 ${
                    state === s
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "border border-border bg-surface/40 hover:bg-accent text-foreground backdrop-blur"
                  }`}
                >
                  {s}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE WORKSPACE: MAP + SIDEBAR */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] items-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass shadow-elegant rounded-3xl p-3 sm:p-4 border border-border/60"
          >
            <IndiaMap selected={state} onSelect={setState} height={600} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-[632px]"
          >
            <StateSidebar state={state} onSchemeClick={setActive} />
          </motion.div>
        </div>
      </section>

      {/* TARGET AUDIENCE SECTION */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Built for every stage of industry</h2>
          <p className="mt-2 text-muted-foreground font-sans text-sm sm:text-base">
            From early-stage startups to mega-scale factories, FindMySubsidy groups policies into intuitive categories so you can target relevant grants.
          </p>
        </div>
        
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { 
              icon: TrendingUp, 
              title: "Startups & Innovators", 
              desc: "Explore seed capital, patents registration waivers, sustenance grants, and incubator allocations designed to kickstart technology businesses." 
            },
            { 
              icon: Building2, 
              title: "MSMEs & Manufacturers", 
              desc: "Get capital investment subsidies, electricity power tariff rebates, stamp duty exemptions on land, and state GST reimbursements." 
            },
            { 
              icon: Users, 
              title: "Mega-scale Projects", 
              desc: "Access customized incentive packages, direct cabinet approvals, single-window clearances (like TS-iPASS), and dedicated logistics corridors." 
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass shadow-elegant rounded-3xl p-6 border border-border/40 hover:border-primary/30 transition-all group"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <SchemeModal scheme={active} onClose={() => setActive(null)} />
    </Layout>
  );
}
