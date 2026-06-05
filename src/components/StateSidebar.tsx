import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Sparkles, Building2, FileText, ArrowRight, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { schemesByState, STATE_INFO, type Scheme } from "@/data/schemes";

type Props = {
  state: string | null;
  onSchemeClick: (scheme: Scheme) => void;
};

export function StateSidebar({ state, onSchemeClick }: Props) {
  const [category, setCategory] = useState<string>("All");
  const schemes = useMemo(() => (state ? schemesByState(state) : []), [state]);
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(schemes.map((s) => s.category)))],
    [schemes],
  );
  const filtered = category === "All" ? schemes : schemes.filter((s) => s.category === category);
  const info = state ? STATE_INFO[state] : undefined;

  return (
    <div className="glass shadow-elegant relative flex h-full flex-col overflow-hidden rounded-3xl">
      <AnimatePresence mode="wait">
        {!state ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col items-center justify-center p-10 text-center"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary to-primary-glow blur-2xl opacity-40" />
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-glow">
                <MapPin className="h-9 w-9 text-primary-foreground" />
              </div>
            </div>
            <h3 className="font-display text-2xl font-semibold">Select a State</h3>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Click on any state on the map to discover available subsidies and government schemes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[11px] text-muted-foreground">
              {["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat"].map((s) => (
                <span key={s} className="rounded-full border border-border px-3 py-1">
                  Try {s}
                </span>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            {/* Header */}
            <div className="relative overflow-hidden border-b border-border p-6">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary/30 to-primary-glow/10 blur-3xl" />
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Government Schemes
              </div>
              <h2 className="mt-2 font-display text-3xl font-bold text-gradient-primary">
                {state}
              </h2>
              {info && (
                <p className="mt-2 max-w-md text-sm text-muted-foreground">{info.blurb}</p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Schemes</span>
                  <span className="font-semibold">{schemes.length}</span>
                </div>
                {info && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Capital</span>
                    <span className="font-semibold">{info.capital}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Filter chips */}
            <div className="flex items-center gap-2 overflow-x-auto border-b border-border px-6 py-3">
              <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    category === c
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {filtered.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => onSchemeClick(s)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -2 }}
                  className="group relative w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-elevated p-4 text-left transition-all hover:border-primary/50 hover:shadow-glow"
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-semibold leading-snug">{s.name}</h4>
                        <ArrowRight className="h-4 w-4 shrink-0 translate-x-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                      <div className="mt-1.5">
                        <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                          {s.category}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {s.shortDescription}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* CTA */}
            <div className="border-t border-border bg-primary/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Can't find what you need?</div>
                  <div className="text-xs text-muted-foreground">
                    Let us help match the right scheme for your business.
                  </div>
                </div>
                <button className="shrink-0 rounded-full bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow">
                  Find My Subsidy
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
