"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { BlogPost, MediaAsset, Platform } from "@/lib/airfree-content";
import { useAirfreeCms } from "@/lib/use-airfree-cms";

const roles = [
  ["Superadmin", "Full platform control", "all"],
  ["Administrator", "Operational management", "manage_operations"],
  ["Content Manager", "Pages, sections, media, blog", "edit_content"],
  ["Marketing Manager", "Campaigns, CTAs, social links", "edit_marketing"],
  ["SEO Manager", "Metadata, schema, sitemap, robots", "edit_seo"],
  ["Viewer", "Read-only dashboards", "view_only"],
];

function fieldValue(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  return event.target.value;
}

export default function AdminCms() {
  const {
    cms,
    leadStats,
    updateCms,
    resetCms,
    importCms,
    publishContent,
    restoreVersion,
    session,
    login,
    logout,
    exportCms,
  } = useAirfreeCms();
  const [active, setActive] = useState("Dashboard");
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState("");
  const [importStatus, setImportStatus] = useState("");
  const [loginForm, setLoginForm] = useState({
    user: "superadmin@airfree.local",
    role: "Superadmin",
    mfaCode: "",
  });

  const navItems = [
    "Dashboard",
    "Brand",
    "Platforms",
    "Media",
    "SEO",
    "Menus",
    "Social",
    "Blogs",
    "Leads",
    "Analytics",
    "Versions",
    "Users",
    "Audit",
    "Settings",
  ];

  const operationalScore = useMemo(() => {
    const modules = [
      cms.platforms.length > 0,
      cms.mediaAssets.length > 0,
      cms.seo.metaTitle.length > 0,
      cms.socialLinks.length > 0,
      cms.blogPosts.length > 0,
      cms.auditLogs.length > 0,
      roles.length > 0,
      cms.leads.length > 0,
    ];
    return Math.round((modules.filter(Boolean).length / modules.length) * 100);
  }, [cms]);

  function updatePlatform(slug: string, patch: Partial<Platform>) {
    updateCms("Updated platform", "platforms", (current) => ({
      ...current,
      platforms: current.platforms.map((platform) =>
        platform.slug === slug ? { ...platform, ...patch } : platform,
      ),
    }));
  }

  function addPlatform() {
    const next: Platform = {
      slug: `platform-${Date.now()}`,
      name: "New Airfree Platform",
      category: "Future Infrastructure Platform",
      summary: "Describe the new Airfree platform here.",
      capabilities: ["Capability one", "Capability two", "Capability three"],
      status: "planned",
    };
    updateCms("Created platform", "platforms", (current) => ({
      ...current,
      platforms: [...current.platforms, next],
    }));
  }

  function addMedia() {
    const next: MediaAsset = {
      id: `media-${Date.now()}`,
      name: "New media asset",
      type: "image",
      url: "https://example.com/asset.webp",
      altText: "Describe this asset",
      status: "active",
    };
    updateCms("Created media asset", "mediaAssets", (current) => ({
      ...current,
      mediaAssets: [next, ...current.mediaAssets],
    }));
  }

  function uploadMedia(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const type = file.type.startsWith("video/")
        ? "video"
        : file.type.includes("svg")
          ? "icon"
          : file.type.startsWith("image/")
            ? "image"
            : "document";

      const next: MediaAsset = {
        id: `media-${Date.now()}`,
        name: file.name,
        type,
        url: String(reader.result),
        altText: file.name.replace(/\.[^.]+$/, "").replaceAll("-", " "),
        status: "active",
      };

      updateCms("Uploaded local media", "mediaAssets", (current) => ({
        ...current,
        mediaAssets: [next, ...current.mediaAssets],
      }));
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function addBlogPost() {
    const next: BlogPost = {
      id: `post-${Date.now()}`,
      title: "New Airfree article",
      category: "Company",
      status: "draft",
      publishAt: new Date().toISOString().slice(0, 10),
    };
    updateCms("Created blog post", "blogPosts", (current) => ({
      ...current,
      blogPosts: [next, ...current.blogPosts],
    }));
  }

  async function copyExport() {
    await navigator.clipboard.writeText(exportCms());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function submitImport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = importCms(importText);
    setImportStatus(ok ? "Imported CMS JSON." : "Import failed. Check JSON shape.");
    if (ok) {
      setImportText("");
    }
  }

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login(loginForm.user, loginForm.role, loginForm.mfaCode);
  }

  if (!session.authenticated) {
    return (
      <main className="login-shell">
        <section className="login-panel">
          <a className="brand-mark dark-mark" href="/">
            <span>AF</span>
            <strong>AIRFREE</strong>
          </a>
          <div>
            <p className="eyebrow light">Superadmin access</p>
            <h1>Verify local administrator session</h1>
            <p>
              This localhost gate simulates the JWT/MFA login flow required for
              production. Enter any user and a 4+ digit MFA code.
            </p>
          </div>
          <form onSubmit={submitLogin} className="form-panel">
            <label>
              User
              <input value={loginForm.user} onChange={(event) => setLoginForm({ ...loginForm, user: fieldValue(event) })} />
            </label>
            <label>
              Role
              <select value={loginForm.role} onChange={(event) => setLoginForm({ ...loginForm, role: fieldValue(event) })}>
                {roles.map(([role]) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </label>
            <label>
              MFA code
              <input value={loginForm.mfaCode} onChange={(event) => setLoginForm({ ...loginForm, mfaCode: fieldValue(event) })} placeholder="123456" />
            </label>
            <button className="button-primary light-button" type="submit">
              Sign in
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="brand-mark admin-brand" href="/">
          <span>AF</span>
          <strong>AIRFREE</strong>
        </a>
        <nav aria-label="Superadmin sections">
          {navItems.map((item) => (
            <button
              className={active === item ? "active" : ""}
              key={item}
              onClick={() => setActive(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <div>
            <p className="eyebrow light">Enterprise superadmin</p>
            <h1>Airfree content and infrastructure control center</h1>
          </div>
          <div className="admin-header-actions">
            <a href="/" className="button-secondary admin-button">
              View site
            </a>
            <button type="button" className="admin-button" onClick={logout}>
              Sign out
            </button>
            <button type="button" className="admin-button" onClick={() => publishContent("Manual Superadmin publish")}>
              Publish
            </button>
            <button type="button" className="admin-danger" onClick={resetCms}>
              Reset CMS
            </button>
          </div>
        </header>

        {active === "Dashboard" ? (
          <>
            <section id="dashboard" className="admin-kpis">
              <article>
                <span>Completion score</span>
                <strong>{operationalScore}%</strong>
                <p>Local CMS modules with live editable data.</p>
              </article>
              <article>
                <span>Active pages</span>
                <strong>{cms.platforms.length + 1}</strong>
                <p>Homepage plus infrastructure platform records.</p>
              </article>
              <article>
                <span>Media records</span>
                <strong>{cms.mediaAssets.length}</strong>
                <p>Metadata-controlled images, videos, animations, icons, and logos.</p>
              </article>
              <article>
                <span>Audit entries</span>
                <strong>{cms.auditLogs.length}</strong>
                <p>Local change history with before and after values.</p>
              </article>
            </section>

            <section className="admin-grid">
              <div className="admin-panel">
                <div className="panel-heading">
                  <h2>Lead pipeline</h2>
                  <span>local</span>
                </div>
                <div className="lead-stack">
                  {leadStats.map((stage) => (
                    <article key={stage.label}>
                      <span>{stage.label}</span>
                      <strong>{stage.value}</strong>
                      <em>{stage.trend}</em>
                    </article>
                  ))}
                </div>
              </div>
              <div className="admin-panel">
                <div className="panel-heading">
                  <h2>Infrastructure status</h2>
                  <span>{cms.settings.securityLevel}</span>
                </div>
                <div className="status-grid">
                  {cms.adminModules.map((module) => (
                    <p key={module.name}>
                      <strong>{module.name}</strong>
                      <span data-health={module.health}>{module.health}</span>
                    </p>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : null}

        {active === "Brand" ? (
          <section className="admin-panel wide form-panel">
            <div className="panel-heading">
              <h2>Brand and hero content</h2>
              <span>CMS editable</span>
            </div>
            <label>
              Name
              <input value={cms.brand.name} onChange={(event) => updateCms("Updated brand name", "brand", (current) => ({ ...current, brand: { ...current.brand, name: fieldValue(event) } }))} />
            </label>
            <label>
              Promise
              <input value={cms.brand.promise} onChange={(event) => updateCms("Updated brand promise", "brand", (current) => ({ ...current, brand: { ...current.brand, promise: fieldValue(event) } }))} />
            </label>
            <label>
              Description
              <textarea value={cms.brand.description} onChange={(event) => updateCms("Updated brand description", "brand", (current) => ({ ...current, brand: { ...current.brand, description: fieldValue(event) } }))} />
            </label>
            <div className="two-col-fields">
              <label>
                Primary CTA
                <input value={cms.brand.primaryCta} onChange={(event) => updateCms("Updated primary CTA", "brand", (current) => ({ ...current, brand: { ...current.brand, primaryCta: fieldValue(event) } }))} />
              </label>
              <label>
                Secondary CTA
                <input value={cms.brand.secondaryCta} onChange={(event) => updateCms("Updated secondary CTA", "brand", (current) => ({ ...current, brand: { ...current.brand, secondaryCta: fieldValue(event) } }))} />
              </label>
            </div>
          </section>
        ) : null}

        {active === "Platforms" ? (
          <section className="admin-panel wide">
            <div className="panel-heading">
              <h2>Infrastructure pages</h2>
              <button type="button" onClick={addPlatform}>Add platform</button>
            </div>
            <div className="editor-list">
              {cms.platforms.map((platform) => (
                <article key={platform.slug} className="editor-card">
                  <div className="two-col-fields">
                    <label>
                      Name
                      <input value={platform.name} onChange={(event) => updatePlatform(platform.slug, { name: fieldValue(event) })} />
                    </label>
                    <label>
                      Category
                      <input value={platform.category} onChange={(event) => updatePlatform(platform.slug, { category: fieldValue(event) })} />
                    </label>
                  </div>
                  <label>
                    Summary
                    <textarea value={platform.summary} onChange={(event) => updatePlatform(platform.slug, { summary: fieldValue(event) })} />
                  </label>
                  <div className="two-col-fields">
                    <label>
                      Capabilities
                      <input value={platform.capabilities.join(", ")} onChange={(event) => updatePlatform(platform.slug, { capabilities: fieldValue(event).split(",").map((item) => item.trim()).filter(Boolean) })} />
                    </label>
                    <label>
                      Status
                      <select value={platform.status} onChange={(event) => updatePlatform(platform.slug, { status: fieldValue(event) as Platform["status"] })}>
                        <option>live</option>
                        <option>preview</option>
                        <option>planned</option>
                      </select>
                    </label>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {active === "Media" ? (
          <section className="admin-panel wide">
            <div className="panel-heading">
              <h2>Media library</h2>
              <div className="panel-actions">
                <label className="file-button">
                  Upload
                  <input type="file" accept="image/*,video/*,.pdf,.svg" onChange={uploadMedia} />
                </label>
                <button type="button" onClick={addMedia}>Add media</button>
              </div>
            </div>
            <div className="content-table media-table">
              {cms.mediaAssets.map((asset) => (
                <div className="table-row" key={asset.id}>
                  <input value={asset.name} aria-label="Media name" onChange={(event) => updateCms("Updated media", "mediaAssets", (current) => ({ ...current, mediaAssets: current.mediaAssets.map((item) => item.id === asset.id ? { ...item, name: fieldValue(event) } : item) }))} />
                  <select value={asset.type} aria-label="Media type" onChange={(event) => updateCms("Updated media type", "mediaAssets", (current) => ({ ...current, mediaAssets: current.mediaAssets.map((item) => item.id === asset.id ? { ...item, type: fieldValue(event) as MediaAsset["type"] } : item) }))}>
                    <option>image</option>
                    <option>video</option>
                    <option>document</option>
                    <option>animation</option>
                    <option>icon</option>
                    <option>logo</option>
                  </select>
                  <input value={asset.altText} aria-label="Alt text" onChange={(event) => updateCms("Updated media alt text", "mediaAssets", (current) => ({ ...current, mediaAssets: current.mediaAssets.map((item) => item.id === asset.id ? { ...item, altText: fieldValue(event) } : item) }))} />
                  <button type="button" onClick={() => updateCms("Toggled media", "mediaAssets", (current) => ({ ...current, mediaAssets: current.mediaAssets.map((item) => item.id === asset.id ? { ...item, status: item.status === "active" ? "inactive" : "active" } : item) }))}>{asset.status}</button>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {active === "SEO" ? (
          <section className="admin-panel wide form-panel">
            <div className="panel-heading">
              <h2>SEO management</h2>
              <span>{cms.seo.schemaType}</span>
            </div>
            {(["metaTitle", "metaDescription", "canonicalUrl", "keywords", "schemaType"] as const).map((field) => (
              <label key={field}>
                {field}
                <input value={cms.seo[field]} onChange={(event) => updateCms("Updated SEO", "seo", (current) => ({ ...current, seo: { ...current.seo, [field]: fieldValue(event) } }))} />
              </label>
            ))}
          </section>
        ) : null}

        {active === "Menus" ? (
          <section className="admin-panel wide form-panel">
            <div className="panel-heading">
              <h2>Menu management</h2>
              <span>{cms.navigation.length} links</span>
            </div>
            <label>
              Main menu items
              <input value={cms.navigation.join(", ")} onChange={(event) => updateCms("Updated navigation", "navigation", (current) => ({ ...current, navigation: fieldValue(event).split(",").map((item) => item.trim()).filter(Boolean) }))} />
            </label>
          </section>
        ) : null}

        {active === "Social" ? (
          <section className="admin-panel wide">
            <div className="panel-heading">
              <h2>Social links</h2>
              <span>{cms.socialLinks.filter((link) => link.active).length} active</span>
            </div>
            <div className="content-table social-table">
              {cms.socialLinks.map((link) => (
                <div className="table-row" key={link.network}>
                  <strong>{link.network}</strong>
                  <input value={link.url} aria-label={`${link.network} URL`} onChange={(event) => updateCms("Updated social link", "socialLinks", (current) => ({ ...current, socialLinks: current.socialLinks.map((item) => item.network === link.network ? { ...item, url: fieldValue(event) } : item) }))} />
                  <button type="button" onClick={() => updateCms("Toggled social link", "socialLinks", (current) => ({ ...current, socialLinks: current.socialLinks.map((item) => item.network === link.network ? { ...item, active: !item.active } : item) }))}>{link.active ? "active" : "hidden"}</button>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {active === "Blogs" ? (
          <section className="admin-panel wide">
            <div className="panel-heading">
              <h2>Blog management</h2>
              <button type="button" onClick={addBlogPost}>Add post</button>
            </div>
            <div className="content-table blog-table">
              {cms.blogPosts.map((post) => (
                <div className="table-row" key={post.id}>
                  <input value={post.title} aria-label="Blog title" onChange={(event) => updateCms("Updated blog post", "blogPosts", (current) => ({ ...current, blogPosts: current.blogPosts.map((item) => item.id === post.id ? { ...item, title: fieldValue(event) } : item) }))} />
                  <input value={post.category} aria-label="Blog category" onChange={(event) => updateCms("Updated blog category", "blogPosts", (current) => ({ ...current, blogPosts: current.blogPosts.map((item) => item.id === post.id ? { ...item, category: fieldValue(event) } : item) }))} />
                  <select value={post.status} aria-label="Blog status" onChange={(event) => updateCms("Updated blog status", "blogPosts", (current) => ({ ...current, blogPosts: current.blogPosts.map((item) => item.id === post.id ? { ...item, status: fieldValue(event) as BlogPost["status"] } : item) }))}>
                    <option>draft</option>
                    <option>scheduled</option>
                    <option>published</option>
                  </select>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {active === "Leads" ? (
          <section className="admin-panel wide">
            <div className="panel-heading">
              <h2>Contact leads</h2>
              <span>{cms.leads.length} records</span>
            </div>
            <div className="content-table lead-table">
              {cms.leads.map((lead) => (
                <div className="table-row" key={lead.id}>
                  <strong>{lead.name}</strong>
                  <span>{lead.company || "No company"}</span>
                  <span>{lead.email}</span>
                  <select value={lead.status} aria-label="Lead status" onChange={(event) => updateCms("Updated lead status", "leads", (current) => ({ ...current, leads: current.leads.map((item) => item.id === lead.id ? { ...item, status: fieldValue(event) as typeof lead.status } : item) }))}>
                    <option value="new">New</option>
                    <option value="in_progress">In progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {active === "Users" ? (
          <section className="admin-panel wide">
            <div className="panel-heading">
              <h2>RBAC role matrix</h2>
              <span>{session.role}</span>
            </div>
            <div className="session-strip">
              <strong>{session.user}</strong>
              <span>MFA verified: {session.mfaVerified ? "yes" : "no"}</span>
            </div>
            <div className="role-grid">
              {roles.map(([role, scope, permission]) => (
                <article key={role}>
                  <strong>{role}</strong>
                  <span>{scope}</span>
                  <em>{permission}</em>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {active === "Analytics" ? (
          <section className="admin-panel wide">
            <div className="panel-heading">
              <h2>Analytics events</h2>
              <span>{cms.analyticsEvents.length} events</span>
            </div>
            <div className="analytics-grid">
              {(["page_view", "lead_created", "admin_action", "content_publish"] as const).map((type) => (
                <article key={type}>
                  <span>{type}</span>
                  <strong>{cms.analyticsEvents.filter((event) => event.type === type).length}</strong>
                </article>
              ))}
            </div>
            <div className="audit-list">
              {cms.analyticsEvents.slice(0, 20).map((event) => (
                <article key={event.id}>
                  <strong>{event.label}</strong>
                  <span>{event.type} · {event.path}</span>
                  <time>{new Date(event.createdAt).toLocaleString()}</time>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {active === "Versions" ? (
          <section className="admin-panel wide">
            <div className="panel-heading">
              <h2>Version history and rollback</h2>
              <span>{cms.versions.length} snapshots</span>
            </div>
            <div className="audit-list">
              {cms.versions.length === 0 ? (
                <article>
                  <strong>No snapshots yet</strong>
                  <span>Edit content to create rollback snapshots.</span>
                  <time>local</time>
                </article>
              ) : null}
              {cms.versions.map((version) => (
                <article key={version.id}>
                  <strong>{version.label}</strong>
                  <span>{version.snapshot.brand.name}</span>
                  <button type="button" onClick={() => restoreVersion(version.id)}>
                    Restore
                  </button>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {active === "Audit" ? (
          <section className="admin-panel wide">
            <div className="panel-heading">
              <h2>Audit logs, export, and import</h2>
              <button type="button" onClick={copyExport}>{copied ? "Copied" : "Copy JSON"}</button>
            </div>
            <form className="import-panel" onSubmit={submitImport}>
              <label>
                Import CMS JSON
                <textarea value={importText} onChange={(event) => setImportText(fieldValue(event))} placeholder="Paste exported CMS JSON here" />
              </label>
              <button type="submit">Import</button>
              {importStatus ? <span>{importStatus}</span> : null}
            </form>
            <div className="audit-list">
              {cms.auditLogs.map((log) => (
                <article key={log.id}>
                  <strong>{log.action}</strong>
                  <span>{log.entity} by {log.actor}</span>
                  <time>{new Date(log.createdAt).toLocaleString()}</time>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {active === "Settings" ? (
          <section className="admin-panel wide form-panel">
            <div className="panel-heading">
              <h2>Security and runtime settings</h2>
              <span>{cms.settings.securityLevel}</span>
            </div>
            <label className="toggle-row">
              <input type="checkbox" checked={cms.settings.animationsEnabled} onChange={(event) => updateCms("Toggled animations", "settings", (current) => ({ ...current, settings: { ...current.settings, animationsEnabled: event.target.checked } }))} />
              Animations enabled
            </label>
            <label className="toggle-row">
              <input type="checkbox" checked={cms.settings.maintenanceMode} onChange={(event) => updateCms("Toggled maintenance mode", "settings", (current) => ({ ...current, settings: { ...current.settings, maintenanceMode: event.target.checked } }))} />
              Maintenance mode
            </label>
            <label>
              Security level
              <select value={cms.settings.securityLevel} onChange={(event) => updateCms("Updated security level", "settings", (current) => ({ ...current, settings: { ...current.settings, securityLevel: fieldValue(event) as typeof current.settings.securityLevel } }))}>
                <option>standard</option>
                <option>hardened</option>
                <option>restricted</option>
              </select>
            </label>
          </section>
        ) : null}
      </section>
    </main>
  );
}
