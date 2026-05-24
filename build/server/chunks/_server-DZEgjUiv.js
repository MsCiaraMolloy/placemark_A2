import { json } from '@sveltejs/kit';
import { p as poiStore } from './poi-store-DoGEeRLy.js';
import { v as verifyToken } from './auth-BKYE8tjw.js';
import 'mongoose';
import 'jsonwebtoken';

function getUser(request) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return verifyToken(auth.slice(7));
}
async function GET({ request, params }) {
  if (!getUser(request)) return json({ error: "Unauthorized" }, { status: 401 });
  const poi = await poiStore.getPoiById(params.id);
  if (!poi) return json({ error: "Not found" }, { status: 404 });
  return json(poi);
}
async function DELETE({ request, params }) {
  if (!getUser(request)) return json({ error: "Unauthorized" }, { status: 401 });
  const poi = await poiStore.getPoiById(params.id);
  if (!poi) return json({ error: "Not found" }, { status: 404 });
  await poiStore.deletePoiById(params.id);
  return new Response(null, { status: 204 });
}

export { DELETE, GET };
//# sourceMappingURL=_server-DZEgjUiv.js.map
