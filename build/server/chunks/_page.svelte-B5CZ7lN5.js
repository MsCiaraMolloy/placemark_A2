import { V as attr_style, a8 as stringify, Y as ensure_array_like } from './renderer-Bb8TAqcF.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { c as attr } from './attributes-lIm1xnSy.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    $$renderer2.push(`<section class="section"><h1 class="title" style="color: #2d8a2d;">Welcome to your Dashboard, ${escape_html(data.user.firstName)} ${escape_html(data.user.lastName)}</h1> <div class="box"${attr_style(`border-left: 6px solid ${stringify(data.footprintColour)};`)}><h2 class="title is-5">User Info</h2> <div class="columns"><div class="column"><p><strong>Number of POIs:</strong> ${escape_html(data.poiCount)}</p> <p><strong>Email:</strong> ${escape_html(data.user.email)}</p></div> <div class="column"><p><strong>Green Footprint:</strong></p> <span class="tag is-medium"${attr_style(`background-color: ${stringify(data.footprintColour)}; color: white; font-size: 1rem; padding: 1rem 1.5rem;`)}>${escape_html(data.footprintLabel)}</span></div></div></div> <div class="columns"><div class="column"><div id="dashboard-map" style="height: 400px; border-radius: 6px;"></div></div> <div class="column is-one-third"><div class="box" style="height: 400px; display: flex; flex-direction: column; justify-content: center;"><h2 class="title is-6 has-text-centered">POIs by BER Category</h2> <canvas id="ber-chart"></canvas></div></div></div> <!--[-->`);
    const each_array = ensure_array_like(data.pois);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let poi = each_array[$$index];
      $$renderer2.push(`<div class="box"><div class="columns is-vcentered"><div class="column"><p><strong>Home Owner:</strong> ${escape_html(poi.name)}</p> <p><strong>Category:</strong> ${escape_html(poi.category)}</p> <p><strong>Description:</strong> ${escape_html(poi.description)}</p> <p><strong>Location:</strong> ${escape_html(poi.location)}</p> `);
      if (poi.image) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p><img${attr("src", poi.image)}${attr("alt", poi.name)} style="max-height:120px;"/></p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="column is-narrow"><a${attr("href", `/poi/${stringify(poi._id)}`)} class="button is-info is-small"><span class="icon"><i class="fas fa-edit"></i></span></a> <form method="POST" action="?/deletePoi" style="display:inline;"><input type="hidden" name="id"${attr("value", poi._id)}/> <button class="button is-danger is-small"><span class="icon"><i class="fas fa-trash"></i></span></button></form></div></div></div>`);
    }
    $$renderer2.push(`<!--]--> <form method="POST" action="?/addPoi" enctype="multipart/form-data"><div class="box"><h2 class="title is-5">Add a Point of Interest</h2> <div class="field"><label class="label">Name</label> <input class="input" type="text" name="name" placeholder="e.g. alan_turing" required=""/></div> <div class="field"><label class="label">Building Description</label> <input class="input" type="text" name="description" placeholder="e.g. semi-detached" required=""/></div> <div class="field"><label class="label">Category - BER</label> <input class="input" type="text" name="category" placeholder="e.g. A" required=""/></div> <div class="field"><label class="label">Location - Eircode</label> <input class="input" type="text" name="location" placeholder="e.g. X91FE6T" required=""/></div> <div class="columns"><div class="column"><div class="field"><label class="label">Latitude</label> <input class="input" type="number" step="any" name="lat" placeholder="52.2593"/></div></div> <div class="column"><div class="field"><label class="label">Longitude</label> <input class="input" type="number" step="any" name="lng" placeholder="-7.1101"/></div></div></div> <div class="field"><label class="label">Image</label> <input class="input" type="file" name="image" accept="image/*"/></div> <button class="button is-primary">Add POI</button></div></form></section>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B5CZ7lN5.js.map
