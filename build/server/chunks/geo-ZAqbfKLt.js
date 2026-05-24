import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';

const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const geojsonPath = path.join(__dirname$1, "../../../../static/ireland-counties.geojson");
const countiesGeoJson = JSON.parse(readFileSync(geojsonPath, "utf8"));
function getCountyForPoi(lat, lng) {
  const pt = point([lng, lat]);
  for (const feature of countiesGeoJson.features) {
    if (booleanPointInPolygon(pt, feature)) return feature.properties.name;
  }
  return null;
}
const categoryColours = { A: "#2d8a2d", B: "#f5c518", C: "#ff8c00", D: "#e03030" };
const categoryScore = { A: 100, B: 75, C: 50, D: 25, E: 0 };
function dominantCategory(cats) {
  const counts = {};
  cats.forEach((c) => {
    const k = (c || "").toUpperCase().charAt(0);
    if (["A", "B", "C", "D"].includes(k)) counts[k] = (counts[k] || 0) + 1;
  });
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || null;
}
function calcGreenScore(pois) {
  const counted = pois.filter((p) => categoryScore[p.category?.toUpperCase()] !== void 0);
  if (!counted.length) return null;
  const total = counted.reduce((sum, p) => sum + categoryScore[p.category.toUpperCase()], 0);
  return Math.round(total / counted.length);
}

export { categoryColours as a, calcGreenScore as c, dominantCategory as d, getCountyForPoi as g };
//# sourceMappingURL=geo-ZAqbfKLt.js.map
