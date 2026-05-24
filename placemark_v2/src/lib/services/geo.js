import { readFileSync } from 'fs';
import path from 'path';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';

const geojsonPath = path.join(process.cwd(), 'static', 'ireland-counties.geojson');
export const countiesGeoJson = JSON.parse(readFileSync(geojsonPath, 'utf8'));

export function getCountyForPoi(lat, lng) {
  const pt = point([lng, lat]);
  for (const feature of countiesGeoJson.features) {
    if (booleanPointInPolygon(pt, feature)) return feature.properties.name;
  }
  return null;
}

export const categoryColours = { A: '#2d8a2d', B: '#f5c518', C: '#ff8c00', D: '#e03030' };
export const categoryScore = { A: 100, B: 75, C: 50, D: 25, E: 0 };

export function dominantCategory(cats) {
  const counts = {};
  cats.forEach((c) => {
    const k = (c || '').toUpperCase().charAt(0);
    if (['A', 'B', 'C', 'D'].includes(k)) counts[k] = (counts[k] || 0) + 1;
  });
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || null;
}

export function calcGreenScore(pois) {
  if (!pois.length) return null;

  // BER component (60% of score)
  const berScore = { A: 100, B: 75, C: 50, D: 25 };
  const berPois = pois.filter((p) => berScore[p.category?.toUpperCase()] !== undefined);
  const berAvg = berPois.length
    ? berPois.reduce((sum, p) => sum + berScore[p.category.toUpperCase()], 0) / berPois.length
    : 0;

  // Sustainability components (10% each)
  const total = pois.length;
  const solarPct = (pois.filter((p) => p.hasSolarPanels).length / total) * 100;
  const recyclingPct = (pois.filter((p) => p.hasRecyclingBin).length / total) * 100;
  const compostPct = (pois.filter((p) => p.hasCompostBin).length / total) * 100;
  const foodPct = (pois.filter((p) => p.growsOwnFood).length / total) * 100;

  const score = (berAvg * 0.6) + (solarPct * 0.1) + (recyclingPct * 0.1) + (compostPct * 0.1) + (foodPct * 0.1);
  return Math.round(score);
}
