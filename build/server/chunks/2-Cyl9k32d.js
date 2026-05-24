import { redirect } from '@sveltejs/kit';

function load({ locals }) {
  if (!locals.user) throw redirect(303, "/login");
  return { user: locals.user };
}

var _layout_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-D4hF_vLa.js')).default;
const server_id = "src/routes/(app)/+layout.server.js";
const imports = ["_app/immutable/nodes/2.9UVYQKHj.js","_app/immutable/chunks/BmKnE-Dz.js","_app/immutable/chunks/CC1UzcQ5.js","_app/immutable/chunks/DikK5JNx.js","_app/immutable/chunks/tQfqKTYA.js","_app/immutable/chunks/D-6UqWNZ.js","_app/immutable/chunks/unqreKJi.js","_app/immutable/chunks/Ci0iJIL7.js","_app/immutable/chunks/vl9EpSt6.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server as server, server_id, stylesheets };
//# sourceMappingURL=2-Cyl9k32d.js.map
