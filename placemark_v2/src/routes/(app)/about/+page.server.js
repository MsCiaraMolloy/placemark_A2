import { userStore } from '$lib/models/mongo/user-store.js';
import { poiStore } from '$lib/models/mongo/poi-store.js';
import { getCountyForPoi, dominantCategory, categoryColours } from '$lib/services/geo.js';

export async function load() {
  const users = await userStore.getAllUsers();
  const countyCats = {};

  for (const user of users) {
    const pois = await poiStore.getUserPois(user._id);
    pois.forEach((poi) => {
      if (poi.lat && poi.lng) {
        const county = getCountyForPoi(poi.lat, poi.lng);
        if (county) {
          if (!countyCats[county]) countyCats[county] = [];
          countyCats[county].push(poi.category || '');
        }
      }
    });
  }

  const countyColours = {};
  Object.entries(countyCats).forEach(([county, cats]) => {
    const dom = dominantCategory(cats);
    countyColours[county] = dom ? categoryColours[dom] : '#cccccc';
  });

  return { active: 'about', countyColours };
}
