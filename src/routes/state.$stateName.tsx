import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { IndiaMap } from "@/components/IndiaMap";
import { StateSidebar } from "@/components/StateSidebar";
import { SchemeModal } from "@/components/SchemeModal";
import { ALL_STATES, STATE_INFO, type Scheme } from "@/data/schemes";

// Format state name from URL slug (e.g. "tamil-nadu" -> "Tamil Nadu", "maharashtra" -> "Maharashtra")
function formatStateName(slug: string): string {
  const map: Record<string, string> = {
    "tamil-nadu": "Tamil Nadu",
    "uttar-pradesh": "Uttar Pradesh",
    "west-bengal": "West Bengal",
    "madhya-pradesh": "Madhya Pradesh",
    "andhra-pradesh": "Andhra Pradesh",
    "himachal-pradesh": "Himachal Pradesh",
    "jammu-and-kashmir": "Jammu and Kashmir",
  };
  if (map[slug.toLowerCase()]) return map[slug.toLowerCase()];
  return slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
}

export const Route = createFileRoute("/state/$stateName")({
  loader: ({ params }) => {
    const stateName = formatStateName(params.stateName);
    if (!ALL_STATES.includes(stateName)) throw notFound();
    return { stateName, info: STATE_INFO[stateName] };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "State Not Found" }] };
    
    const { stateName, info } = loaderData;
    const description = info ? info.blurb : `Discover government subsidies, schemes, and grants available in ${stateName}.`;
    
    return {
      meta: [
        { title: `${stateName} Subsidies & Government Schemes — FindMySubsidy` },
        { name: "description", content: description },
        { property: "og:title", content: `Government Schemes in ${stateName}` },
        { property: "og:description", content: description },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GovernmentService",
            "name": `Government Schemes in ${stateName}`,
            "provider": {
              "@type": "GovernmentOrganization",
              "name": `Government of ${stateName}`,
            },
            "description": description,
            "url": `https://find-my-subsidy.vercel.app/state/${stateName.toLowerCase().replace(/\s+/g, "-")}`,
          }),
        },
      ],
    };
  },
  component: StateExplore,
});

function StateExplore() {
  const { stateName } = Route.useLoaderData();
  const [state, setState] = useState<string | null>(stateName);
  const [active, setActive] = useState<Scheme | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setState(stateName);
  }, [stateName]);

  const handleSelect = (s: string) => {
    setState(s);
    setRecent((r) => [s, ...r.filter((x) => x !== s)].slice(0, 5));
    // Ideally we would navigate to the new state route, but to preserve UX
    // we just update state inline. For SEO links, we let default behavior happen.
  };

  const filtered = ALL_STATES.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <Layout>
      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Explore {stateName} Schemes</h1>
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
                  <a
                    key={s}
                    href={`/state/${s.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={(e) => { e.preventDefault(); handleSelect(s); }}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      state === s
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {s}
                  </a>
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
