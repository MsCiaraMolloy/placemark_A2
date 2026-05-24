import { Y as ensure_array_like } from './renderer-Bb8TAqcF.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './attributes-lIm1xnSy.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    $$renderer2.push(`<section class="section"><h1 class="title">Our Space</h1> <p class="subtitle">Green scores based on POI categories</p> <div class="columns"><div class="column"><h2 class="title is-5">POI Map</h2> <div id="ourspace-map" style="height: 420px; border-radius: 6px;"></div></div> <div class="column"><h2 class="title is-5">County BER Map</h2> <div id="county-map" style="height: 420px; border-radius: 6px;"></div></div></div> <div class="box my-4"><p class="is-size-7"><strong>Legend:</strong> <span style="color:#2d8a2d;">●</span> A - Excellent   <span style="color:#f5c518;">●</span> B - Good   <span style="color:#ff8c00;">●</span> C - Fair   <span style="color:#e03030;">●</span> D - Poor   <span style="color:#cccccc;">●</span> No data</p></div> <table class="table is-fullwidth is-striped"><thead><tr><th>User</th><th>Green Score</th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(data.users);
    for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
      let u = each_array[$$index_2];
      $$renderer2.push(`<tr><td>${escape_html(u.firstName)} ${escape_html(u.lastName)}</td><td>`);
      if (u.greenScore !== null) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(Array(u.treeCount));
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          each_array_1[$$index];
          $$renderer2.push(`<span class="tree-icon svelte-1wse8mc">🌲</span>`);
        }
        $$renderer2.push(`<!--]--> <!--[-->`);
        const each_array_2 = ensure_array_like(Array(u.emptyCount));
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          each_array_2[$$index_1];
          $$renderer2.push(`<span class="tree-icon empty svelte-1wse8mc">🌲</span>`);
        }
        $$renderer2.push(`<!--]--> <span class="ml-2 has-text-grey">${escape_html(u.greenScore)}%</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<span class="has-text-grey">No POIs yet</span>`);
      }
      $$renderer2.push(`<!--]--></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></section>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CwvNyamy.js.map
