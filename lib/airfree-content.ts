export type Platform = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  capabilities: string[];
  status: "live" | "preview" | "planned";
};

export type Metric = {
  label: string;
  value: string;
  detail: string;
};

export type AdminModule = {
  name: string;
  summary: string;
  permissions: string[];
  health: "operational" | "attention" | "scheduled";
};

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  inquiry: string;
  status: "new" | "in_progress" | "closed";
  createdAt: string;
};

export type MediaAsset = {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "animation" | "icon" | "logo";
  url: string;
  altText: string;
  status: "active" | "inactive";
};

export type BlogPost = {
  id: string;
  title: string;
  category: string;
  status: "draft" | "scheduled" | "published";
  publishAt: string;
};

export type SocialLink = {
  network: string;
  url: string;
  active: boolean;
};

export type SeoSettings = {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  keywords: string;
  schemaType: string;
};

export type AuditLog = {
  id: string;
  actor: string;
  action: string;
  entity: string;
  beforeValue: string;
  afterValue: string;
  createdAt: string;
};

export type AirfreeCmsData = {
  brand: typeof brand;
  navigation: string[];
  platforms: Platform[];
  metrics: Metric[];
  architectureLayers: string[];
  adminModules: AdminModule[];
  industries: string[];
  socialLinks: SocialLink[];
  mediaAssets: MediaAsset[];
  blogPosts: BlogPost[];
  leads: Lead[];
  seo: SeoSettings;
  auditLogs: AuditLog[];
  settings: {
    animationsEnabled: boolean;
    maintenanceMode: boolean;
    securityLevel: "standard" | "hardened" | "restricted";
  };
};

export const brand = {
  name: "AIRFREE",
  promise: "Building Sovereign Digital Infrastructure",
  description:
    "Airfree unifies geospatial, cloud, identity, communications, and workplace infrastructure for organizations that need resilient digital foundations.",
  primaryCta: "Talk to infrastructure team",
  secondaryCta: "Explore platforms",
};

export const navigation = [
  "Platforms",
  "Architecture",
  "Sovereignty",
  "Industries",
  "Resources",
  "Superadmin",
];

export const platforms: Platform[] = [
  {
    slug: "geospatial",
    name: "Airfree Geospatial",
    category: "Geospatial Infrastructure",
    summary:
      "Authoritative spatial datasets, routing primitives, and governance-ready location services for national-scale systems.",
    capabilities: ["Spatial data registry", "Parcel intelligence", "Routing APIs"],
    status: "live",
  },
  {
    slug: "maps",
    name: "Airfree Maps",
    category: "Location Intelligence Platform",
    summary:
      "Modern maps, search, geocoding, and operational dashboards for enterprises and public-sector teams.",
    capabilities: ["Vector maps", "Address search", "Field operations"],
    status: "live",
  },
  {
    slug: "cloud",
    name: "Airfree Cloud",
    category: "Cloud Infrastructure Platform",
    summary:
      "Secure compute, storage, deployment, and observability primitives designed for regulated workloads.",
    capabilities: ["Private regions", "Object storage", "Runtime monitoring"],
    status: "preview",
  },
  {
    slug: "domains",
    name: "Airfree Domains",
    category: "Digital Identity Infrastructure",
    summary:
      "Domain, DNS, and digital identity controls for institutions that need trusted online presence.",
    capabilities: ["DNS control", "Brand protection", "Identity records"],
    status: "preview",
  },
  {
    slug: "mail",
    name: "Airfree Mail",
    category: "Communication Infrastructure",
    summary:
      "Enterprise mail, authentication, and protected communication services with operational visibility.",
    capabilities: ["Secure mailboxes", "Policy controls", "Delivery analytics"],
    status: "live",
  },
  {
    slug: "workspace",
    name: "Airfree Workspace",
    category: "Digital Workplace Infrastructure",
    summary:
      "Collaboration, documents, calendars, and administration workflows for sovereign productivity.",
    capabilities: ["Teams", "Documents", "Admin policy"],
    status: "planned",
  },
];

export const metrics: Metric[] = [
  {
    value: "6",
    label: "Infrastructure platforms",
    detail: "Built around shared identity, governance, and monitoring.",
  },
  {
    value: "99.95%",
    label: "Target uptime",
    detail: "Designed for redundant cloud-native deployments.",
  },
  {
    value: "24/7",
    label: "Operations posture",
    detail: "Monitoring, audit trails, and incident visibility.",
  },
  {
    value: "95+",
    label: "Quality targets",
    detail: "Performance, accessibility, SEO, and best practices.",
  },
];

export const architectureLayers = [
  "Public website and infrastructure product pages",
  "Superadmin CMS, SEO, media, analytics, and RBAC",
  "REST API with future GraphQL-ready boundaries",
  "PostgreSQL/D1 content store, Redis cache, and R2/S3 media",
  "Containerized deployment with WAF, rate limiting, audit logs, and monitoring",
];

export const adminModules: AdminModule[] = [
  {
    name: "Pages and Sections",
    summary: "Create, schedule, reorder, deactivate, and version every visible page block.",
    permissions: ["edit_pages", "publish_content", "rollback_versions"],
    health: "operational",
  },
  {
    name: "Media Library",
    summary: "Manage images, videos, documents, icons, logos, alt text, captions, and metadata.",
    permissions: ["upload_media", "delete_media", "replace_assets"],
    health: "operational",
  },
  {
    name: "SEO Control",
    summary: "Control metadata, canonical URLs, Open Graph, schema markup, robots, and sitemap state.",
    permissions: ["edit_seo", "generate_sitemap", "preview_cards"],
    health: "operational",
  },
  {
    name: "Users and Roles",
    summary: "Manage superadmins, administrators, content managers, SEO managers, and viewers.",
    permissions: ["manage_users", "manage_roles", "enforce_mfa"],
    health: "attention",
  },
  {
    name: "Analytics and Leads",
    summary: "Track visitors, traffic sources, lead status, conversions, and infrastructure interest.",
    permissions: ["view_analytics", "export_leads", "update_lead_status"],
    health: "operational",
  },
  {
    name: "Audit and Versions",
    summary: "Record who changed what, compare versions, restore prior content, and export logs.",
    permissions: ["view_audit", "restore_content", "export_logs"],
    health: "scheduled",
  },
];

export const leadStages = [
  { label: "New leads", value: "42", trend: "+18%" },
  { label: "In progress", value: "17", trend: "+9%" },
  { label: "Closed", value: "8", trend: "+4%" },
];

export const defaultCmsData: AirfreeCmsData = {
  brand,
  navigation,
  platforms,
  metrics,
  architectureLayers,
  adminModules,
  industries: [
    "Government",
    "Telecom",
    "Financial services",
    "Logistics",
    "Energy",
    "Smart cities",
  ],
  socialLinks: [
    { network: "LinkedIn", url: "https://linkedin.com/company/airfree", active: true },
    { network: "X", url: "https://x.com/airfree", active: true },
    { network: "GitHub", url: "https://github.com/nnamug/Airfree-Home-page", active: true },
    { network: "YouTube", url: "https://youtube.com/@airfree", active: false },
    { network: "WhatsApp", url: "https://wa.me/", active: false },
  ],
  mediaAssets: [
    {
      id: "media-hero-grid",
      name: "Infrastructure operations grid",
      type: "animation",
      url: "css:ops-map",
      altText: "Animated infrastructure operations map",
      status: "active",
    },
    {
      id: "media-logo",
      name: "Airfree monogram",
      type: "logo",
      url: "text:AF",
      altText: "Airfree brand mark",
      status: "active",
    },
  ],
  blogPosts: [
    {
      id: "post-sovereign-infra",
      title: "Why sovereign infrastructure matters for digital economies",
      category: "Sovereignty",
      status: "draft",
      publishAt: "2026-07-01",
    },
    {
      id: "post-location-stack",
      title: "Designing a trusted location intelligence stack",
      category: "Geospatial",
      status: "scheduled",
      publishAt: "2026-07-15",
    },
  ],
  leads: [
    {
      id: "lead-sample",
      name: "Sample Enterprise Lead",
      company: "Airfree Demo",
      email: "lead@example.com",
      phone: "",
      inquiry: "Full platform suite",
      status: "new",
      createdAt: "2026-06-10T12:00:00.000Z",
    },
  ],
  seo: {
    metaTitle: "AIRFREE | Sovereign Digital Infrastructure",
    metaDescription:
      "Official corporate website and platform gateway for Airfree sovereign digital infrastructure.",
    canonicalUrl: "https://airfree.local/",
    keywords: "sovereign infrastructure, geospatial, cloud, domains, mail, workspace",
    schemaType: "Organization",
  },
  auditLogs: [
    {
      id: "audit-seed",
      actor: "System",
      action: "Seeded CMS",
      entity: "content",
      beforeValue: "empty",
      afterValue: "default Airfree content",
      createdAt: "2026-06-10T12:00:00.000Z",
    },
  ],
  settings: {
    animationsEnabled: true,
    maintenanceMode: false,
    securityLevel: "hardened",
  },
};
