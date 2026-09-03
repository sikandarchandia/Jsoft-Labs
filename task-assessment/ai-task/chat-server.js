const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const propertiesPath = path.join(__dirname, "properties.json");
const properties = JSON.parse(fs.readFileSync(propertiesPath, "utf8"));

function normalizeCity(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function extractEntities(message) {
  const text = String(message || "");
  const lower = text.toLowerCase();

  const entities = {
    city: null,
    priceMax: null,
    bedrooms: null,
  };

  const priceMatch =
    lower.match(/(?:under|below|up to|max|<=|less than)\s*\$?\s*(\d+)/i) ||
    lower.match(/\$?\s*(\d+)\s*(?:or less|or lower)\b/i);
  if (priceMatch) entities.priceMax = parseInt(priceMatch[1], 10);

  const bedsMatch =
    lower.match(/(\d+)\s*(?:bedrooms|bedroom|beds|bed|br)\b/i) ||
    lower.match(/\b(\d+)\s*br\b/i);
  if (bedsMatch) entities.bedrooms = parseInt(bedsMatch[1], 10);

  const inMatch = lower.match(/\bin\s+([a-z\s]+?)(?=\s+(?:under|below|up to|max|with|beds?|bedrooms?|price|at)\b|$)/i);
  if (inMatch) {
    const rawCity = inMatch[1].trim();
    const city = rawCity
      .split(/\s+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    entities.city = city;
  }

  return entities;
}

function buildReply({ results, entities }) {
  if (!results.length) return "No results found. Try adjusting your filters.";

  const parts = [];
  if (entities.city) parts.push(`in ${entities.city}`);
  if (entities.priceMax != null) parts.push(`under $${entities.priceMax}`);
  if (entities.bedrooms != null) parts.push(`${entities.bedrooms}+ bedrooms`);

  const where = parts.length ? ` ${parts.join(" ")}` : "";
  return `Found ${results.length} properties${where}.`;
}

app.post("/chat", (req, res) => {
  const message = req.body && req.body.message ? req.body.message : "";
  const intent = "search_property";
  const entities = extractEntities(message);

  const cityNorm = entities.city ? normalizeCity(entities.city) : null;
  const filtered = properties.filter(p => {
    if (cityNorm) {
      if (normalizeCity(p.city) !== cityNorm) return false;
    }
    if (entities.priceMax != null) {
      if (parseInt(p.price, 10) > entities.priceMax) return false;
    }
    if (entities.bedrooms != null) {
      if (parseInt(p.bedrooms, 10) < entities.bedrooms) return false;
    }
    return true;
  });

  const reply = buildReply({ results: filtered, entities });
  const results = filtered.map(p => ({
    id: p.id,
    city: p.city,
    bedrooms: p.bedrooms,
    price: p.price,
  }));

  res.json({
    reply,
    results,
    intent,
    entities: {
      city: entities.city,
      priceMax: entities.priceMax,
      bedrooms: entities.bedrooms,
    },
  });
});

const PORT = 4003;
app.listen(PORT, () => {
  console.log(`Chat API running on http://localhost:${PORT}`);
  console.log("POST /chat");
});

