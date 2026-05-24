import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { userStore } from '$lib/models/mongo/user-store.js';
import { verifyToken, createToken } from '$lib/services/auth.js';

function getUser(request) {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  return verifyToken(auth.slice(7));
}

export async function GET({ request }) {
  if (!getUser(request)) return json({ error: 'Unauthorized' }, { status: 401 });
  const users = await userStore.getAllUsers();
  return json(users);
}

export async function POST({ request }) {
  const body = await request.json();
  if (body.email && body.password && body.firstName && body.lastName) {
    body.password = await bcrypt.hash(body.password, 10);
    const user = await userStore.addUser(body);
    return json(user, { status: 201 });
  }
  return json({ error: 'Missing fields' }, { status: 400 });
}

export async function DELETE({ request }) {
  if (!getUser(request)) return json({ error: 'Unauthorized' }, { status: 401 });
  await userStore.deleteAll();
  return new Response(null, { status: 204 });
}
