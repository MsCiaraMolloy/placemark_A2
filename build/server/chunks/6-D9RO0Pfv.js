import { redirect } from '@sveltejs/kit';
import { u as userStore } from './user-store-BIsLnfE1.js';
import { p as poiStore } from './poi-store-DoGEeRLy.js';
import { d as dominantCategory, a as categoryColours, c as calcGreenScore } from './geo-ZAqbfKLt.js';
import 'mongoose';
import 'fs';
import 'url';
import 'path';
import '@turf/boolean-point-in-polygon';
import '@turf/helpers';

async function load({ locals }) {
  if (!locals.user.isAdmin) throw redirect(303, "/dashboard");
  const users = await userStore.getAllUsers();
  const usersWithData = await Promise.all(
    users.map(async (user) => {
      const pois = await poiStore.getUserPois(user._id);
      const cats = pois.map((p) => p.category || "");
      const dom = dominantCategory(cats);
      return {
        _id: String(user._id),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        poiCount: pois.length,
        greenScore: calcGreenScore(pois),
        footprintColour: dom ? categoryColours[dom] : "#aaaaaa"
      };
    })
  );
  return { active: "admin", users: usersWithData };
}
const actions = {
  deleteUser: async ({ request, locals }) => {
    if (!locals.user.isAdmin) throw redirect(303, "/dashboard");
    const data = await request.formData();
    await userStore.deleteUserById(data.get("id"));
    throw redirect(303, "/admin");
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B8eEm_zt.js')).default;
const server_id = "src/routes/(app)/admin/+page.server.js";
const imports = ["_app/immutable/nodes/6.DBmfgJdD.js","_app/immutable/chunks/BmKnE-Dz.js","_app/immutable/chunks/CC1UzcQ5.js","_app/immutable/chunks/DPPnFs8J.js","_app/immutable/chunks/unqreKJi.js","_app/immutable/chunks/tQfqKTYA.js","_app/immutable/chunks/B_OYSU34.js","_app/immutable/chunks/DY3WgBCG.js","_app/immutable/chunks/Ci0iJIL7.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=6-D9RO0Pfv.js.map
