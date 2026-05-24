import { redirect } from '@sveltejs/kit';
import { u as userStore } from './user-store-BIsLnfE1.js';
import { p as poiStore } from './poi-store-DoGEeRLy.js';
import 'mongoose';

async function load({ params, locals }) {
  if (!locals.user.isAdmin) throw redirect(303, "/dashboard");
  const user = await userStore.getUserById(params.id);
  if (!user) throw redirect(303, "/admin");
  const pois = await poiStore.getUserPois(user._id);
  return {
    active: "admin",
    viewUser: JSON.parse(JSON.stringify(user)),
    pois: JSON.parse(JSON.stringify(pois))
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BPjXpGvc.js')).default;
const server_id = "src/routes/(app)/admin/user/[id]/+page.server.js";
const imports = ["_app/immutable/nodes/7.hQFGAVQv.js","_app/immutable/chunks/BmKnE-Dz.js","_app/immutable/chunks/CC1UzcQ5.js","_app/immutable/chunks/DPPnFs8J.js","_app/immutable/chunks/unqreKJi.js","_app/immutable/chunks/tQfqKTYA.js","_app/immutable/chunks/B_OYSU34.js","_app/immutable/chunks/DY3WgBCG.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=7-CJeg0L7M.js.map
