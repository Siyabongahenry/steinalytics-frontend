// src/features/emailOrganizer/utils/emailParser.js

// Normalize an email to lowercase, trimmed
export function normalizeEmail(s) {
  return String(s || "").trim().toLowerCase();
}

// Try to parse a single token like:
// "Smith, John <john.smith@acme.com>"
// "John Smith <john.smith@acme.com>"
// "john.smith@acme.com"
function parseOneToken(str) {
  const s = (str || "").trim();
  if (!s) return null;

  // Pattern: "Surname, Name <email>"
  let match = s.match(/^([^,]+),\s*([^<]+)<([^>]+)>$/);
  if (match) {
    return {
      surname: match[1].trim(),
      name: match[2].trim(),
      email: normalizeEmail(match[3]),
    };
  }

  // Pattern: "Name Surname <email>"
  match = s.match(/^(.+?)\s*<([^>]+)>$/);
  if (match) {
    const fullName = match[1].trim();
    const parts = fullName.split(/\s+/);
    const surname = parts.length > 1 ? parts.pop() : "";
    const name = parts.join(" ");
    return { name, surname, email: normalizeEmail(match[2]) };
  }

  // Pattern: just an email
  match = s.match(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
  );
  if (match) {
    return { name: "", surname: "", email: normalizeEmail(match[0]) };
  }

  return null;
}

// Split a block of Outlook-style addresses into tokens
function splitTokens(block) {
  return String(block || "")
    .replace(/\n+/g, ";") // replace newlines with semicolons
    .split(";")
    .map((t) => t.trim())
    .filter(Boolean);
}

// Main: parse Outlook "To/CC" block into array of objects
export function parseOutlookBlock(block) {
  const tokens = splitTokens(block);
  const out = [];
  for (const t of tokens) {
    const parsed = parseOneToken(t);
    if (parsed && parsed.email) out.push(parsed);
  }
  return out;
}

// Remove duplicates by email
export function dedupeByEmail(list) {
  const map = new Map();
  for (const r of list) {
    const key = normalizeEmail(r.email);
    if (!key) continue;
    if (!map.has(key)) {
      map.set(key, { ...r, email: key });
    }
  }
  return Array.from(map.values());
}

// Convert recipients back to Outlook format string
export function formatAsOutlookList(list) {
  return list
    .filter((r) => r.email)
    .map((r) => {
      const name = (r.name || "").trim();
      const surname = (r.surname || "").trim();
      if (name && surname) return `${surname}, ${name} <${normalizeEmail(r.email)}>`;
      if (name || surname) return `${name || surname} <${normalizeEmail(r.email)}>`;
      return `<${normalizeEmail(r.email)}>`;
    })
    .join("; ");
}