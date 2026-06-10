import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  roleId: text("role_id").notNull(),
  mfaEnabled: integer("mfa_enabled", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
});

export const roles = sqliteTable("roles", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
});

export const permissions = sqliteTable("permissions", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  description: text("description").notNull(),
});

export const rolePermissions = sqliteTable(
  "role_permissions",
  {
    roleId: text("role_id").notNull(),
    permissionId: text("permission_id").notNull(),
  },
  (table) => [index("role_permissions_role_idx").on(table.roleId)],
);

export const pages = sqliteTable("pages", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  status: text("status", { enum: ["draft", "scheduled", "published", "inactive"] })
    .notNull()
    .default("draft"),
  seoMetadataId: text("seo_metadata_id"),
  publishAt: text("publish_at"),
  expireAt: text("expire_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const sections = sqliteTable(
  "sections",
  {
    id: text("id").primaryKey(),
    pageId: text("page_id").notNull(),
    type: text("type").notNull(),
    title: text("title"),
    sortOrder: integer("sort_order").notNull().default(0),
    status: text("status", { enum: ["active", "inactive"] }).notNull().default("active"),
    settingsJson: text("settings_json", { mode: "json" }),
  },
  (table) => [index("sections_page_idx").on(table.pageId)],
);

export const components = sqliteTable(
  "components",
  {
    id: text("id").primaryKey(),
    sectionId: text("section_id").notNull(),
    componentType: text("component_type").notNull(),
    contentJson: text("content_json", { mode: "json" }).notNull(),
    animationJson: text("animation_json", { mode: "json" }),
    sortOrder: integer("sort_order").notNull().default(0),
    status: text("status", { enum: ["active", "inactive"] }).notNull().default("active"),
  },
  (table) => [index("components_section_idx").on(table.sectionId)],
);

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  bucketKey: text("bucket_key").notNull().unique(),
  type: text("type", { enum: ["image", "video", "document", "animation", "icon", "logo"] })
    .notNull(),
  fileName: text("file_name").notNull(),
  altText: text("alt_text"),
  caption: text("caption"),
  metadataJson: text("metadata_json", { mode: "json" }),
  status: text("status", { enum: ["active", "inactive", "deleted"] })
    .notNull()
    .default("active"),
  createdAt: text("created_at").notNull(),
});

export const seoMetadata = sqliteTable("seo_metadata", {
  id: text("id").primaryKey(),
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  canonicalUrl: text("canonical_url"),
  openGraphJson: text("open_graph_json", { mode: "json" }),
  schemaJson: text("schema_json", { mode: "json" }),
  keywords: text("keywords"),
});

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone"),
  inquiry: text("inquiry").notNull(),
  status: text("status", { enum: ["new", "in_progress", "closed"] }).notNull().default("new"),
  createdAt: text("created_at").notNull(),
});

export const auditLogs = sqliteTable(
  "audit_logs",
  {
    id: text("id").primaryKey(),
    actorUserId: text("actor_user_id").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id").notNull(),
    action: text("action").notNull(),
    beforeJson: text("before_json", { mode: "json" }),
    afterJson: text("after_json", { mode: "json" }),
    ipAddress: text("ip_address"),
    createdAt: text("created_at").notNull(),
  },
  (table) => [index("audit_entity_idx").on(table.entityType, table.entityId)],
);
