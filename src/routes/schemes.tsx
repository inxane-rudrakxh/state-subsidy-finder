import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { SCHEMES, ALL_STATES, ALL_CATEGORIES } from "@/data/schemes";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "All Government Schemes — FindMySubsidy" },
      { name: "description", content: "Browse, filter and search every government subsidy and scheme across India in one place." },
      { property: "og:title", content: "All Government Schemes — FindMySubsidy" },
      { property: "og:description", content: "Find schemes by state, category and department." },
    ],
  }),
  component: SchemesPage,
});

function SchemesPage() {
  const [q, setQ] = useState("");
  const [state, setState] = useState("All");
  const [cat, setCat] = useState("All");

  const list = useMemo(() => {
    return SCHEMES.filter((s) => {
      if (state !== "All" && s.state !== state) return false;
      if (cat !== "All" && s.category !== cat) return false;
      if (q) {
        const v = q.toLowerCase();
        if (!s.name.toLowerCase().includes(v) && !s.shortDescription.toLowerCase().includes(v))
          return false;
      }
      return true;
    });
  }, [q, state, cat]);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Scheme Directory
        </div>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
          All Government <span className="text-gradient-primary">Schemes</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Browse {SCHEMES.length}+ schemes across {ALL_STATES.length} states. Filter by state, category or search by keyword.
        </p>

        {/* Filters */}
        <div className="glass shadow-elegant mt-8 grid gap-3 rounded-2xl p-3 sm:grid-cols-[1fr_200px_220px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search schemes…"
              className="w-full rounded-xl bg-input/60 py-3 pl-9 pr-3 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="rounded-xl bg-input/60 px-3 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
          >
            <option>All</option>
            {ALL_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="rounded-xl bg-input/60 px-3 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
          >
            <option>All</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          {list.length} {list.length === 1 ? "scheme" : "schemes"} found
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i, 12) * 0.03 }}
            >
              <Link
                to="/schemes/$schemeId"
                params={{ schemeId: s.id }}
                className="group glass shadow-elegant relative block h-full overflow-hidden rounded-2xl p-5 transition-all hover:border-primary/50 hover:shadow-glow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {s.state}
                  </span>
                </div>
                <h3 className="mt-4 line-clamp-2 font-display text-lg font-semibold leading-snug">
                  {s.name}
                </h3>
                <div className="mt-2">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {s.category}
                  </span>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                  {s.shortDescription}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  View details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {list.length === 0 && (
          <div className="glass mt-10 rounded-2xl p-12 text-center text-muted-foreground">
            No schemes match your filters.
          </div>
        )}
      </section>
    </Layout>
  );
}
