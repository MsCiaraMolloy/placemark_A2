import { redirect } from '@sveltejs/kit';
import { userStore } from '$lib/models/mongo/user-store.js';
import { poiStore } from '$lib/models/mongo/poi-store.js';
import { calcGreenScore, dominantCategory, categoryColours } from '$lib/services/geo.js';

export async function load({ locals }) {
  if (!locals.user.isAdmin) throw redirect(303, '/dashboard');

  const users = await userStore.getAllUsers();
  const usersWithData = await Promise.all(
    users.map(async (user) => {
      const pois = await poiStore.getUserPois(user._id);
      const cats = pois.map(p => p.category || '');
      const dom = dominantCategory(cats);
      return {
        _id: String(user._id),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        poiCount: pois.length,
        greenScore: calcGreenScore(pois),
        footprintColour: dom ? categoryColours[dom] : '#aaaaaa'
      };
    })
  );

  return { active: 'admin', users: usersWithData };
}

export const actions = {
  deleteUser: async ({ request, locals }) => {
    if (!locals.user.isAdmin) throw redirect(303, '/dashboard');
    const data = await request.formData();
    await userStore.deleteUserById(data.get('id'));
    throw redirect(303, '/admin');
  }
};
