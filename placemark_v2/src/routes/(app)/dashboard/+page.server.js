import { fail, redirect } from '@sveltejs/kit';
import { poiStore } from '$lib/models/mongo/poi-store.js';
import { uploadImage } from '$lib/services/cloudinary.js';

export async function load({ locals }) {
  const pois = await poiStore.getUserPois(locals.user._id);

  const categoryCounts = {};
  pois.forEach((poi) => {
    const cat = (poi.category || '').toUpperCase().charAt(0);
    if (['A', 'B', 'C', 'D'].includes(cat)) {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
  });

  const dominantCategory = Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a])[0] || null;
  const categoryColours = { A: '#2d8a2d', B: '#f5c518', C: '#ff8c00', D: '#e03030' };
  const categoryLabels = { A: 'Excellent (A)', B: 'Good (B)', C: 'Fair (C)', D: 'Poor (D)' };

  return {
    active: 'dashboard',
    pois: JSON.parse(JSON.stringify(pois)),
    poiCount: pois.length,
    footprintColour: dominantCategory ? categoryColours[dominantCategory] : '#aaaaaa',
    footprintLabel: dominantCategory ? categoryLabels[dominantCategory] : 'No data',
    categoryCounts
  };
}

export const actions = {
  addPoi: async ({ request, locals }) => {
    const data = await request.formData();
    let imageUrl = '';
    const imageFile = data.get('image');
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadImage(buffer);
    }
    const newPoi = {
      userid: locals.user._id,
      name: data.get('name'),
      description: data.get('description'),
      category: data.get('category'),
      location: data.get('location'),
      lat: data.get('lat') ? parseFloat(data.get('lat')) : null,
      lng: data.get('lng') ? parseFloat(data.get('lng')) : null,
      image: imageUrl,
      hasSolarPanels: data.get('hasSolarPanels') === 'on',
      hasRecyclingBin: data.get('hasRecyclingBin') === 'on',
      hasCompostBin: data.get('hasCompostBin') === 'on',
      growsOwnFood: data.get('growsOwnFood') === 'on'
    };
    if (!newPoi.name || !newPoi.description || !newPoi.category || !newPoi.location) {
      return fail(400, { error: 'All fields are required' });
    }
    await poiStore.addPoi(newPoi);
    throw redirect(303, '/dashboard');
  },

  deletePoi: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    await poiStore.deletePoiById(id);
    throw redirect(303, '/dashboard');
  }
};
