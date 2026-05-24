import { redirect, fail } from '@sveltejs/kit';
import { p as poiStore } from './poi-store-DoGEeRLy.js';
import { v2 } from 'cloudinary';
import 'mongoose';

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
async function uploadImage(buffer) {
  return new Promise((resolve, reject) => {
    v2.uploader.upload_stream({ folder: "placemark" }, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    }).end(buffer);
  });
}
async function load({ locals }) {
  const pois = await poiStore.getUserPois(locals.user._id);
  const categoryCounts = {};
  pois.forEach((poi) => {
    const cat = (poi.category || "").toUpperCase().charAt(0);
    if (["A", "B", "C", "D"].includes(cat)) {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
  });
  const dominantCategory = Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a])[0] || null;
  const categoryColours = { A: "#2d8a2d", B: "#f5c518", C: "#ff8c00", D: "#e03030" };
  const categoryLabels = { A: "Excellent (A)", B: "Good (B)", C: "Fair (C)", D: "Poor (D)" };
  return {
    active: "dashboard",
    pois: JSON.parse(JSON.stringify(pois)),
    poiCount: pois.length,
    footprintColour: dominantCategory ? categoryColours[dominantCategory] : "#aaaaaa",
    footprintLabel: dominantCategory ? categoryLabels[dominantCategory] : "No data",
    categoryCounts
  };
}
const actions = {
  addPoi: async ({ request, locals }) => {
    const data = await request.formData();
    let imageUrl = "";
    const imageFile = data.get("image");
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadImage(buffer);
    }
    const newPoi = {
      userid: locals.user._id,
      name: data.get("name"),
      description: data.get("description"),
      category: data.get("category"),
      location: data.get("location"),
      lat: data.get("lat") ? parseFloat(data.get("lat")) : null,
      lng: data.get("lng") ? parseFloat(data.get("lng")) : null,
      image: imageUrl
    };
    if (!newPoi.name || !newPoi.description || !newPoi.category || !newPoi.location) {
      return fail(400, { error: "All fields are required" });
    }
    await poiStore.addPoi(newPoi);
    throw redirect(303, "/dashboard");
  },
  deletePoi: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    await poiStore.deletePoiById(id);
    throw redirect(303, "/dashboard");
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B5CZ7lN5.js')).default;
const server_id = "src/routes/(app)/dashboard/+page.server.js";
const imports = ["_app/immutable/nodes/8.WtFO6EF1.js","_app/immutable/chunks/BmKnE-Dz.js","_app/immutable/chunks/CC1UzcQ5.js","_app/immutable/chunks/D-6UqWNZ.js","_app/immutable/chunks/DPPnFs8J.js","_app/immutable/chunks/unqreKJi.js","_app/immutable/chunks/tQfqKTYA.js","_app/immutable/chunks/B_OYSU34.js","_app/immutable/chunks/DY3WgBCG.js","_app/immutable/chunks/Ci0iJIL7.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=8-DtsWE5LK.js.map
