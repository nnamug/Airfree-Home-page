import { defaultCmsData } from "@/lib/airfree-content";

export const metadata = {
  title: "Resources | AIRFREE",
  description: "Airfree articles, news, and announcements managed through the Superadmin content model.",
};

export default function ResourcesPage() {
  return (
    <main className="detail-page">
      <nav className="detail-nav">
        <a className="brand-mark dark-mark" href="/">
          <span>AF</span>
          <strong>AIRFREE</strong>
        </a>
        <a href="/admin">Superadmin</a>
      </nav>

      <section className="detail-hero compact">
        <p className="eyebrow light">Resources</p>
        <h1>Articles, news, and announcements</h1>
        <p>
          A public resource surface connected to the same blog records modeled
          in Superadmin.
        </p>
      </section>

      <section className="resource-grid">
        {defaultCmsData.blogPosts.map((post) => (
          <article key={post.id} className="resource-card">
            <span>{post.category}</span>
            <h2>{post.title}</h2>
            <p>Status: {post.status}</p>
            <p>Publish date: {post.publishAt}</p>
            <a className="text-link" href={`/resources/${post.id}`}>
              Read article
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
