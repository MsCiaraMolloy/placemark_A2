import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { u as userStore } from './user-store-BIsLnfE1.js';
import { c as createToken } from './auth-BKYE8tjw.js';
import 'mongoose';
import 'jsonwebtoken';

const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");
    const user = await userStore.getUserByEmail(email);
    if (!user) return fail(400, { error: "Invalid email or password" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return fail(400, { error: "Invalid email or password" });
    const token = createToken(user);
    cookies.set("session", token, { path: "/", httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
    throw redirect(303, "/dashboard");
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-_2S_2fpN.js')).default;
const server_id = "src/routes/(auth)/login/+page.server.js";
const imports = ["_app/immutable/nodes/12.CKOfYRFb.js","_app/immutable/chunks/BmKnE-Dz.js","_app/immutable/chunks/CC1UzcQ5.js","_app/immutable/chunks/DPPnFs8J.js","_app/immutable/chunks/unqreKJi.js","_app/immutable/chunks/tQfqKTYA.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=12-DKeMo1Zh.js.map
