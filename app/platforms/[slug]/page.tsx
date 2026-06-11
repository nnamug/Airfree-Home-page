import { notFound } from "next/navigation";
import { defaultCmsData } from "@/lib/airfree-content";

type PlatformPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return defaultCmsData.platforms.map((platform) => ({ slug: platform.slug }));
}

export async function generateMetadata({ params }: PlatformPageProps) {
  const { slug } = await params;
  const platform = defaultCmsData.platforms.find((item) => item.slug === slug);

  if (!platform) {
    return {};
  }

  return {
    title: `${platform.name} | AIRFREE`,
    description: platform.summary,
  };
}

export default async function PlatformPage({ params }: PlatformPageProps) {
  const { slug } = await params;
  const platform = defaultCmsData.platforms.find((item) => item.slug === slug);

  if (!platform) {
    notFound();
  }

  return (
    <main className="detail-page">
      <nav className="detail-nav">
        <a className="brand-mark dark-mark" href="/">
          <span>AF</span>
          <strong>AIRFREE</strong>
        </a>
        <a href="/admin">Superadmin</a>
      </nav>

      <section className="detail-hero">
        <p className="eyebrow light">{platform.category}</p>
        <h1>{platform.name}</h1>
        <p>{platform.summary}</p>
        <div className="detail-actions">
          <a className="button-primary light-button" href="/#contact">
            Request briefing
          </a>
          <a className="button-secondary admin-button" href="/#platforms">
            All platforms
          </a>
        </div>
      </section>

      <section className="detail-grid">
        <article>
          <h2>Editable page sections</h2>
          <p>
            This platform page is modeled for hero content, feature sections,
            media galleries, statistics, pricing blocks, videos, CTA blocks,
            SEO records, and publishing status.
          </p>
        </article>
        <article>
          <h2>Operational status</h2>
          <p>{platform.status}</p>
        </article>
        {platform.capabilities.map((capability) => (
          <article key={capability}>
            <h2>{capability}</h2>
            <p>
              Managed from Superadmin as component content with future support
              for media, animation controls, version history, and audit logs.
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
