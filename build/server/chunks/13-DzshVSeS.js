import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { u as userStore } from './user-store-BIsLnfE1.js';
import 'mongoose';

const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");
    if (!firstName || !lastName || !email || !password) {
      return fail(400, { error: "All fields are required" });
    }
    const existing = await userStore.getUserByEmail(email);
    if (existing) return fail(400, { error: "Email already registered" });
    const hashed = await bcrypt.hash(password, 10);
    await userStore.addUser({ firstName, lastName, email, password: hashed });
    throw redirect(303, "/login");
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 13;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-MtH610rq.js')).default;
const server_id = "src/routes/(auth)/signup/+page.server.js";
const imports = ["_app/immutable/nodes/13.yDWyy62x.js","_app/immutable/chunks/BmKnE-Dz.js","_app/immutable/chunks/CC1UzcQ5.js","_app/immutable/chunks/DPPnFs8J.js","_app/immutable/chunks/unqreKJi.js","_app/immutable/chunks/tQfqKTYA.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=13-DzshVSeS.js.map
