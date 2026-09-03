const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const propertiesPath = path.join(__dirname, "properties.json");
const properties = JSON.parse(fs.readFileSync(propertiesPath, "utf8"));

const CITIES = [...new Set(properties.map((p) => p.city))];

function normalizeCity(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function matchCityFromText(text) {
  const lower = text.toLowerCase();
  for (const city of CITIES) {
    if (lower.includes(normalizeCity(city))) return city;
  }
  const inMatch = lower.match(
    /\bin\s+([a-z\s]+?)(?=\s+(?:under|below|up to|max|with|beds?|bedrooms?|price|at|for)\b|$)/i
  );
  if (inMatch) {
    const guess = inMatch[1]
      .trim()
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const hit = CITIES.find((c) => normalizeCity(c) === normalizeCity(guess));
    if (hit) return hit;
    return guess;
  }
  return null;
}

function detectIntent(message) {
  const lower = String(message || "").toLowerCase().trim();
  if (!lower) return "unknown";
  if (/^(hi|hello|hey|good morning|good evening)\b/.test(lower)) return "greeting";
  if (/help|what can you do|how does this work|commands/.test(lower)) return "help";
  if (/cities|locations|where do you have|available cities/.test(lower)) return "list_cities";
  if (/cheapest|lowest price|most affordable|budget/.test(lower)) return "cheapest";
  if (/most expensive|highest price|luxury/.test(lower)) return "most_expensive";
  if (/how many|total listings|count/.test(lower)) return "count";
  if (/search|show|find|apartment|property|bedroom|under|below|in\s+\w/.test(lower))
    return "search_property";
  return "search_property";
}

function extractEntities(message) {
  const lower = String(message || "").toLowerCase();
  const entities = { city: null, priceMax: null, priceMin: null, bedrooms: null };

  const priceMaxMatch =
    lower.match(/(?:under|below|up to|max|<=|less than)\s*\$?\s*(\d+)/i) ||
    lower.match(/\$?\s*(\d+)\s*(?:or less|or lower)\b/i);
  if (priceMaxMatch) entities.priceMax = parseInt(priceMaxMatch[1], 10);

  const priceMinMatch =
    lower.match(/(?:over|above|more than|at least|min|>=)\s*\$?\s*(\d+)/i) ||
    lower.match(/\$?\s*(\d+)\s*(?:or more|\+)\b/i);
  if (priceMinMatch) entities.priceMin = parseInt(priceMinMatch[1], 10);

  const bedsMatch =
    lower.match(/(\d+)\s*(?:bedrooms|bedroom|beds|bed|br)\b/i) ||
    lower.match(/\b(\d+)\s*br\b/i);
  if (bedsMatch) entities.bedrooms = parseInt(bedsMatch[1], 10);

  entities.city = matchCityFromText(message);
  return entities;
}

function filterProperties(entities) {
  const cityNorm = entities.city ? normalizeCity(entities.city) : null;
  return properties.filter((p) => {
    if (cityNorm && normalizeCity(p.city) !== cityNorm) return false;
    if (entities.priceMax != null && p.price > entities.priceMax) return false;
    if (entities.priceMin != null && p.price < entities.priceMin) return false;
    if (entities.bedrooms != null && p.bedrooms < entities.bedrooms) return false;
    return true;
  });
}

function formatResults(list) {
  return list.map((p) => ({
    id: p.id,
    city: p.city,
    bedrooms: p.bedrooms,
    price: p.price,
  }));
}

function buildSuggestions(intent, entities, results) {
  const suggestions = [];

  if (intent === "greeting" || intent === "help" || intent === "unknown") {
    suggestions.push(
      "Show me apartments under $1200 in New York",
      "What cities do you have?",
      "Cheapest apartments available"
    );
    return suggestions;
  }

  if (intent === "list_cities") {
    suggestions.push(
      "Show properties in Austin under $1000",
      "Find 2 bedrooms in Seattle"
    );
    return suggestions;
  }

  if (results.length === 0) {
    if (entities.city) {
      suggestions.push(`Show all properties in ${entities.city}`);
      suggestions.push("What cities do you have?");
    } else {
      suggestions.push("Cheapest apartments available");
      suggestions.push("Show me apartments under $1500");
    }
    if (entities.priceMax) {
      suggestions.push(`Find apartments under $${entities.priceMax + 200}`);
    }
    return suggestions.slice(0, 3);
  }

  if (entities.city && !entities.priceMax) {
    suggestions.push(`Cheapest in ${entities.city}`);
    suggestions.push(`2 bedrooms in ${entities.city}`);
  }
  if (entities.city && entities.priceMax) {
    suggestions.push(`Show all properties in ${entities.city}`);
  }
  if (results.length >= 1) {
    const otherCity = CITIES.find((c) => normalizeCity(c) !== normalizeCity(entities.city || ""));
    if (otherCity) suggestions.push(`Compare with ${otherCity}`);
  }
  suggestions.push("What cities do you have?");

  return [...new Set(suggestions)].slice(0, 4);
}

function buildReply(intent, entities, results) {
  if (intent === "greeting") {
    return "Hi! I can help you search rental listings by city, price, and bedrooms. Try asking something like: apartments under $1200 in New York.";
  }
  if (intent === "help") {
    return "You can ask me to search properties by city, max price, or bedroom count. Examples: Show me apartments under $1200 in New York, Find 2 bedrooms in Austin, or What cities do you have?";
  }
  if (intent === "list_cities") {
    return `We currently have listings in: ${CITIES.join(", ")}. Tell me a city and budget to get started.`;
  }
  if (intent === "count") {
    return `We have ${properties.length} active listings across ${CITIES.length} cities.`;
  }
  if (intent === "cheapest") {
    const sorted = [...properties].sort((a, b) => a.price - b.price);
    const top = sorted.slice(0, 3);
    const cityNote = entities.city ? ` in ${entities.city}` : "";
    if (entities.city) {
      const inCity = sorted.filter((p) => normalizeCity(p.city) === normalizeCity(entities.city));
      if (!inCity.length) return `No listings found in ${entities.city}. Available cities: ${CITIES.join(", ")}.`;
      return `Cheapest${cityNote}: ${inCity[0].city} — $${inCity[0].price}/mo (${inCity[0].bedrooms} bed). I found ${inCity.length} total there.`;
    }
    return `Our most affordable options start at $${top[0].price}/mo in ${top[0].city}. Here are the top ${top.length} budget-friendly picks.`;
  }
  if (intent === "most_expensive") {
    const top = [...properties].sort((a, b) => b.price - a.price)[0];
    return `The highest-priced listing is in ${top.city} at $${top.price}/mo with ${top.bedrooms} bedrooms.`;
  }

  if (!results.length) {
    const hints = [];
    if (entities.city) hints.push(`try a higher budget in ${entities.city}`);
    if (entities.priceMax) hints.push(`increase your max price above $${entities.priceMax}`);
    if (entities.bedrooms) hints.push(`reduce bedroom requirement below ${entities.bedrooms}`);
    const hint = hints.length ? ` You could ${hints.join(" or ")}.` : "";
    return `No results found for your search.${hint} Or ask: What cities do you have?`;
  }

  const parts = [];
  if (entities.city) parts.push(`in ${entities.city}`);
  if (entities.priceMax != null) parts.push(`under $${entities.priceMax}`);
  if (entities.priceMin != null) parts.push(`over $${entities.priceMin}`);
  if (entities.bedrooms != null) parts.push(`${entities.bedrooms}+ bedrooms`);
  const where = parts.length ? ` ${parts.join(", ")}` : "";

  const cheapest = [...results].sort((a, b) => a.price - b.price)[0];
  let extra = "";
  if (results.length > 1) {
    extra = ` Best value: ${cheapest.city} at $${cheapest.price}/mo.`;
  }
  return `Found ${results.length} ${results.length === 1 ? "property" : "properties"}${where}.${extra}`;
}

function handleCheapest(entities) {
  let list = [...properties].sort((a, b) => a.price - b.price);
  if (entities.city) {
    list = list.filter((p) => normalizeCity(p.city) === normalizeCity(entities.city));
  }
  return list.slice(0, 3);
}

app.post("/chat", (req, res) => {
  const message = req.body && req.body.message ? req.body.message : "";
  const intent = detectIntent(message);
  const entities = extractEntities(message);

  let results = [];
  if (intent === "search_property") {
    results = filterProperties(entities);
  } else if (intent === "cheapest") {
    results = handleCheapest(entities);
  } else if (intent === "most_expensive") {
    results = formatResults([...properties].sort((a, b) => b.price - a.price).slice(0, 3));
  }

  if (intent === "search_property") {
    results = formatResults(results);
  } else if (intent === "cheapest") {
    results = formatResults(results);
  }

  const reply = buildReply(intent, entities, results);
  const suggestions = buildSuggestions(intent, entities, results);

  res.json({
    reply,
    results,
    intent,
    entities: {
      city: entities.city,
      priceMax: entities.priceMax,
      priceMin: entities.priceMin,
      bedrooms: entities.bedrooms,
    },
    suggestions,
  });
});

const PORT = 4003;
app.listen(PORT, () => {
  console.log(`Chat API running on http://localhost:${PORT}`);
  console.log("POST /chat");
});
