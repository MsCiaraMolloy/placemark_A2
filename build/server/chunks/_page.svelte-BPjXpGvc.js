import { Y as ensure_array_like } from './renderer-Bb8TAqcF.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { c as attr } from './attributes-lIm1xnSy.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    $$renderer2.push(`<section class="section"><h1 class="title" style="color: #1e5c1e;">${escape_html(data.viewUser.firstName)} ${escape_html(data.viewUser.lastName)}</h1> <p class="subtitle">${escape_html(data.viewUser.email)}</p> <a href="/admin" class="button mb-4">← Back to Admin</a> `);
    if (data.pois.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<table class="table is-fullwidth is-striped"><thead style="background-color: #1e5c1e;"><tr><th style="color:white;">Name</th><th style="color:white;">Category</th><th style="color:white;">Location</th><th style="color:white;">Description</th><th style="color:white;">Image</th></tr></thead><tbody><!--[-->`);
      const each_array = ensure_array_like(data.pois);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let poi = each_array[$$index];
        $$renderer2.push(`<tr><td>${escape_html(poi.name)}</td><td>${escape_html(poi.category)}</td><td>${escape_html(poi.location)}</td><td>${escape_html(poi.description)}</td><td>`);
        if (poi.image) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<img${attr("src", poi.image)} style="max-height:50px;"${attr("alt", poi.name)}/>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<span class="has-text-grey">None</span>`);
        }
        $$renderer2.push(`<!--]--></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="has-text-grey">This user has no POIs yet.</p>`);
    }
    $$renderer2.push(`<!--]--></section>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BPjXpGvc.js.map
