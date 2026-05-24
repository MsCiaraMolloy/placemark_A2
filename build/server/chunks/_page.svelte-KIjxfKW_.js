import { e as escape_html } from './escaping-CqgfEcN3.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { form } = $$props;
    $$renderer2.push(`<section class="section"><h1 class="title" style="color: #2d8a2d;">Import POIs from CSV</h1> `);
    if (form?.success) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="notification is-success">${escape_html(form.success)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (form?.error) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="notification is-danger">${escape_html(form.error)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="box"><p class="mb-4">Upload a CSV file with the following columns:</p> <pre style="background:#f5f5f5; padding:1rem; border-radius:4px; font-size:0.85rem;">name,category,location,lat,lng,description,image
alan_turing,B,X91FE6T,52.2593,-7.1101,Semi-detached house,https://example.com/house.jpg</pre> <p class="is-size-7 has-text-grey mt-2 mb-4">Required columns: name, category. Image is optional.</p> <form method="POST" enctype="multipart/form-data"><div class="field"><label class="label">Select CSV File</label> <input class="input" type="file" name="csvfile" accept=".csv"/></div> <button class="button is-primary mt-3">Import</button> <a href="/dashboard" class="button mt-3 ml-2">Back to Dashboard</a></form></div></section>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-KIjxfKW_.js.map
