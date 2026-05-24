import { Y as ensure_array_like, V as attr_style, a8 as stringify } from './renderer-Bb8TAqcF.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { c as attr } from './attributes-lIm1xnSy.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    $$renderer2.push(`<section class="section"><h1 class="title" style="color: #1e5c1e;">Admin Dashboard</h1> <p class="subtitle">All registered users and their POI data.</p> <table class="table is-fullwidth is-striped is-hoverable"><thead style="background-color: #1e5c1e; color: white;"><tr><th style="color:white;">Name</th><th style="color:white;">Email</th><th style="color:white;">POIs</th><th style="color:white;">Green Score</th><th style="color:white;">Footprint</th><th style="color:white;">Role</th><th style="color:white;">Actions</th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(data.users);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let u = each_array[$$index];
      $$renderer2.push(`<tr><td>${escape_html(u.firstName)} ${escape_html(u.lastName)}</td><td>${escape_html(u.email)}</td><td>${escape_html(u.poiCount)}</td><td>${escape_html(u.greenScore !== null ? `${u.greenScore}%` : "N/A")}</td><td><span${attr_style(`display:inline-block; width:20px; height:20px; border-radius:50%; background-color:${stringify(u.footprintColour)}; vertical-align:middle;`)}></span></td><td>${escape_html(u.isAdmin ? "Admin" : "User")}</td><td><a${attr("href", `/admin/user/${stringify(u._id)}`)} class="button is-small is-info">View POIs</a> `);
      if (!u.isAdmin) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<form method="POST" action="?/deleteUser" style="display:inline;"><input type="hidden" name="id"${attr("value", u._id)}/> <button class="button is-small is-danger">Delete</button></form>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></section>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B8eEm_zt.js.map
