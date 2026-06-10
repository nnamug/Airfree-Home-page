import { adminModules, leadStages, metrics, platforms } from "@/lib/airfree-content";

const roleMatrix = [
  ["Superadmin", "Full platform control"],
  ["Administrator", "Operational management"],
  ["Content Manager", "Pages, sections, media, blog"],
  ["Marketing Manager", "Campaigns, CTAs, social links"],
  ["SEO Manager", "Metadata, schema, sitemap, robots"],
  ["Viewer", "Read-only dashboards"],
];

export default function AdminPage() {
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="brand-mark admin-brand" href="/">
          <span>AF</span>
          <strong>AIRFREE</strong>
        </a>
        <nav aria-label="Superadmin sections">
          {[
            "Dashboard",
            "Pages",
            "Media",
            "SEO",
            "Users",
            "Analytics",
            "Audit",
            "Settings",
          ].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <div>
            <p className="eyebrow light">Enterprise superadmin</p>
            <h1>Airfree content and infrastructure control center</h1>
          </div>
          <a href="/" className="button-secondary admin-button">
            View site
          </a>
        </header>

        <section id="dashboard" className="admin-kpis">
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
            </article>
          ))}
        </section>

        <section className="admin-grid">
          <div id="pages" className="admin-panel wide">
            <div className="panel-heading">
              <h2>Editable infrastructure pages</h2>
              <span>{platforms.length} active records</span>
            </div>
            <div className="content-table" role="table" aria-label="Infrastructure page records">
              {platforms.map((platform) => (
                <div className="table-row" role="row" key={platform.slug}>
                  <strong>{platform.name}</strong>
                  <span>{platform.category}</span>
                  <em>{platform.status}</em>
                  <button type="button">Edit</button>
                </div>
              ))}
            </div>
          </div>

          <div id="analytics" className="admin-panel">
            <div className="panel-heading">
              <h2>Lead pipeline</h2>
              <span>30 days</span>
            </div>
            <div className="lead-stack">
              {leadStages.map((stage) => (
                <article key={stage.label}>
                  <span>{stage.label}</span>
                  <strong>{stage.value}</strong>
                  <em>{stage.trend}</em>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="admin-grid" id="settings">
          {adminModules.map((module) => (
            <article className="admin-panel module-card" key={module.name}>
              <div className="panel-heading">
                <h2>{module.name}</h2>
                <span data-health={module.health}>{module.health}</span>
              </div>
              <p>{module.summary}</p>
              <ul>
                {module.permissions.map((permission) => (
                  <li key={permission}>{permission}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="users" className="admin-panel wide">
          <div className="panel-heading">
            <h2>RBAC role matrix</h2>
            <span>MFA ready</span>
          </div>
          <div className="role-grid">
            {roleMatrix.map(([role, scope]) => (
              <article key={role}>
                <strong>{role}</strong>
                <span>{scope}</span>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
