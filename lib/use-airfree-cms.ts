"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AirfreeCmsData,
  AnalyticsEvent,
  AuditLog,
  ContentVersion,
  defaultCmsData,
  Lead,
} from "./airfree-content";

const STORAGE_KEY = "airfree.cms.v1";
const SESSION_KEY = "airfree.admin.session.v1";

function cloneDefaults(): AirfreeCmsData {
  return JSON.parse(JSON.stringify(defaultCmsData)) as AirfreeCmsData;
}

function mergeCmsData(candidate: Partial<AirfreeCmsData>): AirfreeCmsData {
  return {
    ...cloneDefaults(),
    ...candidate,
    brand: { ...defaultCmsData.brand, ...candidate.brand },
    settings: { ...defaultCmsData.settings, ...candidate.settings },
    seo: { ...defaultCmsData.seo, ...candidate.seo },
    navigation: candidate.navigation ?? defaultCmsData.navigation,
    platforms: candidate.platforms ?? defaultCmsData.platforms,
    metrics: candidate.metrics ?? defaultCmsData.metrics,
    architectureLayers: candidate.architectureLayers ?? defaultCmsData.architectureLayers,
    adminModules: candidate.adminModules ?? defaultCmsData.adminModules,
    industries: candidate.industries ?? defaultCmsData.industries,
    socialLinks: candidate.socialLinks ?? defaultCmsData.socialLinks,
    mediaAssets: candidate.mediaAssets ?? defaultCmsData.mediaAssets,
    blogPosts: candidate.blogPosts ?? defaultCmsData.blogPosts,
    leads: candidate.leads ?? defaultCmsData.leads,
    auditLogs: candidate.auditLogs ?? defaultCmsData.auditLogs,
    analyticsEvents: candidate.analyticsEvents ?? defaultCmsData.analyticsEvents,
    versions: candidate.versions ?? defaultCmsData.versions,
  };
}

function readCmsData(): AirfreeCmsData {
  if (typeof window === "undefined") {
    return cloneDefaults();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return cloneDefaults();
  }

  try {
    return mergeCmsData(JSON.parse(stored) as Partial<AirfreeCmsData>);
  } catch {
    return cloneDefaults();
  }
}

function makeAudit(action: string, entity: string, beforeValue: unknown, afterValue: unknown): AuditLog {
  return {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    actor: "Local Superadmin",
    action,
    entity,
    beforeValue: JSON.stringify(beforeValue),
    afterValue: JSON.stringify(afterValue),
    createdAt: new Date().toISOString(),
  };
}

function makeEvent(type: AnalyticsEvent["type"], label: string, path: string): AnalyticsEvent {
  return {
    id: `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    label,
    path,
    createdAt: new Date().toISOString(),
  };
}

function createSnapshot(current: AirfreeCmsData, label: string): ContentVersion {
  const { versions: _versions, ...snapshot } = current;

  return {
    id: `version-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    label,
    createdAt: new Date().toISOString(),
    snapshot,
  };
}

export function useAirfreeCms() {
  const [cms, setCms] = useState<AirfreeCmsData>(() => cloneDefaults());
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(() => ({
    authenticated: false,
    user: "",
    role: "Viewer",
    mfaVerified: false,
  }));

  useEffect(() => {
    setCms(readCmsData());
    const storedSession = window.localStorage.getItem(SESSION_KEY);
    if (storedSession) {
      try {
        setSession(JSON.parse(storedSession));
      } catch {
        window.localStorage.removeItem(SESSION_KEY);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cms));
    }
  }, [cms, ready]);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  }, [ready, session]);

  const leadStats = useMemo(() => {
    const total = cms.leads.length;
    const active = cms.leads.filter((lead) => lead.status !== "closed").length;
    const closed = cms.leads.filter((lead) => lead.status === "closed").length;

    return [
      { label: "Total leads", value: String(total), trend: `${active} active` },
      { label: "In progress", value: String(cms.leads.filter((lead) => lead.status === "in_progress").length), trend: "pipeline" },
      { label: "Closed", value: String(closed), trend: "won" },
    ];
  }, [cms.leads]);

  function updateCms(action: string, entity: string, updater: (current: AirfreeCmsData) => AirfreeCmsData) {
    setCms((current) => {
      const next = updater(current);
      const audit = makeAudit(action, entity, current[entity as keyof AirfreeCmsData] ?? entity, next[entity as keyof AirfreeCmsData] ?? entity);
      const version = createSnapshot(current, `Before ${action}`);
      const event = makeEvent("admin_action", action, "/admin");

      return {
        ...next,
        versions: [version, ...current.versions].slice(0, 20),
        auditLogs: [audit, ...next.auditLogs].slice(0, 80),
        analyticsEvents: [event, ...next.analyticsEvents].slice(0, 120),
      };
    });
  }

  function addLead(lead: Omit<Lead, "id" | "status" | "createdAt">) {
    const nextLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    updateCms("Created lead", "leads", (current) => ({
      ...current,
      leads: [nextLead, ...current.leads],
      analyticsEvents: [
        makeEvent("lead_created", `Lead created: ${nextLead.inquiry}`, "/#contact"),
        ...current.analyticsEvents,
      ],
    }));
  }

  function resetCms() {
    const next = cloneDefaults();
    next.auditLogs = [makeAudit("Reset CMS", "settings", "custom local content", "default Airfree content"), ...next.auditLogs];
    setCms(next);
  }

  function restoreVersion(versionId: string) {
    setCms((current) => {
      const version = current.versions.find((item) => item.id === versionId);
      if (!version) {
        return current;
      }

      const audit = makeAudit("Restored version", "versions", current.brand.name, version.label);
      return {
        ...version.snapshot,
        versions: [createSnapshot(current, "Before rollback"), ...current.versions].slice(0, 20),
        auditLogs: [audit, ...current.auditLogs].slice(0, 80),
        analyticsEvents: [makeEvent("admin_action", `Restored ${version.label}`, "/admin"), ...current.analyticsEvents].slice(0, 120),
      };
    });
  }

  function trackEvent(type: AnalyticsEvent["type"], label: string, path: string) {
    setCms((current) => ({
      ...current,
      analyticsEvents: [makeEvent(type, label, path), ...current.analyticsEvents].slice(0, 120),
    }));
  }

  function login(user: string, role: string, mfaCode: string) {
    const authenticated = user.trim().length > 0 && mfaCode.trim().length >= 4;
    const nextSession = {
      authenticated,
      user: user.trim() || "local-admin@airfree.local",
      role,
      mfaVerified: authenticated,
    };
    setSession(nextSession);
    trackEvent("admin_action", `Login ${authenticated ? "succeeded" : "failed"} for ${role}`, "/admin");
    return authenticated;
  }

  function logout() {
    setSession({
      authenticated: false,
      user: "",
      role: "Viewer",
      mfaVerified: false,
    });
    trackEvent("admin_action", "Logged out", "/admin");
  }

  function exportCms() {
    return JSON.stringify(cms, null, 2);
  }

  return {
    cms,
    ready,
    leadStats,
    setCms,
    updateCms,
    addLead,
    resetCms,
    restoreVersion,
    trackEvent,
    session,
    login,
    logout,
    exportCms,
  };
}
