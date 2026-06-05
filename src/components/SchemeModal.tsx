import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, FileText, ListChecks, Workflow, Award, Landmark } from "lucide-react";
import { useEffect } from "react";
import type { Scheme } from "@/data/schemes";

type Props = {
  scheme: Scheme | null;
  onClose: () => void;
};

const Section = ({ 
  icon: Icon, 
  title, 
  items, 
  iconColor, 
  bgColor 
}: { 
  icon: any; 
  title: string; 
  items: string[]; 
  iconColor: string; 
  bgColor: string; 
}) => (
  <div className="rounded-2xl border border-border/50 bg-surface/30 p-5 shadow-sm transition-all duration-300 hover:border-border/80">
    <div className="mb-3.5 flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-foreground">
      <div className={`grid h-8 w-8 place-items-center rounded-lg ${bgColor} ${iconColor}`}>
        <Icon className="h-4 w-4" />
      </div>
      <span>{title}</span>
    </div>
    <ul className="space-y-2.5">
      {items.map((b, i) => (
        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${iconColor} opacity-70`} />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

const StepperSection = ({ 
  icon: Icon, 
  title, 
  items, 
  iconColor, 
  bgColor 
}: { 
  icon: any; 
  title: string; 
  items: string[]; 
  iconColor: string; 
  bgColor: string; 
}) => (
  <div className="rounded-2xl border border-border/50 bg-surface/30 p-5 shadow-sm transition-all duration-300 hover:border-border/80 sm:col-span-2">
    <div className="mb-4 flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-foreground">
      <div className={`grid h-8 w-8 place-items-center rounded-lg ${bgColor} ${iconColor}`}>
        <Icon className="h-4 w-4" />
      </div>
      <span>{title}</span>
    </div>
    <div className="relative pl-5 border-l border-border/80 ml-4.5 space-y-5">
      {items.map((b, i) => (
        <div key={i} className="relative flex items-start gap-3.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {/* Step Number Dot */}
          <div className="absolute -left-[27px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-surface-elevated border border-border text-[9px] font-bold text-foreground">
            {i + 1}
          </div>
          <div className="min-w-0">
            <span>{b}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export function SchemeModal({ scheme, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {scheme && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md"
          />
          {/* Slide-over Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="glass fixed inset-y-0 right-0 z-[70] flex w-full max-w-xl flex-col overflow-hidden border-l border-border/60 shadow-elegant bg-background"
          >
            {/* Header */}
            <div className="relative overflow-hidden border-b border-border p-6 sm:p-8 bg-surface/10">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-primary/30 to-primary-glow/10 blur-3xl" />
              
              <button
                onClick={onClose}
                className="absolute right-6 top-6 grid h-9 w-9 place-items-center rounded-full border border-border bg-surface-elevated/40 text-muted-foreground transition-all hover:bg-accent hover:text-foreground hover:scale-[1.05]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap gap-2 pr-10">
                <span className="rounded-full bg-primary/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {scheme.state}
                </span>
                <span className="rounded-full border border-border/80 bg-surface/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {scheme.category}
                </span>
              </div>
              
              <h2 className="mt-4 max-w-md font-display text-2xl font-bold leading-snug tracking-tight text-foreground sm:text-3xl">
                {scheme.name}
              </h2>
              
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Landmark className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">{scheme.department}</span>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-8 scrollbar-thin">
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground bg-surface/20 border border-border/30 rounded-xl p-4.5">
                {scheme.description}
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <Section 
                  icon={Award} 
                  title="Key Benefits" 
                  items={scheme.benefits} 
                  iconColor="text-primary" 
                  bgColor="bg-primary/10" 
                />
                <Section 
                  icon={ListChecks} 
                  title="Eligibility Criteria" 
                  items={scheme.eligibility} 
                  iconColor="text-[oklch(0.70_0.15_220)]" 
                  bgColor="bg-[oklch(0.70_0.15_220)]/10" 
                />
                <Section 
                  icon={FileText} 
                  title="Required Documents" 
                  items={scheme.documents} 
                  iconColor="text-[oklch(0.68_0.18_300)]" 
                  bgColor="bg-[oklch(0.68_0.18_300)]/10" 
                />
                <StepperSection 
                  icon={Workflow} 
                  title="Application Process" 
                  items={scheme.process} 
                  iconColor="text-[oklch(0.78_0.16_70)]" 
                  bgColor="bg-[oklch(0.78_0.16_70)]/10" 
                />
              </div>
            </div>

            {/* Footer CTA */}
            <div className="border-t border-border p-5 bg-surface/20">
              <a
                href={scheme.website}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-5 py-3 text-xs sm:text-sm font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.01] hover:brightness-[1.05]"
              >
                Visit Official Portal
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
