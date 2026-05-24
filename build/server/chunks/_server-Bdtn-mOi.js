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
async function GET({ request }) {
  if (!getUser(request)) return json({ error: "Unauthorized" }, { status: 401 });
  const pois = await poiStore.getAllPois();
  return json(pois);
}
async function POST({ request }) {
  if (!getUser(request)) return json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const poi = await poiStore.addPoi(body);
  return json(poi, { status: 201 });
}
async function DELETE({ request }) {
  if (!getUser(request)) return json({ error: "Unauthorized" }, { status: 401 });
  await poiStore.deleteAll();
  return new Response(null, { status: 204 });
}

export { DELETE, GET, POST };
//# sourceMappingURL=_server-Bdtn-mOi.js.map
