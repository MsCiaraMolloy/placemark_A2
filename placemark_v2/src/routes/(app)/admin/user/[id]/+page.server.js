import { redirect } from '@sveltejs/kit';
import { userStore } from '$lib/models/mongo/user-store.js';
import { poiStore } from '$lib/models/mongo/poi-store.js';

export async function load({ params, locals }) {
  if (!locals.user.isAdmin) throw redirect(303, '/dashboard');
  const user = await userStore.getUserById(params.id);
  if (!user) throw redirect(303, '/admin');
  const pois = await poiStore.getUserPois(user._id);
  return {
    active: 'admin',
    viewUser: JSON.parse(JSON.stringify(user)),
    pois: JSON.parse(JSON.stringify(pois))
  };
}
