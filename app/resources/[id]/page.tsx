import { notFound } from "next/navigation";
import { defaultCmsData } from "@/lib/airfree-content";

type ResourcePageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return defaultCmsData.blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: ResourcePageProps) {
  const { id } = await params;
  const post = defaultCmsData.blogPosts.find((item) => item.id === id);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | AIRFREE Resources`,
    description: `Airfree ${post.category} resource managed by the CMS.`,
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { id } = await params;
  const post = defaultCmsData.blogPosts.find((item) => item.id === id);

  if (!post) {
    notFound();
  }

  return (
    <main className="detail-page">
      <nav className="detail-nav">
        <a className="brand-mark dark-mark" href="/">
          <span>AF</span>
          <strong>AIRFREE</strong>
        </a>
        <a href="/resources">Resources</a>
      </nav>

      <article className="article-page">
        <p className="eyebrow light">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="article-meta">
          {post.status} · {post.publishAt}
        </p>
        <p>
          This article record is part of the Airfree CMS model. In the next
          production phase, the body, author, tags, scheduling, SEO metadata,
          and public publishing workflow should be persisted in the database
          and managed through Superadmin.
        </p>
        <h2>Editorial controls</h2>
        <p>
          Draft, scheduled, and published states are represented today. The
          production backend should enforce scheduled publication, history,
          rollback, and role-based editorial permissions.
        </p>
      </article>
    </main>
  );
}
