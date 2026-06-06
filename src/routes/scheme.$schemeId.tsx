import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Check, FileText, ListChecks, Workflow, Award, Building2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { getScheme } from "@/data/schemes";

export const Route = createFileRoute("/scheme/$schemeId")({
  loader: ({ params }) => {
    const scheme = getScheme(params.schemeId);
    if (!scheme) throw notFound();
    return { scheme };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.scheme.name} — FindMySubsidy` },
          { name: "description", content: loaderData.scheme.shortDescription },
          { property: "og:title", content: `${loaderData.scheme.name} (${loaderData.scheme.state})` },
          { property: "og:description", content: loaderData.scheme.shortDescription },
        ]
      : [{ title: "Scheme — FindMySubsidy" }],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GovernmentService",
              "name": loaderData.scheme.name,
              "provider": {
                "@type": "GovernmentOrganization",
                "name": `Government of ${loaderData.scheme.state}`,
              },
              "description": loaderData.scheme.description,
              "url": `https://findmysubsidy.com/scheme/${loaderData.scheme.id}`,
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What are the key benefits?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": loaderData.scheme.benefits.join(". "),
                  },
                },
                {
                  "@type": "Question",
                  "name": "Who is eligible?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": loaderData.scheme.eligibility.join(". "),
                  },
                },
              ],
            }),
          },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <Layout>
      <div className="mx-auto max-w-2xl p-10 text-center">
        <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <Link to="/schemes" className="mt-4 inline-block text-primary">← Back to schemes</Link>
      </div>
    </Layout>
  ),
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-2xl p-10 text-center">
        <h1 className="font-display text-2xl font-bold">Scheme not found</h1>
        <Link to="/schemes" className="mt-4 inline-block text-primary">← Browse all schemes</Link>
      </div>
    </Layout>
  ),
  component: SchemeDetail,
});

const Block = ({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) => (
  <div className="glass shadow-elegant rounded-2xl p-6">
    <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
      <Icon className="h-4 w-4 text-primary" />
      {title}
    </div>
    <ul className="space-y-3">
      {items.map((b, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

function SchemeDetail() {
  const { scheme } = Route.useLoaderData();
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Link
          to="/schemes"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all schemes
        </Link>

        <div
          className="relative mt-6 overflow-hidden rounded-3xl border border-border p-8 sm:p-10"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-primary/30 to-primary-glow/10 blur-3xl" />
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              {scheme.state}
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              {scheme.category}
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              <Building2 className="mr-1 inline h-3 w-3" />
              {scheme.department}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl">
            {scheme.name}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{scheme.description}</p>
          <a
            href={scheme.website}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            Visit Official Portal <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Block icon={Award} title="Key Benefits" items={scheme.benefits} />
          <Block icon={ListChecks} title="Eligibility" items={scheme.eligibility} />
          <Block icon={FileText} title="Required Documents" items={scheme.documents} />
          <Block icon={Workflow} title="Application Process" items={scheme.process} />
        </div>
      </section>
    </Layout>
  );
}
