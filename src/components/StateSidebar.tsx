import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Sparkles, Building2, FileText, ArrowRight, Filter, Search, X, ShieldQuestion } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { schemesByState, STATE_INFO, type Scheme } from "@/data/schemes";

type Props = {
  state: string | null;
  onSchemeClick: (scheme: Scheme) => void;
};

export function StateSidebar({ state, onSchemeClick }: Props) {
  const [category, setCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const schemes = useMemo(() => (state ? schemesByState(state) : []), [state]);
  
  // Sync state changes: reset filters
  useEffect(() => {
    setCategory("All");
    setSearchQuery("");
  }, [state]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(schemes.map((s) => s.category)))],
    [schemes],
  );

  const filtered = useMemo(() => {
    return schemes.filter((s) => {
      const matchesCategory = category === "All" || s.category === category;
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [schemes, category, searchQuery]);

  const info = state ? STATE_INFO[state] : undefined;

  return (
    <div className="glass shadow-elegant relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60">
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
            <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Tap any state on the India map to discover available subsidies and schemes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[11px] text-muted-foreground">
              {["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat"].map((s) => (
                <span key={s} className="rounded-full border border-border px-3 py-1 bg-surface/30">
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
            className="flex flex-1 flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="relative overflow-hidden border-b border-border/80 p-6 bg-surface-elevated/10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary/30 to-primary-glow/10 blur-3xl" />
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Government Schemes
              </div>
              <h2 className="mt-1 font-display text-3xl font-bold text-gradient-primary">
                {state}
              </h2>
              {info && (
                <p className="mt-2 max-w-md text-xs sm:text-sm text-muted-foreground leading-relaxed">{info.blurb}</p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Total Schemes</span>
                  <span className="font-semibold">{schemes.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Available</span>
                  <span className="font-semibold">{filtered.length}</span>
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

            {schemes.length > 0 && (
              <>
                {/* Search Bar */}
                <div className="relative px-6 py-2 border-b border-border/60 bg-surface/20">
                  <Search className="absolute left-9 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search schemes for this state..."
                    className="w-full rounded-xl border border-border/80 bg-input/40 py-2.5 pl-9 pr-8 text-xs outline-none focus:border-primary transition-all focus:ring-1 focus:ring-primary/20"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-9 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter chips */}
                <div className="flex items-center gap-2 overflow-x-auto border-b border-border/60 px-6 py-2.5 scrollbar-none">
                  <Filter className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
                        category === c
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border/65 text-muted-foreground hover:text-foreground hover:border-border"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* List */}
            <div className="flex-1 space-y-3 overflow-y-auto p-5 scrollbar-thin">
              {schemes.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-muted/5 border border-border/40 text-muted-foreground/60 mb-4">
                    <ShieldQuestion className="h-7 w-7 opacity-30" />
                  </div>
                  <h4 className="font-semibold text-base">No Schemes cataloged yet</h4>
                  <p className="mt-2 text-xs text-muted-foreground max-w-[240px] leading-relaxed">
                    We are currently cataloging government incentives and subsidies for {state}.
                  </p>
                  <button className="mt-5 rounded-full border border-border/80 bg-surface/40 hover:bg-accent px-5 py-2 text-xs font-semibold transition-all">
                    Request State Schemes
                  </button>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center text-muted-foreground">
                  <p className="text-sm">No schemes match your filters.</p>
                  <button 
                    onClick={() => { setCategory("All"); setSearchQuery(""); }} 
                    className="mt-3 text-xs text-primary font-semibold hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                filtered.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i, 8) * 0.04, duration: 0.3 }}
                    whileHover={{ y: -2 }}
                    className="group relative w-full block overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-surface/80 to-surface-elevated/90 p-4 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-glow hover:bg-surface-elevated"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
                        <Sparkles className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3 relative z-10">
                          <a
                            href={`/scheme/${s.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              onSchemeClick(s);
                            }}
                            className="font-semibold leading-snug text-sm tracking-tight group-hover:text-primary transition-colors before:absolute before:-inset-4 before:z-0"
                          >
                            {s.name}
                          </a>
                          <ArrowRight className="h-4 w-4 shrink-0 translate-x-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary pointer-events-none" />
                        </div>
                        <div className="text-[10px] text-muted-foreground/80 font-medium tracking-wide mt-0.5 truncate uppercase relative z-10 pointer-events-none">
                          {s.department}
                        </div>
                        <div className="mt-2 relative z-10 pointer-events-none">
                          <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-semibold text-primary uppercase tracking-wider">
                            {s.category}
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground leading-relaxed relative z-10 pointer-events-none">
                          {s.shortDescription}
                        </p>
                        <div className="mt-4 pt-3 border-t border-border/40 flex justify-end relative z-20">
                          <a 
                            href={s.officialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-3 py-1.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-1.5"
                          >
                            Apply Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* CTA */}
            <div className="border-t border-border/80 bg-primary/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Can't find a specific subsidy?</div>
                  <div className="text-[10px] text-muted-foreground truncate">
                    Let us match the right scheme for your industry.
                  </div>
                </div>
                <button className="shrink-0 rounded-full bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-[10px] font-bold text-primary-foreground shadow-glow hover:scale-[1.03] transition-all">
                  Get Assistance
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
