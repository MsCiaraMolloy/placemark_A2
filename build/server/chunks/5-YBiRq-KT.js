import { u as userStore } from './user-store-BIsLnfE1.js';
import { p as poiStore } from './poi-store-DoGEeRLy.js';
import { g as getCountyForPoi, d as dominantCategory, a as categoryColours } from './geo-ZAqbfKLt.js';
import 'mongoose';
import 'fs';
import 'url';
import 'path';
import '@turf/boolean-point-in-polygon';
import '@turf/helpers';

async function load() {
  const users = await userStore.getAllUsers();
  const countyCats = {};
  for (const user of users) {
    const pois = await poiStore.getUserPois(user._id);
    pois.forEach((poi) => {
      if (poi.lat && poi.lng) {
        const county = getCountyForPoi(poi.lat, poi.lng);
        if (county) {
          if (!countyCats[county]) countyCats[county] = [];
          countyCats[county].push(poi.category || "");
        }
      }
    });
  }
  const countyColours = {};
  Object.entries(countyCats).forEach(([county, cats]) => {
    const dom = dominantCategory(cats);
    countyColours[county] = dom ? categoryColours[dom] : "#cccccc";
  });
  return { active: "about", countyColours };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BQe838oL.js')).default;
const server_id = "src/routes/(app)/about/+page.server.js";
const imports = ["_app/immutable/nodes/5.Cfq5JIdQ.js","_app/immutable/chunks/BmKnE-Dz.js","_app/immutable/chunks/CC1UzcQ5.js","_app/immutable/chunks/D-6UqWNZ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=5-YBiRq-KT.js.map
