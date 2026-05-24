import { c as attr } from './attributes-lIm1xnSy.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    const poi = data.poi;
    $$renderer2.push(`<section class="section">`);
    if (form?.error) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="notification is-danger">${escape_html(form.error)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form class="box" method="POST" style="max-width:600px;"><h2 class="title is-5">Edit Point of Interest</h2> <div class="field"><label class="label">Name</label> <input class="input" type="text" name="name"${attr("value", poi.name)}/></div> <div class="field"><label class="label">Description</label> <input class="input" type="text" name="description"${attr("value", poi.description)}/></div> <div class="field"><label class="label">Category - BER</label> <input class="input" type="text" name="category"${attr("value", poi.category)}/></div> <div class="field"><label class="label">Location - Eircode</label> <input class="input" type="text" name="location"${attr("value", poi.location)}/></div> <div class="columns"><div class="column"><div class="field"><label class="label">Latitude</label> <input class="input" type="number" step="any" name="lat"${attr("value", poi.lat)}/></div></div> <div class="column"><div class="field"><label class="label">Longitude</label> <input class="input" type="number" step="any" name="lng"${attr("value", poi.lng)}/></div></div></div> <div class="field"><label class="label">Image URL</label> <input class="input" type="text" name="image"${attr("value", poi.image || "")}/></div> <button class="button is-primary">Update POI</button> <a href="/dashboard" class="button">Cancel</a></form></section>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C2wlG8cT.js.map
