"use client";

import { useEffect, useMemo, useState } from "react";
import { AirfreeCmsData, AuditLog, defaultCmsData, Lead } from "./airfree-content";

const STORAGE_KEY = "airfree.cms.v1";

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

export function useAirfreeCms() {
  const [cms, setCms] = useState<AirfreeCmsData>(() => cloneDefaults());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCms(readCmsData());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cms));
    }
  }, [cms, ready]);

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
      return {
        ...next,
        auditLogs: [audit, ...next.auditLogs].slice(0, 80),
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
    }));
  }

  function resetCms() {
    const next = cloneDefaults();
    next.auditLogs = [makeAudit("Reset CMS", "settings", "custom local content", "default Airfree content"), ...next.auditLogs];
    setCms(next);
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
    exportCms,
  };
}
