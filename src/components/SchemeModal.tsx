import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Check, FileText, ListChecks, Workflow, Award } from "lucide-react";
import { useEffect } from "react";
import type { Scheme } from "@/data/schemes";

type Props = {
  scheme: Scheme | null;
  onClose: () => void;
};

const Section = ({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) => (
  <div>
    <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
      <Icon className="h-4 w-4 text-primary" />
      {title}
    </div>
    <ul className="space-y-2">
      {items.map((b, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="glass fixed inset-y-0 right-0 z-[70] flex w-full max-w-xl flex-col overflow-hidden border-l border-border shadow-elegant"
          >
            <div className="relative overflow-hidden border-b border-border p-6">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br from-primary/30 to-primary-glow/10 blur-3xl" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                  {scheme.state}
                </span>
                <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                  {scheme.category}
                </span>
              </div>
              <h2 className="mt-4 max-w-md font-display text-2xl font-bold leading-tight">
                {scheme.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{scheme.department}</p>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{scheme.description}</p>
              <Section icon={Award} title="Key Benefits" items={scheme.benefits} />
              <Section icon={ListChecks} title="Eligibility Criteria" items={scheme.eligibility} />
              <Section icon={FileText} title="Required Documents" items={scheme.documents} />
              <Section icon={Workflow} title="Application Process" items={scheme.process} />
            </div>

            <div className="border-t border-border p-5">
              <a
                href={scheme.website}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]"
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
