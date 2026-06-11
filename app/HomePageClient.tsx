"use client";

import { FormEvent, useState } from "react";
import { useAirfreeCms } from "@/lib/use-airfree-cms";

export default function HomePageClient() {
  const { cms, addLead } = useAirfreeCms();
  const [lead, setLead] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    inquiry: "Full platform suite",
  });
  const [submitted, setSubmitted] = useState(false);

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!lead.name || !lead.email) {
      return;
    }
    addLead(lead);
    setSubmitted(true);
    setLead({
      name: "",
      company: "",
      email: "",
      phone: "",
      inquiry: "Full platform suite",
    });
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#0d1726]">
      {cms.settings.maintenanceMode ? (
        <section className="maintenance-banner">Maintenance mode is active in Superadmin.</section>
      ) : null}

      <section className="hero-band">
        <nav className="site-nav" aria-label="Primary navigation">
          <a className="brand-mark" href="#top" aria-label="Airfree home">
            <span>AF</span>
            <strong>{cms.brand.name}</strong>
          </a>
          <div className="nav-links">
            {cms.navigation.map((item) => (
              <a key={item} href={item === "Superadmin" ? "/admin" : `#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div id="top" className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Sovereign digital infrastructure company</p>
            <h1>{cms.brand.name}</h1>
            <p className="hero-promise">{cms.brand.promise}</p>
            <p className="hero-description">{cms.brand.description}</p>
            <div className="hero-actions">
              <a href="#contact" className="button-primary">
                {cms.brand.primaryCta}
              </a>
              <a href="#platforms" className="button-secondary">
                {cms.brand.secondaryCta}
              </a>
            </div>
          </div>

          <div className="ops-map" aria-label="Animated infrastructure operations map" data-disabled={!cms.settings.animationsEnabled}>
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
          {cms.metrics.map((metric) => (
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
          {cms.platforms.map((platform) => (
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
              <a className="text-link" href={`/platforms/${platform.slug}`}>
                View platform
              </a>
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
          {cms.architectureLayers.map((layer, index) => (
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
          {cms.industries.map((industry) => (
            <span key={industry}>{industry}</span>
          ))}
        </div>
      </section>

      <section id="resources" className="resources-section">
        <article>
          <p className="eyebrow light">CMS managed content</p>
          <h2>Superadmin owns every visible element.</h2>
          <p>
            The local CMS controls brand text, navigation, platform records,
            metrics, social links, SEO data, media metadata, blog records,
            leads, audit logs, and operating settings.
          </p>
          <a href="/admin" className="button-primary light-button">
            Open Superadmin
          </a>
          <a href="/resources" className="text-link resource-link">
            View resources
          </a>
        </article>
        <article id="contact" className="contact-panel">
          <span>Lead generation</span>
          <h3>Request an infrastructure briefing</h3>
          <form onSubmit={submitLead}>
            <input aria-label="Name" placeholder="Name" value={lead.name} onChange={(event) => setLead({ ...lead, name: event.target.value })} />
            <input aria-label="Company" placeholder="Company" value={lead.company} onChange={(event) => setLead({ ...lead, company: event.target.value })} />
            <input aria-label="Email" placeholder="Email" type="email" value={lead.email} onChange={(event) => setLead({ ...lead, email: event.target.value })} />
            <input aria-label="Phone" placeholder="Phone" value={lead.phone} onChange={(event) => setLead({ ...lead, phone: event.target.value })} />
            <select aria-label="Interest" value={lead.inquiry} onChange={(event) => setLead({ ...lead, inquiry: event.target.value })}>
              {cms.platforms.map((platform) => (
                <option key={platform.slug}>{platform.name}</option>
              ))}
              <option>Full platform suite</option>
            </select>
            <button type="submit">Create lead</button>
            {submitted ? <p className="form-status">Lead saved to Superadmin.</p> : null}
          </form>
        </article>
      </section>

      <footer className="site-footer">
        <strong>{cms.brand.name}</strong>
        <span>{cms.brand.promise}</span>
        <a href="/api/content">Content API</a>
      </footer>
    </main>
  );
}
