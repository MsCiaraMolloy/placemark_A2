import { json } from '@sveltejs/kit';
import { poiStore } from '$lib/models/mongo/poi-store.js';
import { verifyToken } from '$lib/services/auth.js';

function getUser(request) {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  return verifyToken(auth.slice(7));
}

export async function GET({ request, params }) {
  if (!getUser(request)) return json({ error: 'Unauthorized' }, { status: 401 });
  const poi = await poiStore.getPoiById(params.id);
  if (!poi) return json({ error: 'Not found' }, { status: 404 });
  return json(poi);
}

export async function DELETE({ request, params }) {
  if (!getUser(request)) return json({ error: 'Unauthorized' }, { status: 401 });
  const poi = await poiStore.getPoiById(params.id);
  if (!poi) return json({ error: 'Not found' }, { status: 404 });
  await poiStore.deletePoiById(params.id);
  return new Response(null, { status: 204 });
}
