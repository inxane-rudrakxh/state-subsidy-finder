import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { IndiaMap } from "@/components/IndiaMap";
import { StateSidebar } from "@/components/StateSidebar";
import { SchemeModal } from "@/components/SchemeModal";
import { ALL_STATES, type Scheme } from "@/data/schemes";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Map — FindMySubsidy" },
      { name: "description", content: "Full-screen interactive India map. Click any state to view subsidies and government schemes." },
      { property: "og:title", content: "Explore the Interactive India Subsidy Map" },
      { property: "og:description", content: "Browse government schemes across every Indian state in one place." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [state, setState] = useState<string | null>(null);
  const [active, setActive] = useState<Scheme | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const handleSelect = (s: string) => {
    setState(s);
    setRecent((r) => [s, ...r.filter((x) => x !== s)].slice(0, 5));
  };

  const filtered = ALL_STATES.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <Layout>
      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Explore the Map</h1>
          <p className="mt-1 text-muted-foreground">
            Click any state to instantly load its subsidies, or use search and quick picks below.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr_420px]">
          {/* Left rail */}
          <aside className="glass shadow-elegant rounded-3xl p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a state…"
                className="w-full rounded-xl border border-border bg-input/60 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {recent.length > 0 && (
              <div className="mt-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Recently Viewed
                </div>
                <div className="flex flex-wrap gap-2">
                  {recent.map((r) => (
                    <button
                      key={r}
                      onClick={() => handleSelect(r)}
                      className="rounded-full border border-border px-3 py-1 text-xs hover:bg-accent"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                All States
              </div>
              <div className="max-h-[460px] space-y-1 overflow-y-auto pr-1">
                {filtered.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSelect(s)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      state === s
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Map */}
          <div className="glass shadow-elegant rounded-3xl p-4 h-[420px] sm:h-[550px] lg:h-auto lg:min-h-[700px]">
            <IndiaMap selected={state} onSelect={handleSelect} />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block h-[760px]">
            <StateSidebar state={state} onSchemeClick={setActive} />
          </div>
        </div>
      </section>

      {/* Mobile Bottom Sheet Drawer */}
      <AnimatePresence>
        {state && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setState(null)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-[2.5rem] border-t border-border bg-background shadow-elegant lg:hidden h-[78vh] flex flex-col overflow-hidden"
            >
              {/* Handle bar */}
              <div className="mx-auto my-3 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/30" />
              
              {/* Close Button */}
              <button
                onClick={() => setState(null)}
                className="absolute right-5 top-4 grid h-8 w-8 place-items-center rounded-full border border-border bg-surface-elevated/80 text-muted-foreground transition-all hover:text-foreground"
                aria-label="Close Sidebar"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex-1 overflow-hidden h-full">
                <StateSidebar state={state} onSchemeClick={setActive} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SchemeModal scheme={active} onClose={() => setActive(null)} />
    </Layout>
  );
}
