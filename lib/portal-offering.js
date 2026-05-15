import { neon } from "@neondatabase/serverless";

/**
 * @typedef {object} PortalOfferingDocument
 * @property {string} id
 * @property {string} name
 * @property {string} mimeType
 * @property {string|null} url
 * @property {string|null} key
 */

/**
 * @typedef {object} PortalInvestorClass
 * @property {string} id
 * @property {string} name
 * @property {number} minimumInvestmentCents
 * @property {number|null} preferredReturnPercentage
 */

/**
 * @typedef {object} PortalOfferingSnapshot
 * @property {string} id
 * @property {string} name
 * @property {string} regulation
 * @property {string} rule
 * @property {string} description
 * @property {string|null} contactEmailAddress
 * @property {string} projectName
 * @property {{ type: string, firstName: string|null, lastName: string|null, entityName: string|null }} sponsor
 * @property {PortalInvestorClass[]} investorClasses
 * @property {PortalOfferingDocument[]} documents
 */

/**
 * Published offering snapshot for marketing pages.
 * Server-only: load from diversyfund-portal Postgres (not the LP `DATABASE_URL` marketing DB).
 * Set `PORTAL_DATABASE_URL` to the same Neon URL you use in diversyfund-portal (see that repo’s `.env.local`).
 */
function getPortalSql() {
  const url = process.env.PORTAL_DATABASE_URL?.trim();
  if (!url) return null;
  return neon(url);
}

/** Portal stores minimums as whole USD cents (see diversyfund-portal `investor_class`). */
export function formatUsdFromCents(cents) {
  const n = Number(cents);
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n / 100);
}

/**
 * @param {string} offeringId
 * @returns {Promise<PortalOfferingSnapshot | null>}
 */
export async function getPublishedOfferingSnapshot(offeringId) {
  const sql = getPortalSql();
  if (!sql) return null;

  try {
    const rows = await sql`
      SELECT
        o.id,
        o.name,
        o.regulation,
        o.rule,
        o.description,
        o.contact_email_address,
        p.name AS project_name,
        per.type AS sponsor_type,
        per.first_name AS sponsor_first_name,
        per.last_name AS sponsor_last_name,
        per.entity_name AS sponsor_entity_name
      FROM offering o
      INNER JOIN project p ON p.id = o.project_id
      INNER JOIN person per ON per.id = p.lead_sponsor_id
      WHERE o.id = ${offeringId}
        AND o.published = true
        AND p.published = true
    `;

    if (!rows?.length) return null;

    const row = rows[0];

    const classes = await sql`
      SELECT id, name, minimum_investment, preferred_return_percentage
      FROM investor_class
      WHERE offering_id = ${offeringId}
      ORDER BY name
    `;

    const documents = await sql`
      SELECT id, name, mime_type, url, key
      FROM offering_document
      WHERE offering_id = ${offeringId}
      ORDER BY name
    `;

    return {
      id: row.id,
      name: row.name,
      regulation: row.regulation,
      rule: row.rule,
      description: row.description || "",
      contactEmailAddress: row.contact_email_address,
      projectName: row.project_name,
      sponsor: {
        type: row.sponsor_type,
        firstName: row.sponsor_first_name,
        lastName: row.sponsor_last_name,
        entityName: row.sponsor_entity_name,
      },
      investorClasses: (classes || []).map((c) => ({
        id: c.id,
        name: c.name,
        minimumInvestmentCents: c.minimum_investment,
        preferredReturnPercentage: c.preferred_return_percentage,
      })),
      documents: (documents || []).map((d) => ({
        id: d.id,
        name: d.name,
        mimeType: d.mime_type,
        url: d.url,
        key: d.key,
      })),
    };
  } catch {
    return null;
  }
}

export function sponsorDisplayName(sponsor) {
  if (!sponsor) return "—";
  if (sponsor.type === "natural-person" && sponsor.firstName) {
    return [sponsor.firstName, sponsor.lastName].filter(Boolean).join(" ").trim();
  }
  return sponsor.entityName || "—";
}
