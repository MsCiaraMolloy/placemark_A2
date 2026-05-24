import { fail, redirect } from '@sveltejs/kit';
import { p as poiStore } from './poi-store-DoGEeRLy.js';
import 'mongoose';

async function load({ params }) {
  const poi = await poiStore.getPoiById(params.id);
  if (!poi) throw redirect(303, "/dashboard");
  return { active: "dashboard", poi: JSON.parse(JSON.stringify(poi)) };
}
const actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();
    const fields = {
      name: data.get("name"),
      description: data.get("description"),
      category: data.get("category"),
      location: data.get("location"),
      lat: data.get("lat") ? parseFloat(data.get("lat")) : null,
      lng: data.get("lng") ? parseFloat(data.get("lng")) : null,
      image: data.get("image") || ""
    };
    if (!fields.name || !fields.description || !fields.category || !fields.location) {
      return fail(400, { error: "All fields are required" });
    }
    await poiStore.updatePoi(params.id, fields);
    throw redirect(303, "/dashboard");
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C2wlG8cT.js')).default;
const server_id = "src/routes/(app)/poi/[id]/+page.server.js";
const imports = ["_app/immutable/nodes/11.wCtPmALQ.js","_app/immutable/chunks/BmKnE-Dz.js","_app/immutable/chunks/CC1UzcQ5.js","_app/immutable/chunks/DPPnFs8J.js","_app/immutable/chunks/unqreKJi.js","_app/immutable/chunks/tQfqKTYA.js","_app/immutable/chunks/DY3WgBCG.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=11-sUQs3Zh4.js.map
