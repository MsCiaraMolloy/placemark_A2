import { json } from '@sveltejs/kit';
import { poiStore } from '$lib/models/mongo/poi-store.js';
import { verifyToken } from '$lib/services/auth.js';

function getUser(request) {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  return verifyToken(auth.slice(7));
}

export async function GET({ request }) {
  if (!getUser(request)) return json({ error: 'Unauthorized' }, { status: 401 });
  const pois = await poiStore.getAllPois();
  return json(pois);
}

export async function POST({ request }) {
  if (!getUser(request)) return json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const poi = await poiStore.addPoi(body);
  return json(poi, { status: 201 });
}

export async function DELETE({ request }) {
  if (!getUser(request)) return json({ error: 'Unauthorized' }, { status: 401 });
  await poiStore.deleteAll();
  return new Response(null, { status: 204 });
}
