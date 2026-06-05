import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
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
          <div className="glass shadow-elegant rounded-3xl p-4">
            <IndiaMap selected={state} onSelect={handleSelect} height={720} />
          </div>

          {/* Sidebar */}
          <div className="h-[760px]">
            <StateSidebar state={state} onSchemeClick={setActive} />
          </div>
        </div>
      </section>

      <SchemeModal scheme={active} onClose={() => setActive(null)} />
    </Layout>
  );
}
