import { fail } from '@sveltejs/kit';
import { parse } from 'csv-parse/sync';
import { p as poiStore } from './poi-store-DoGEeRLy.js';
import 'mongoose';

function load() {
  return { active: "import" };
}
const actions = {
  default: async ({ request, locals }) => {
    const data = await request.formData();
    const file = data.get("csvfile");
    if (!file || file.size === 0) return fail(400, { error: "Please select a CSV file." });
    const csvText = await file.text();
    let records;
    try {
      records = parse(csvText, { columns: true, skip_empty_lines: true, trim: true });
    } catch {
      return fail(400, { error: "Invalid CSV format." });
    }
    let imported = 0;
    let skipped = 0;
    for (const row of records) {
      if (!row.name || !row.category) {
        skipped++;
        continue;
      }
      const lat = parseFloat(row.lat);
      const lng = parseFloat(row.lng);
      await poiStore.addPoi({
        userid: locals.user._id,
        name: row.name,
        description: row.description || "",
        category: row.category,
        location: row.location || "",
        lat: isNaN(lat) ? null : lat,
        lng: isNaN(lng) ? null : lng,
        image: row.image || ""
      });
      imported++;
    }
    return { success: `Imported ${imported} POI(s). Skipped ${skipped} invalid row(s).` };
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-KIjxfKW_.js')).default;
const server_id = "src/routes/(app)/import/+page.server.js";
const imports = ["_app/immutable/nodes/9.DnqiQSqv.js","_app/immutable/chunks/BmKnE-Dz.js","_app/immutable/chunks/CC1UzcQ5.js","_app/immutable/chunks/DPPnFs8J.js","_app/immutable/chunks/unqreKJi.js","_app/immutable/chunks/tQfqKTYA.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=9-BUUWuzoA.js.map
