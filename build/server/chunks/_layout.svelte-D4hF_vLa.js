import { V as attr_style } from './renderer-Bb8TAqcF.js';
import './attributes-lIm1xnSy.js';
import './escaping-CqgfEcN3.js';

function Nav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { active = "", user = null } = $$props;
    $$renderer2.push(`<nav class="navbar" style="background-color: #1e5c1e; padding: 0.5rem 1rem;"><div class="navbar-brand"><div class="title p-3 is-flex" style="color: white; align-items: center;"><i style="font-size: 36px; color: #a8e6a8;" class="fas fa-map-marker-alt"></i> <div class="ml-3" style="font-size: 1.1rem; font-weight: 700; color: white;">Green Space - The Carbon Footprint Tracker</div></div> <button class="navbar-burger" id="navBurger" aria-label="menu" aria-expanded="false" style="color: white; background: none; border: none; cursor: pointer;"><span aria-hidden="true"></span> <span aria-hidden="true"></span> <span aria-hidden="true"></span></button></div> <div class="navbar-menu" id="navMenu" style="background-color: #1e5c1e;"><div class="navbar-end"><div class="navbar-item"><div class="buttons"><a class="button is-light" href="/dashboard"${attr_style(active === "dashboard" ? "background-color:#a8e6a8;color:#1e5c1e;font-weight:700;" : "font-weight:600;")}>Dashboard</a> <a class="button is-light" href="/ourspace"${attr_style(active === "ourspace" ? "background-color:#a8e6a8;color:#1e5c1e;font-weight:700;" : "font-weight:600;")}>Our Space</a> <a class="button is-light" href="/about"${attr_style(active === "about" ? "background-color:#a8e6a8;color:#1e5c1e;font-weight:700;" : "font-weight:600;")}>About</a> <a class="button is-light" href="/import"${attr_style(active === "import" ? "background-color:#a8e6a8;color:#1e5c1e;font-weight:700;" : "font-weight:600;")}>Import</a> `);
    if (user?.isAdmin) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a class="button is-warning" href="/admin"${attr_style(active === "admin" ? "font-weight:700;" : "font-weight:600;")}>Admin</a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" action="/logout" style="display:inline;"><button class="button" style="background-color:#a8e6a8;color:#1e5c1e;font-weight:700;">Logout</button></form></div></div></div></div></nav>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, children } = $$props;
    Nav($$renderer2, { active: data.active || "", user: data.user });
    $$renderer2.push(`<!----> `);
    children($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-D4hF_vLa.js.map
