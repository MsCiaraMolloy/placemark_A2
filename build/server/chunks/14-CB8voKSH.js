import { redirect } from '@sveltejs/kit';

const actions = {
  default: async ({ cookies }) => {
    cookies.delete("session", { path: "/" });
    throw redirect(303, "/");
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 14;
const server_id = "src/routes/logout/+page.server.js";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=14-CB8voKSH.js.map
