import { fail, redirect } from '@sveltejs/kit';
import { poiStore } from '$lib/models/mongo/poi-store.js';

export async function load({ params }) {
  const poi = await poiStore.getPoiById(params.id);
  if (!poi) throw redirect(303, '/dashboard');
  return { active: 'dashboard', poi: JSON.parse(JSON.stringify(poi)) };
}

export const actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();
    const fields = {
      name: data.get('name'),
      description: data.get('description'),
      category: data.get('category'),
      location: data.get('location'),
      lat: data.get('lat') ? parseFloat(data.get('lat')) : null,
      lng: data.get('lng') ? parseFloat(data.get('lng')) : null,
      image: data.get('image') || '',
      hasSolarPanels: data.get('hasSolarPanels') === 'on',
      hasRecyclingBin: data.get('hasRecyclingBin') === 'on',
      hasCompostBin: data.get('hasCompostBin') === 'on',
      growsOwnFood: data.get('growsOwnFood') === 'on'
    };
    if (!fields.name || !fields.description || !fields.category || !fields.location) {
      return fail(400, { error: 'All fields are required' });
    }
    await poiStore.updatePoi(params.id, fields);
    throw redirect(303, '/dashboard');
  }
};
