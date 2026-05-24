import { json } from '@sveltejs/kit';
import { userStore } from '$lib/models/mongo/user-store.js';
import { verifyToken } from '$lib/services/auth.js';

function getUser(request) {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  return verifyToken(auth.slice(7));
}

export async function GET({ request, params }) {
  if (!getUser(request)) return json({ error: 'Unauthorized' }, { status: 401 });
  const user = await userStore.getUserById(params.id);
  if (!user) return json({ error: 'Not found' }, { status: 404 });
  return json(user);
}
