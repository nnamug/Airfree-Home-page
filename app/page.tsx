import {
  architectureLayers,
  brand,
  metrics,
  navigation,
  platforms,
} from "@/lib/airfree-content";

const industries = [
  "Government",
  "Telecom",
  "Financial services",
  "Logistics",
  "Energy",
  "Smart cities",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#0d1726]">
      <section className="hero-band">
        <nav className="site-nav" aria-label="Primary navigation">
          <a className="brand-mark" href="#top" aria-label="Airfree home">
            <span>AF</span>
            <strong>{brand.name}</strong>
          </a>
          <div className="nav-links">
            {navigation.map((item) => (
              <a key={item} href={item === "Superadmin" ? "/admin" : `#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div id="top" className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Sovereign digital infrastructure company</p>
            <h1>{brand.name}</h1>
            <p className="hero-promise">{brand.promise}</p>
            <p className="hero-description">{brand.description}</p>
            <div className="hero-actions">
              <a href="#contact" className="button-primary">
                {brand.primaryCta}
              </a>
              <a href="#platforms" className="button-secondary">
                {brand.secondaryCta}
              </a>
            </div>
          </div>

          <div className="ops-map" aria-label="Animated infrastructure operations map">
            <div className="map-grid" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="node node-core">AIRFREE CORE</div>
            <div className="node node-a">Cloud</div>
            <div className="node node-b">Maps</div>
            <div className="node node-c">Mail</div>
            <div className="node node-d">Domains</div>
            <div className="signal signal-one" />
            <div className="signal signal-two" />
          </div>
        </div>

        <div className="metric-strip" aria-label="Airfree operating metrics">
          {metrics.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="platforms" className="section-wrap">
        <div className="section-heading">
          <p className="eyebrow light">Infrastructure platforms</p>
          <h2>One governed gateway for every Airfree business unit.</h2>
          <p>
            Each platform page is modeled as editable sections, components,
            media, statistics, pricing blocks, videos, CTAs, SEO records, and
            publishing controls.
          </p>
        </div>
        <div className="platform-grid">
          {platforms.map((platform) => (
            <article className="platform-card" key={platform.slug}>
              <div className="card-topline">
                <span>{platform.category}</span>
                <em>{platform.status}</em>
              </div>
              <h3>{platform.name}</h3>
              <p>{platform.summary}</p>
              <ul>
                {platform.capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="architecture" className="dark-section">
        <div className="section-heading invert">
          <p className="eyebrow">Enterprise architecture</p>
          <h2>Built as a content-managed operating system, not a brochure.</h2>
          <p>
            The implementation separates presentation, content, media,
            permissions, analytics, and audit history so future units can be
            added without redesigning the platform.
          </p>
        </div>
        <div className="architecture-stack">
          {architectureLayers.map((layer, index) => (
            <article key={layer}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{layer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="sovereignty" className="split-section">
        <div>
          <p className="eyebrow light">Sovereignty and security</p>
          <h2>Designed for regulated teams that need control.</h2>
          <p>
            Airfree’s administrative layer includes MFA-ready roles, granular
            permissions, version rollback, media governance, and audit logs for
            every content and configuration change.
          </p>
        </div>
        <div className="control-list">
          {[
            "JWT sessions, MFA posture, and role-based access control",
            "WAF integration, rate limiting, CSRF and XSS protections",
            "Page, media, SEO, social, menu, blog, and analytics management",
            "Content scheduling, deactivation, version comparison, and rollback",
          ].map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section id="industries" className="industry-band">
        <div className="section-heading">
          <p className="eyebrow light">Industries</p>
          <h2>Infrastructure-grade services for mission-critical markets.</h2>
        </div>
        <div className="industry-grid">
          {industries.map((industry) => (
            <span key={industry}>{industry}</span>
          ))}
        </div>
      </section>

      <section id="resources" className="resources-section">
        <article>
          <p className="eyebrow light">CMS managed content</p>
          <h2>Superadmin owns every visible element.</h2>
          <p>
            The content model covers pages, sections, components, text, media,
            menus, social links, animations, statistics, testimonials, blogs,
            SEO metadata, settings, audit logs, and publishing windows.
          </p>
          <a href="/admin" className="button-primary light-button">
            Open Superadmin
          </a>
        </article>
        <article id="contact" className="contact-panel">
          <span>Lead generation</span>
          <h3>Request an infrastructure briefing</h3>
          <form>
            <input aria-label="Name" placeholder="Name" />
            <input aria-label="Company" placeholder="Company" />
            <input aria-label="Email" placeholder="Email" type="email" />
            <select aria-label="Interest">
              <option>Airfree Cloud</option>
              <option>Airfree Geospatial</option>
              <option>Airfree Mail</option>
              <option>Full platform suite</option>
            </select>
            <button type="button">Create lead</button>
          </form>
        </article>
      </section>

      <footer className="site-footer">
        <strong>{brand.name}</strong>
        <span>{brand.promise}</span>
        <a href="/api/content">Content API</a>
      </footer>
    </main>
  );
}
