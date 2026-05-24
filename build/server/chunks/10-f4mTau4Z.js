import { u as userStore } from './user-store-BIsLnfE1.js';
import { p as poiStore } from './poi-store-DoGEeRLy.js';
import { g as getCountyForPoi, c as calcGreenScore, d as dominantCategory, a as categoryColours } from './geo-ZAqbfKLt.js';
import 'mongoose';
import 'fs';
import 'url';
import 'path';
import '@turf/boolean-point-in-polygon';
import '@turf/helpers';

async function load() {
  const users = await userStore.getAllUsers();
  const allPois = [];
  const countyCats = {};
  const usersWithScores = await Promise.all(
    users.map(async (user) => {
      const pois = await poiStore.getUserPois(user._id);
      pois.forEach((poi) => {
        if (poi.lat && poi.lng) {
          const county = getCountyForPoi(poi.lat, poi.lng);
          allPois.push({
            name: poi.name,
            description: poi.description,
            category: poi.category || "",
            location: poi.location || "",
            lat: poi.lat,
            lng: poi.lng,
            owner: `${user.firstName} ${user.lastName}`,
            county: county || "Unknown"
          });
          if (county) {
            if (!countyCats[county]) countyCats[county] = [];
            countyCats[county].push(poi.category || "");
          }
        }
      });
      const score = calcGreenScore(pois);
      const treeCount = score !== null ? Math.max(1, Math.round(score / 20)) : 0;
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        greenScore: score,
        treeCount,
        emptyCount: 5 - treeCount
      };
    })
  );
  const countyColours = {};
  Object.entries(countyCats).forEach(([county, cats]) => {
    const dom = dominantCategory(cats);
    countyColours[county] = dom ? categoryColours[dom] : "#cccccc";
  });
  return { active: "ourspace", users: usersWithScores, allPois, countyColours };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CwvNyamy.js')).default;
const server_id = "src/routes/(app)/ourspace/+page.server.js";
const imports = ["_app/immutable/nodes/10.DANr07Rl.js","_app/immutable/chunks/BmKnE-Dz.js","_app/immutable/chunks/CC1UzcQ5.js","_app/immutable/chunks/D-6UqWNZ.js","_app/immutable/chunks/DPPnFs8J.js","_app/immutable/chunks/unqreKJi.js","_app/immutable/chunks/tQfqKTYA.js","_app/immutable/chunks/B_OYSU34.js"];
const stylesheets = ["_app/immutable/assets/10.DD_yDphv.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=10-f4mTau4Z.js.map
